


// ===== TRAINER LOGIN PROTECTION =====

const savedTrainerEmailForGuard =
    localStorage.getItem("loggedInTrainerEmail");

const savedTrainerIdForGuard =
    localStorage.getItem("loggedInTrainerId");

const savedTrainersForGuard =
    JSON.parse(localStorage.getItem("trainers") || "[]");

const trainerSessionValid = savedTrainersForGuard.some(function (trainer) {
    return trainer.email === savedTrainerEmailForGuard &&
           trainer.trainerId === savedTrainerIdForGuard;
});

if (!trainerSessionValid) {
    window.location.replace("../login/login.html");
}






/* ===== TRAINER ATTENDANCE TERMINAL ===== */

const gymAttendanceKey = "gymAttendanceRecords";

const trainerEmail = localStorage.getItem("loggedInTrainerEmail");
const trainerId = localStorage.getItem("loggedInTrainerId");

const trainers = JSON.parse(localStorage.getItem("trainers") || "[]");

const currentTrainer = trainers.find(function (trainer) {
    return trainer.email === trainerEmail &&
           trainer.trainerId === trainerId;
});

const attendanceName = document.getElementById("attendanceTrainerName");
const attendanceId = document.getElementById("attendanceTrainerId");
const scanButton = document.getElementById("trainerScanButton");
const scanStatus = document.getElementById("trainerScanStatus");
const attendanceTable = document.getElementById("trainerAttendanceTable");
const noRecord = document.getElementById("noTrainerAttendanceRecord");


/* ===== GET AND SAVE ATTENDANCE ===== */

function getGymAttendance() {
    return JSON.parse(localStorage.getItem(gymAttendanceKey) || "[]");
}

function saveGymAttendance(records) {
    localStorage.setItem(gymAttendanceKey, JSON.stringify(records));
}


/* ===== GET TODAY'S DATE ===== */

function getAttendanceDate(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}


/* ===== DISPLAY TRAINER ATTENDANCE ===== */

function displayTrainerAttendance() {
    if (!currentTrainer || !attendanceTable) return;

    const today = getAttendanceDate(new Date());

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const yesterday = getAttendanceDate(yesterdayDate);

    const records = getGymAttendance().filter(function (record) {
        return record.role === "Trainer" &&
               record.trainerId === currentTrainer.trainerId &&
               record.date <= today;
    });

    records.sort(function (a, b) {
        return b.date.localeCompare(a.date);
    });

    attendanceTable.innerHTML = "";

    const olderTable = document.getElementById("olderTrainerAttendanceTable");
    const noOlderRecord = document.getElementById("noOlderTrainerRecord");

    if (olderTable) {
        olderTable.innerHTML = "";
    }

    function addAttendanceRow(record, table) {
        const row = document.createElement("tr");

        const dateCell = document.createElement("td");
        dateCell.textContent = record.date;

        const checkInCell = document.createElement("td");
        checkInCell.textContent = record.checkIn || "-";

        const checkOutCell = document.createElement("td");
        checkOutCell.textContent = record.checkOut || "-";

        const statusCell = document.createElement("td");
        const statusBadge = document.createElement("span");

        const status = (record.status || "Pending").toLowerCase();

        statusBadge.className = "status-badge";

        if (status === "present" || status === "completed") {
            statusBadge.classList.add("status-present");
            statusBadge.textContent = "Present";
        } else if (status === "absent") {
            statusBadge.classList.add("status-absent");
            statusBadge.textContent = "Absent";
        } else {
            statusBadge.classList.add("status-pending");
            statusBadge.textContent = "Pending";
        }

        statusCell.appendChild(statusBadge);

        row.append(dateCell, checkInCell, checkOutCell, statusCell);
        table.appendChild(row);
    }

    const recentRecords = records.filter(function (record) {
        return record.date === today || record.date === yesterday;
    });

    const olderRecords = records.filter(function (record) {
        return record.date < yesterday;
    });

    recentRecords.forEach(function (record) {
        addAttendanceRow(record, attendanceTable);
    });

    if (olderTable) {
        olderRecords.forEach(function (record) {
            addAttendanceRow(record, olderTable);
        });
    }

    if (noRecord) {
        noRecord.style.display =
            recentRecords.length === 0 ? "block" : "none";
    }

    if (noOlderRecord) {
        noOlderRecord.style.display =
            olderRecords.length === 0 ? "block" : "none";
    }

    const todayRecord = records.find(function (record) {
        return record.date === today;
    });

    if (scanButton) {
        scanButton.disabled = Boolean(todayRecord && todayRecord.checkOut);
    }
}











/* ===== DISPLAY TRAINER'S CLIENTS ===== */

function displayTrainerClients() {
    const clientsTableBody = document.getElementById("clientsTableBody");
    const noClientsMessage = document.getElementById("noClientsMessage");

    if (!clientsTableBody || !currentTrainer) return;

    const clients = JSON.parse(localStorage.getItem("clients") || "[]");

    const assignedClients = clients.filter(function(client) {
        return client.selectedTrainerId === currentTrainer.trainerId;
    });

    clientsTableBody.innerHTML = "";

    assignedClients.forEach(function(client) {
        const row = document.createElement("tr");

        const clientIdCell = document.createElement("td");
        clientIdCell.textContent = client.clientId || "-";

        const clientNameCell = document.createElement("td");
        clientNameCell.textContent = client.name || "-";

        const packageCell = document.createElement("td");

        if (client.personalDuration) {
            packageCell.textContent = "Personal Training";
        } else if (client.groupDuration) {
            packageCell.textContent = "Group Training";
        } else {
            packageCell.textContent = "-";
        }

        const activityCell = document.createElement("td");
        activityCell.textContent = client.workoutGoal || "-";

        const trainingTimeCell = document.createElement("td");
        trainingTimeCell.textContent = client.trainingTime || "-";

        row.append(
            clientIdCell,
            clientNameCell,
            packageCell,
            activityCell,
            trainingTimeCell
        );

        clientsTableBody.appendChild(row);
    });

    if (noClientsMessage) {
        noClientsMessage.style.display =
            assignedClients.length === 0 ? "block" : "none";
    }
}

displayTrainerClients();








/* ===== SCAN TRAINER ATTENDANCE ===== */

function scanTrainerAttendance() {
    if (!currentTrainer || !currentTrainer.trainerId) {
        if (scanStatus) {
            scanStatus.textContent =
                "Trainer login information not found. Please log in again.";
        }
        return;
    }

    const now = new Date();

    if (now.getDay() === 0) {
        scanStatus.textContent = "Gym is closed on Sunday.";
        return;
    }

    scanButton.disabled = true;
    scanStatus.textContent = "Scanning fingerprint...";

    setTimeout(function () {
        const date = getAttendanceDate(new Date());

        const time = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        const records = getGymAttendance();

        let record = records.find(function (item) {
            return item.role === "Trainer" &&
                   item.trainerId === currentTrainer.trainerId &&
                   item.date === date;
        });

        if (!record) {
            record = {
                trainerId: currentTrainer.trainerId,
                name: currentTrainer.fullName || "Trainer",
                role: "Trainer",
                date: date,
                checkIn: time,
                checkOut: "",
                status: "Present"
            };

            records.push(record);

            scanStatus.textContent = "Check-in recorded at " + time;

        } else if (!record.checkOut) {
            record.checkOut = time;
            record.status = "Completed";

            scanStatus.textContent = "Check-out recorded at " + time;

        } else {
            scanStatus.textContent =
                "Today's attendance is already completed.";
        }

        saveGymAttendance(records);
        displayTrainerAttendance();

        scanButton.disabled = Boolean(record.checkOut);
    }, 1200);
}











/* ===== LOAD TRAINER PROFILE ===== */

function displayTrainerProfile() {
    if (!currentTrainer) return;

    const profileFields = {
        trainerProfileId: "trainerId",
        trainerProfileName: "fullName",
        trainerProfileFatherName: "fatherName",
        trainerProfileCnic: "cnic",
        trainerProfileGender: "gender",
        trainerProfileDob: "dateOfBirth",
        trainerProfilePhone: "phoneNumber",
        trainerProfileEmail: "email",
        trainerProfileAddress: "address",
        trainerProfileSpecialization: "specialization",
        trainerProfileExperience: "experience",
        trainerProfileQualification: "qualification",
        trainerProfileOrganization: "previousOrganization",
        trainerProfileSummary: "professionalSummary",
        trainerProfileDays: "availableDays",
        trainerProfileTimings: "workingTime",
        trainerProfileApplicationDate: "applicationDate",
        trainerProfileInterviewDate: "interviewDate",
        trainerProfileInterviewTime: "interviewTime",
        trainerProfileHiredDate: "hiredDate",
        trainerProfileStatus: "status"
    };

    Object.keys(profileFields).forEach(function (elementId) {
        const element = document.getElementById(elementId);
        const fieldName = profileFields[elementId];

        if (element) {
            element.textContent = currentTrainer[fieldName] || "-";
        }
    });
}

displayTrainerProfile();














/* ===== LOAD TRAINER DETAILS ===== */

if (currentTrainer) {



    const loggedInTrainerName = document.getElementById("loggedInTrainerName");

if (loggedInTrainerName) {
    loggedInTrainerName.textContent = currentTrainer.fullName || "Trainer";
}

    if (attendanceName) {
        attendanceName.textContent = currentTrainer.fullName || "Trainer";
    }

    if (attendanceId) {
        attendanceId.textContent = currentTrainer.trainerId;
    }
} else {
    if (attendanceName) {
        attendanceName.textContent = "Trainer not found";
    }

    if (attendanceId) {
        attendanceId.textContent = trainerId || "---";
    }

    if (scanStatus) {
        scanStatus.textContent =
            "Please log in with a valid trainer account.";
    }

    if (scanButton) {
        scanButton.disabled = true;
    }
}


/* ===== CONNECT SCAN BUTTON ===== */

if (scanButton) {
    scanButton.addEventListener("click", scanTrainerAttendance);
}


/* ===== INITIAL DISPLAY ===== */

displayTrainerAttendance();


















/* ===== DISPLAY TRAINING SCHEDULE ===== */

function displayTrainingSchedule() {
    const scheduleTableBody = document.getElementById("scheduleTableBody");

    if (!scheduleTableBody || !currentTrainer) return;

    const clients = JSON.parse(localStorage.getItem("clients") || "[]");

    const assignedClients = clients.filter(function (client) {
        return client.selectedTrainerId === currentTrainer.trainerId;
    });

    scheduleTableBody.innerHTML = "";

    assignedClients.forEach(function (client) {
        const row = document.createElement("tr");

        const clientIdCell = document.createElement("td");
        clientIdCell.textContent = client.clientId || "-";

        const clientNameCell = document.createElement("td");
        clientNameCell.textContent = client.name || "-";

        const activityCell = document.createElement("td");
        activityCell.textContent = client.workoutGoal || "-";

        const trainingTimeCell = document.createElement("td");
        trainingTimeCell.textContent = client.trainingTime || "-";

        const packageCell = document.createElement("td");

        if (client.personalDuration) {
            packageCell.textContent = "Personal Training";
        } else if (client.groupDuration) {
            packageCell.textContent = "Group Training";
        } else {
            packageCell.textContent = "-";
        }

        // const sessionStatusCell = document.createElement("td");
        // sessionStatusCell.textContent = client.sessionStatus || "Pending";

        row.append(
            clientIdCell,
            clientNameCell,
            activityCell,
            trainingTimeCell,
            packageCell,
            // sessionStatusCell
        );

        scheduleTableBody.appendChild(row);
    });
}

displayTrainingSchedule();






/* ===== TOTAL ASSIGNED CLIENTS ===== */

function displayTotalAssignedClients() {
    const totalAssignedClients = document.getElementById("totalAssignedClients");

    if (!totalAssignedClients || !currentTrainer) return;

    const clients = JSON.parse(localStorage.getItem("clients") || "[]");

    const assignedClients = clients.filter(function (client) {
        return client.selectedTrainerId === currentTrainer.trainerId;
    });

    totalAssignedClients.textContent = assignedClients.length;
}

displayTotalAssignedClients();










/* ===== DISPLAY AVAILABLE TIME SLOTS ===== */
function displayAvailableTimeSlots() {
    const availableTimeSlots = document.getElementById("availableTimeSlots");

    if (!availableTimeSlots || !currentTrainer) return;

    const clients = JSON.parse(localStorage.getItem("clients") || "[]");

    const assignedClients = clients.filter(function (client) {
        return client.selectedTrainerId === currentTrainer.trainerId;
    });

    const totalSlots = 8;

    const bookedSlots = new Set();

    assignedClients.forEach(function (client) {
        if (client.trainingTime) {
            bookedSlots.add(client.trainingTime);
        }
    });

    availableTimeSlots.textContent = totalSlots - bookedSlots.size;
}

displayAvailableTimeSlots();










/* ===== TRAINER NOTIFICATIONS ===== */
function displayTrainerNotifications() {
    const notificationList = document.querySelector(".notification-list");

    if (!notificationList || !currentTrainer) return;

    const notifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
    );

    const trainerNotifications = notifications.filter(function(notification) {
        return notification.trainerId === currentTrainer.trainerId &&
               notification.type === "New Client Assigned";
    });

    notificationList.innerHTML = "";

    if (trainerNotifications.length === 0) {
        notificationList.innerHTML = "<p>No new notifications.</p>";




        
    const scheduleNotification = document.createElement("div");
    scheduleNotification.className = "notification-item";

    const scheduleMessage = document.createElement("p");
    scheduleMessage.textContent = "Training Schedule Updated";

    scheduleNotification.appendChild(scheduleMessage);
    notificationList.appendChild(scheduleNotification);





        return;
    }

    trainerNotifications.forEach(function(notification) {
        const item = document.createElement("div");
        item.className = "notification-item";

        const message = document.createElement("p");
        message.textContent = notification.type + ": " + notification.message;

        item.appendChild(message);
        notificationList.appendChild(item);
    });
}

displayTrainerNotifications();










// ===== TRAINER LOGOUT =====

const logoutLink = document.querySelector(".logout-link");

if (logoutLink) {
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.removeItem("loggedInTrainerEmail");
        localStorage.removeItem("loggedInTrainerId");

        localStorage.removeItem("currentTrainer");
        sessionStorage.removeItem("currentTrainer");

        window.location.replace("../login/login.html");
    });
}





















// TRAINER DASHBOARD THEME TOGGLE

const themeToggle = document.querySelector(".theme-toggle");

// Saved theme load karo
const savedTheme = localStorage.getItem("trainerDashboardTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle.textContent = "☀️";
}

// Button click par theme change karo
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("trainerDashboardTheme", "light");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("trainerDashboardTheme", "dark");
    }
});
