const clients = JSON.parse(localStorage.getItem("clients")) || [];

const loggedInClientEmail = localStorage.getItem("loggedInClientEmail");

    if (!loggedInClientEmail) {
    window.location.replace("../login/login.html");
}

const currentClient = clients.find(function(client) {
        return client.email === loggedInClientEmail;
    });

console.log("Logged In Client:", currentClient);

// ================ Variable Declare =====================

const clientId = document.getElementById("clientId");
const clientName = document.getElementById("clientName");
const fatherName = document.getElementById("fatherName");
const dateOfBirth = document.getElementById("dateOfBirth");
const gender = document.getElementById("gender");
const cnic = document.getElementById("cnic");
const bloodGroup = document.getElementById("bloodGroup");
const phoneNumber = document.getElementById("phoneNumber");
const email = document.getElementById("email");
const address = document.getElementById("address");
const amergencyContactName = document.getElementById("amergencyContactName");
const amergencyContactNumber = document.getElementById("amergencyContactNumber");
const medicalCondition = document.getElementById("medicalCondition");
const selectedPackage = document.getElementById("selectedPackage");
const durationAndFee = document.getElementById("durationAndFee");
const membershipStatus = document.getElementById("membershipStatus");
const paymentMethod = document.getElementById("paymentMethod");
const referenceNumber = document.getElementById("referenceNumber");
const paymentDate = document.getElementById("paymentDate");
const paymentTime = document.getElementById("paymentTime");
const paymentStatus = document.getElementById("paymentStatus");
const clientWelcome = document.getElementById("clientWelcome");

// ===================== Notification ======================
const notificationList = document.querySelector(".notification-list");

// =================== Array Declare =========================
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];


// ======================== Card conection ============================
const membershipStatusCard = document.getElementById("membershipStatusCard");
const selectedPackageCard = document.getElementById("selectedPackageCard");
const trainingTimeCard = document.getElementById("trainingTimeCard");
const trainerCard = document.getElementById("trainerCard");



// ================= My Training Connection =================

const trainingMode = document.getElementById("trainingMode");
const trainingTrainerName = document.getElementById("trainingTrainerName");
const trainingScheduleTime = document.getElementById("trainingScheduleTime");
const trainingWorkoutGoal = document.getElementById("trainingWorkoutGoal");


// ====================== Membership conection====================
const membershipPackage = document.getElementById("membershipPackage");
const membershipDuration = document.getElementById("membershipDuration");
const membershipStatusValue = document.getElementById("membershipStatusValue");
const membershipEntryDate = document.getElementById("membershipEntryDate");
const membershipExpiryDate = document.getElementById("membershipExpiryDate");

const logoutLink = document.querySelector(".logout-link");


// ================ Logout ======================
logoutLink.addEventListener("click", function() {

    localStorage.removeItem("loggedInClientEmail");
    localStorage.removeItem("selectedRole");
    localStorage.removeItem("userLoggedIn");
    
    window.location.replace("../login/login.html");

});


// ============== local storage sy my profile ma data show ====================

if (currentClient) {

    // =============== dashboard pr loged in client ka name show =============

    clientWelcome.textContent =
    "Hello " + currentClient.name + "!😊";




    // ================= Filter Client Notifications =================
    const clientNotifications = notifications.filter(function(notification){
        return notification.clientId === currentClient.clientId;
    });




    //================ Show Client Notification ===================
    clientNotifications.forEach(function(notification){
        const notificationItem = document.createElement("div");
        notificationItem.className = "notification-item";

        const notificationMessage = document.createElement("p");
        notificationMessage.textContent = notification.message;
    
        notificationItem.appendChild(notificationMessage);
        notificationList.appendChild(notificationItem);
    });





    // ================= No Notifications =================

    if (clientNotifications.length === 0) {

    const noNotification = document.createElement("p");
    noNotification.textContent = "No notifications yet.";

    notificationList.appendChild(noNotification);
}


    
if (!currentClient.selectedPackage) {
    currentClient.selectedPackage =
        currentClient.groupDuration !== ""
            ? "Group Training"
            : "Personal Training";
}

if (!currentClient.duration) {
    currentClient.duration =
        currentClient.groupDuration !== ""
            ? currentClient.groupDuration.split(" - ")[0]
            : currentClient.personalDuration.split(" - ")[0];
}

if (!currentClient.fee) {
    currentClient.fee =
        currentClient.groupDuration !== ""
            ? currentClient.groupDuration.split(" - ")[1]
            : currentClient.personalDuration.split(" - ")[1];
}


    clientId.textContent = "Client ID : " + currentClient.clientId;
    clientName.textContent = "Client Name : " + currentClient.name;
    fatherName.textContent = "Father Name : " + currentClient.fatherName;
    dateOfBirth.textContent = "Date of Birth : " + currentClient.dateOfBirth;
    gender.textContent = "Gender : " + currentClient.gender;
    cnic.textContent = "CNIC : " + currentClient.cnic;
    bloodGroup.textContent = "Blood Group : " + currentClient.bloodGroup;
    phoneNumber.textContent = "Phone Number : " + currentClient.phoneNumber;
    email.textContent = "Email : " + currentClient.email;
    address.textContent = "Address : " + currentClient.address;
    amergencyContactName.textContent = "Emergency Contact Name : " + currentClient.amergencyContactName;
    amergencyContactNumber.textContent = "Emergency Contact Number : " + currentClient.amergencyContactNumber;
    medicalCondition.textContent = "Medical Condition : " + currentClient.medicalCondition;
    selectedPackage.textContent = "Selected Package : " + currentClient.selectedPackage;
    durationAndFee.textContent = "Duration & Fee : " + currentClient.duration + " - " + currentClient.fee;
    membershipStatus.textContent = "Membership Status : " + currentClient.status;


    // ====================== Membership ===========================
    membershipPackage.textContent = "Selected Package : " + currentClient.selectedPackage;
    membershipDuration.textContent = "Duration & Fee : " + currentClient.duration + " - " + currentClient.fee;
    membershipStatusValue.textContent = "Membership Status : " + currentClient.status;
    membershipEntryDate.textContent = "Entry Date : " + currentClient.approvalDate;
    const entryDate = new Date(currentClient.approvalDate);

    const expiryDate = new Date(entryDate);

    if (currentClient.duration.includes("3 Months")) {
        expiryDate.setMonth(expiryDate.getMonth() + 3);
    }

    else if (currentClient.duration.includes("6 Months")) {
        expiryDate.setMonth(expiryDate.getMonth() + 6);
    } 
    
    else if (currentClient.duration.includes("12 Months")) {
        expiryDate.setMonth(expiryDate.getMonth() + 12);
    }

    membershipExpiryDate.textContent = "Expiry Date : " + expiryDate.toLocaleDateString();




    // membershipStatusCard.textContent = currentClient.status;
    // selectedPackageCard.textContent = currentClient.selectedPackage;
    // trainingTimeCard.textContent = currentClient.trainingTime;



    // ================= Dashboard Top Cards =================

membershipStatusCard.textContent =
    currentClient.status || "Not Available";

selectedPackageCard.textContent =
    currentClient.selectedPackage || "Not Available";

trainingTimeCard.textContent =
    currentClient.trainingTime || "Not Selected";

trainerCard.textContent =
    currentClient.selectedTrainerName || "Not Assigned";






    // ================= My Training Details =================

trainingMode.textContent =
    currentClient.selectedPackage || "Not Available";

trainingTrainerName.textContent =
    currentClient.selectedTrainerName || "Not Assigned";

trainingScheduleTime.textContent =
    currentClient.trainingTime || "Not Selected";

trainingWorkoutGoal.textContent =
    currentClient.workoutGoal || "Not Selected";






    paymentMethod.textContent = "Payment Method : " + currentClient.payment.paymentMethod;
   if (currentClient.payment.paymentMethod === "cash") {
       referenceNumber.style.display = "none";
    }
    else {
       referenceNumber.style.display = "block";
       referenceNumber.textContent = "Reference / Transaction Number : " +
        (currentClient.payment.referenceNumber || "");
    }
    paymentDate.textContent = "Payment Date : " + currentClient.payment.paymentDate;
    paymentTime.textContent = "Payment Time : " + currentClient.payment.paymentTime;
    paymentStatus.textContent = "Payment Status : " + currentClient.payment.status;
}


























/* ===== CLIENT ATTENDANCE TERMINAL ===== */

const gymAttendanceKey = "gymAttendanceRecords";

const attendanceName = document.getElementById("attendanceClientName");
const scanButton = document.getElementById("scanButton");
const scanStatus = document.getElementById("scanStatus");
const attendanceTable = document.getElementById("attendanceTable");
const noRecord = document.getElementById("noRecord");

function getGymAttendance() {
    return JSON.parse(localStorage.getItem(gymAttendanceKey) || "[]");
}

function saveGymAttendance(records) {
    localStorage.setItem(gymAttendanceKey, JSON.stringify(records));
}

function getAttendanceDate(date) {
    return [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0")
    ].join("-");
}




function displayAttendance() {
    if (!currentClient || !attendanceTable) return;

    const today = getAttendanceDate(new Date());

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const yesterday = getAttendanceDate(yesterdayDate);

    const records = getGymAttendance().filter(record =>
        record.clientId === currentClient.clientId &&
        record.date <= today
    );

    records.sort((a, b) => b.date.localeCompare(a.date));

    attendanceTable.innerHTML = "";

    const olderTable = document.getElementById("olderAttendanceTable");
    const noOlderRecord = document.getElementById("noOlderRecord");

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

        // if (status === "present") {
        //     statusBadge.classList.add("status-present");
        //     statusBadge.textContent = "Present";
        // } else if (status === "absent") {
        //     statusBadge.classList.add("status-absent");
        //     statusBadge.textContent = "Absent";
        // } else {
        //     statusBadge.classList.add("status-pending");
        //     statusBadge.textContent = "Pending";
        // }





        
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

    const recentRecords = records.filter(record =>
        record.date === today || record.date === yesterday
    );

    const olderRecords = records.filter(record =>
        record.date < yesterday
    );

    recentRecords.forEach(record =>
        addAttendanceRow(record, attendanceTable)
    );

    if (olderTable) {
        olderRecords.forEach(record =>
            addAttendanceRow(record, olderTable)
        );
    }

    if (noRecord) {
        noRecord.style.display =
            recentRecords.length === 0 ? "block" : "none";
    }

    if (noOlderRecord) {
        noOlderRecord.style.display =
            olderRecords.length === 0 ? "block" : "none";
    }

    const todayRecord = records.find(record => record.date === today);

    if (scanButton) {
        scanButton.disabled = Boolean(todayRecord);
    }
}




// }

function scanClientAttendance() {
    if (!currentClient || !currentClient.clientId) {
        scanStatus.textContent = "Client login information not found.";
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
            return item.clientId === currentClient.clientId &&
                   item.date === date;
        });

        if (!record) {
            record = {
                clientId: currentClient.clientId,
                name: currentClient.name,
                role: "Client",
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
        displayAttendance();

        scanButton.disabled = false;
    }, 1200);
}

if (currentClient) {
    attendanceName.textContent = currentClient.name || "Client";
}

if (scanButton) {
    scanButton.addEventListener("click", scanClientAttendance);
}

displayAttendance();
