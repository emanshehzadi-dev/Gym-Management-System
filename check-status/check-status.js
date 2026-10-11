
// ================= Check Status Form =================

const checkStatusForm = document.getElementById("checkStatusForm");

const emailInput = document.getElementById("email");
const cnicInput = document.getElementById("cnic");

const emailError = document.getElementById("emailError");
const cnicError = document.getElementById("cnicError");

const statusResult = document.getElementById("statusResult");


// ================= Form Submit =================

checkStatusForm.addEventListener("submit", function(event) {

    event.preventDefault();

    emailError.textContent = "";
    cnicError.textContent = "";
    statusResult.textContent = "";

    statusResult.style.display = "none";


    // ================= Validation =================

    const email = emailInput.value.trim().toLowerCase();
    const cnic = cnicInput.value.trim();

    if (email === "") {
        emailError.textContent = "Please enter your Gmail.";
    }

    if (cnic === "") {
        cnicError.textContent = "Please enter your CNIC.";
    }

    if (email === "" || cnic === "") {
        return;
    }


    // ================= Get Saved Records =================

    const clients = JSON.parse(localStorage.getItem("clients")) || [];

    const pendingTrainerApplications =
        JSON.parse(localStorage.getItem("pendingTrainerApplications")) || [];

    const trainerApplications =
        JSON.parse(localStorage.getItem("trainerApplications")) || [];


    const rejectedTrainerApplications =
        JSON.parse(localStorage.getItem("rejectedTrainerApplications")) || [];

        const trainers =
    JSON.parse(localStorage.getItem("trainers")) || [];


    // // ================= Search Client =================

    // const client = clients.find(function(record) {
    //     return record.email &&
    //         record.email.trim().toLowerCase() === email &&
    //         record.cnic &&
    //         record.cnic.trim() === cnic;
    // });





    // ================= Search Client =================

const client = clients.find(function(record) {
    const savedEmail = String(record.email || "")
        .trim()
        .toLowerCase();

    const savedCnic = String(record.cnic || "").trim();

    return savedEmail === email && savedCnic === cnic;
});



    // ================= Search Trainer Application =================

    const pendingTrainer = pendingTrainerApplications.find(function(record) {
        return record.email &&
            record.email.trim().toLowerCase() === email &&
            record.cnic &&
            record.cnic.trim() === cnic;
    });

    const approvedTrainer = trainerApplications.find(function(record) {
        return record.email &&
            record.email.trim().toLowerCase() === email &&
            record.cnic &&
            record.cnic.trim() === cnic;
    });



    const rejectedTrainer = rejectedTrainerApplications.find(function(record) {
    return record.email &&
        record.email.trim().toLowerCase() === email &&
        record.cnic &&
        record.cnic.trim() === cnic;
});



// ================= Search Hired Trainer =================

const hiredTrainer = trainers.find(function(record) {
    return record.email &&
        record.email.trim().toLowerCase() === email &&
        record.cnic &&
        record.cnic.trim() === cnic &&
        record.status &&
        record.status.trim().toLowerCase() === "hired";
});




    
    // ================= Show Client Result =================


    console.log("CLIENT FOUND:", client);
// console.log("CLIENT STATUS:", client.status);
// console.log(
//     "NORMALIZED STATUS:",
//     (client.status || "").trim().toLowerCase()
// );

    console.log("CLIENT FOUND:", client);

    if (client) {

        statusResult.style.display = "block";

        const heading = document.createElement("h3");
        heading.textContent = "Admission Status";
        statusResult.appendChild(heading);

        const name = document.createElement("p");
        name.textContent = "Name: " + client.name;
        statusResult.appendChild(name);

        const clientStatus = (client.status || "").trim().toLowerCase();

        const status = document.createElement("p");
        status.textContent = "Status: " + client.status;
        statusResult.appendChild(status);

        // ================= Pending Admission =================

        if (clientStatus === "pending") {

            const message = document.createElement("p");

            message.className = "pending-message";
            message.textContent =
                "Your admission and payment verification are in progress.";

            statusResult.appendChild(message);
            return;
        }

        // ================= Rejected Admission =================

        if (clientStatus === "rejected") {

            const message = document.createElement("p");

             message.className = "rejected-message";
            message.textContent =
                "Sorry, your admission has been rejected. Please contact the gym for details.";

            statusResult.appendChild(message);
            return;
        }



// ================= Approved Admission =================

if (clientStatus === "approved") {

    const message = document.createElement("p");
    message.className = "approved-message";
    message.textContent =
        "Congratulations! Your admission has been approved. Please select your workout goal to continue.";
    statusResult.appendChild(message);

    // Show Previously Selected Package
    if (client.selectedPackage && client.duration && client.fee) {
        const packageDetails = document.createElement("p");
        packageDetails.textContent =
            "Package: " + client.selectedPackage +
            " | Duration: " + client.duration +
            " | Fee: " + client.fee;
        statusResult.appendChild(packageDetails);
    }

    // Workout Goal Dropdown
    const goalLabel = document.createElement("label");
    goalLabel.htmlFor = "workoutGoal";
    goalLabel.textContent = "Select Your Workout Goal:";
    statusResult.appendChild(goalLabel);

    const goalSelect = document.createElement("select");
    goalSelect.id = "workoutGoal";

    const defaultGoal = document.createElement("option");
    defaultGoal.value = "";
    defaultGoal.textContent = "Choose your workout goal";
    goalSelect.appendChild(defaultGoal);

    const workoutGoals = [
        "General Fitness",
        "Cardio & Endurance",
        "Weight Loss & Fat Loss",
        "Muscle Building & Weight Gain",
        "Strength & Conditioning",
        "All-Round Fitness (Multiple Goals)"
    ];

    workoutGoals.forEach(function(goal) {
        const option = document.createElement("option");
        option.value = goal;
        option.textContent = goal;
        goalSelect.appendChild(option);
    });

    statusResult.appendChild(goalSelect);

    // Trainer Selection Container
    const trainerSection = document.createElement("div");
    trainerSection.style.display = "none";
    statusResult.appendChild(trainerSection);

    // Show Hired Trainers After Goal Selection
    goalSelect.addEventListener("change", function() {
        trainerSection.innerHTML = "";
        trainerSection.style.display = "none";

        if (!goalSelect.value) return;

        const hiredTrainers = trainers.filter(function(trainer) {
            return (trainer.status || "").trim().toLowerCase() === "hired";
        });

        const heading = document.createElement("h4");
        heading.textContent = "Select Your Trainer";
        trainerSection.appendChild(heading);

        if (hiredTrainers.length === 0) {
            const noTrainer = document.createElement("p");
            noTrainer.textContent = "No hired trainers are currently available.";
            trainerSection.appendChild(noTrainer);
            trainerSection.style.display = "block";
            return;
        }

        const trainerLabel = document.createElement("label");
        trainerLabel.textContent = "Choose Trainer:";
        trainerSection.appendChild(trainerLabel);

        const trainerSelect = document.createElement("select");

        const defaultTrainer = document.createElement("option");
        defaultTrainer.value = "";
        defaultTrainer.textContent = "Choose a trainer";
        trainerSelect.appendChild(defaultTrainer);

        hiredTrainers.forEach(function(trainer, index) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent =
                (trainer.fullName || "Trainer") +
                " (" + (trainer.trainerId || "No ID") + ")";
            trainerSelect.appendChild(option);
        });

        trainerSection.appendChild(trainerSelect);

        const scheduleSection = document.createElement("div");
        trainerSection.appendChild(scheduleSection);

        trainerSelect.addEventListener("change", function() {
            scheduleSection.innerHTML = "";

            if (trainerSelect.value === "") return;

            // const selectedTrainer =
            //     hiredTrainers[Number(trainerSelect.value)];

            // const days = Array.isArray(selectedTrainer.availableDays)
            //     ? selectedTrainer.availableDays
            //     : (selectedTrainer.availableDays || "")
            //         .split(",")
            //         .map(function(day) {
            //             return day.trim();
            //         })
            //         .filter(Boolean);

            // const times = Array.isArray(selectedTrainer.workingTime)
            //     ? selectedTrainer.workingTime
            //     : (selectedTrainer.workingTime || "")
            //         .split(",")
            //         .map(function(time) {
            //             return time.trim();
            //         })
            //         .filter(Boolean);





            
const selectedTrainer =
    hiredTrainers[Number(trainerSelect.value)];

// const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday"
// ];

const times = [
    "6:00 AM - 8:00 AM",
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
    "8:00 PM - 10:00 PM"
];







const timeLabel = document.createElement("label");
timeLabel.textContent = "Training Time (2 Hours):";
scheduleSection.appendChild(timeLabel);

const timeSelect = document.createElement("select");

const defaultTime = document.createElement("option");
defaultTime.value = "";
defaultTime.textContent = "Choose a time slot";
timeSelect.appendChild(defaultTime);

times.forEach(function(time) {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
});

scheduleSection.appendChild(timeSelect);

if (times.length === 0) {
    const warning = document.createElement("p");
    warning.textContent =
        "Training time slots are unavailable. Please contact the gym admin.";
    scheduleSection.appendChild(warning);
}

const confirmButton = document.createElement("button");
confirmButton.type = "button";
confirmButton.textContent = "Confirm Selection";
scheduleSection.appendChild(confirmButton);



confirmButton.addEventListener("click", function() {
    if (!goalSelect.value ||
        !trainerSelect.value ||
        !timeSelect.value) {
        alert("Please select your workout goal, trainer and time.");
        return;
    }


    // Check Previous Trainer Assignment
    const previousTrainerId = client.selectedTrainerId || "";




                // // Check Previous Trainer Assignment
                // const previousTrainerId = client.selectedTrainerId;






                // Save Client Selections
                client.workoutGoal = goalSelect.value;
                // const previousTrainerId = client.selectedTrainerId;
                client.selectedTrainerId = selectedTrainer.trainerId;
                client.selectedTrainerName = selectedTrainer.fullName;
                // client.trainingDay = daySelect.value;
                client.trainingTime = timeSelect.value;

                // Generate Client ID If Missing
                if (!client.clientId) {
                    let newClientId;

                    do {
                        newClientId = "CL" +
                            Math.floor(100000 + Math.random() * 900000);
                    } while (clients.some(function(item) {
                        return item.clientId === newClientId;
                    }));

                    client.clientId = newClientId;
                }

                // Generate Password If Missing
                if (!client.password) {
                    client.password =
                        Math.random().toString(36).slice(2, 6).toUpperCase() +
                        Math.floor(1000 + Math.random() * 9000);
                }




                
                // // New Client Assigned Notification
                // if (!previousTrainerId) {
                //     const notifications = JSON.parse(
                //         localStorage.getItem("notifications") || "[]"
                //     );

                //     notifications.push({
                //         clientId: client.clientId,
                //         trainerId: selectedTrainer.trainerId,
                //         type: "New Client Assigned",
                //         message: "A new client has been assigned to you: " + client.name
                //     });

                //     localStorage.setItem(
                //         "notifications",
                //         JSON.stringify(notifications)
                //     );
                // }





                
                // // Check Previous Trainer Assignment
                // const previousTrainerId = client.selectedTrainerId;
                // // const previousTrainerId = client.selectedTrainerId;

                // // Save Client Selections
                // client.workoutGoal = goalSelect.value;
                // client.selectedTrainerId = selectedTrainer.trainerId;
                // client.selectedTrainerName = selectedTrainer.fullName;
                // client.trainingTime = timeSelect.value;

                // New Client Assigned Notification
                if (previousTrainerId !== selectedTrainer.trainerId) {
                    const notifications = JSON.parse(
                        localStorage.getItem("notifications") || "[]"
                    );

                    notifications.push({
                        clientId: client.clientId || "",
                        trainerId: selectedTrainer.trainerId,
                        type: "New Client Assigned",
                        message: "A new client has been assigned to you: " + client.name
                    });

                    localStorage.setItem(
                        "notifications",
                        JSON.stringify(notifications)
                    );
                }

                // Update Existing Client Record
                localStorage.setItem("clients", JSON.stringify(clients));





                // // Update Existing Client Record
                // localStorage.setItem("clients", JSON.stringify(clients));

                // Show Confirmation and Credentials
                trainerSection.innerHTML = "";

                const successHeading = document.createElement("h4");
                successHeading.textContent = "Selection Confirmed";
                trainerSection.appendChild(successHeading);

                const successMessage = document.createElement("p");
                successMessage.className = "approved-message";
                successMessage.textContent =
                    "Your workout goal and trainer schedule have been saved.";
                trainerSection.appendChild(successMessage);

                const details = document.createElement("p");
                details.textContent =
                    "Workout Goal: " + client.workoutGoal +
                    " | Trainer: " + client.selectedTrainerName +
                    " (" + client.selectedTrainerId + ")" +
                    // " | Day: " + client.trainingDay +
                    " | Time: " + client.trainingTime;
                trainerSection.appendChild(details);

                const clientIdDetails = document.createElement("p");
                clientIdDetails.textContent = "Your Client ID: " + client.clientId;
                trainerSection.appendChild(clientIdDetails);

                const passwordDetails = document.createElement("p");
                passwordDetails.textContent =
                    "Your Initial Password: " + client.password;
                trainerSection.appendChild(passwordDetails);

                const loginMessage = document.createElement("p");
                loginMessage.textContent =
                    "Please save your Client ID and password for login.";
                trainerSection.appendChild(loginMessage);
            });
        });

        trainerSection.style.display = "block";
    });

            if (clientStatus === "approved") {
            // Tumhara existing approved admission wala poora code
        }

        return;
    }

}




    // }







    // ================= Show Trainer Result =================

    const trainer =  hiredTrainer || pendingTrainer || approvedTrainer || rejectedTrainer;



    if (trainer) {


        statusResult.style.display = "block";

        const heading = document.createElement("h3");
        heading.textContent = "Trainer Application Status";
        statusResult.appendChild(heading);

        const name = document.createElement("p");
        name.textContent = "Name: " + trainer.fullName;
        statusResult.appendChild(name);

        const status = document.createElement("p");
        status.textContent = "Status: " + trainer.status;
        statusResult.appendChild(status);




        
// ================= Scheduled Interview Details =================

if (trainer.interviewStatus === "Scheduled") {

    const interviewStatus = document.createElement("p");
    interviewStatus.className = "interview-status";
    interviewStatus.textContent = "Interview Status: Scheduled";
    statusResult.appendChild(interviewStatus);

    const interviewDate = document.createElement("p");
    interviewDate.className = "interview-detail";
    interviewDate.textContent = "Interview Date: " + trainer.interviewDate;
    statusResult.appendChild(interviewDate);

    const interviewTime = document.createElement("p");
    interviewDate.className = "interview-detail";
    interviewTime.textContent = "Interview Time: " + trainer.interviewTime;
    statusResult.appendChild(interviewTime);

    const meetLink = document.createElement("a");
    meetLink.className = "join-interview-link";
    meetLink.href = trainer.meetLink;
    meetLink.textContent = "Join Interview";
    meetLink.target = "_blank";
    meetLink.rel = "noopener noreferrer";

    statusResult.appendChild(meetLink);
}




// ================= Hired Trainer Message =================

if (trainer.status.trim().toLowerCase() === "hired") {

    const message = document.createElement("p");
    message.className = "approved-message";
    message.textContent =
        "Congratulations! You have been hired as a trainer.";

    statusResult.appendChild(message);

    const trainerId = document.createElement("p");
    trainerId.textContent =
        "Trainer ID: " + (trainer.trainerId || "Not available");

    statusResult.appendChild(trainerId);

    const password = document.createElement("p");
    password.textContent =
        "Your Login Password: " + (trainer.password || "Not available");

    statusResult.appendChild(password);
}



        // ================= Approved Trainer Message =================

if (trainer.status.trim().toLowerCase() === "approved") {

    const message = document.createElement("p");
    message.className = "approved-message";

    message.textContent =
        "Congratulations! Your trainer application has been approved.";

    statusResult.appendChild(message);
}




// ================= Pending Trainer Message =================

// if (trainer.status.trim().toLowerCase() === "pending") {


if (
    trainer.status.trim().toLowerCase() === "pending" &&
    trainer.interviewStatus !== "Scheduled"
) {

    const message = document.createElement("p");
    message.className = "pending-message";

    message.textContent =
        "Your trainer application is currently pending. Please wait while the gym reviews your application.";

    statusResult.appendChild(message);
}




        // ================= Rejected Trainer Message =================

if (trainer.status.trim().toLowerCase() === "rejected") {

    const message = document.createElement("p");

    message.className = "rejected-message";

    message.textContent =
        "Sorry, your trainer application has been rejected. Please contact the gym for details.";

    statusResult.appendChild(message);
}

        return;
    }


    // ================= Record Not Found =================

    console.log("CLIENT:", client);
console.log("TRAINER:", trainer);

     statusResult.style.display = "block";

     statusResult.textContent = "No record found. Please check your registered Gmail and CNIC.";

});






// GYM-CHECKSTATUS-GOAL-TRAINER-HIRE-FLOW