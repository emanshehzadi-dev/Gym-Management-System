
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


    // ================= Search Client =================

    const client = clients.find(function(record) {
        return record.email &&
            record.email.trim().toLowerCase() === email &&
            record.cnic &&
            record.cnic.trim() === cnic;
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

            // Workout Goal Label

            const goalLabel = document.createElement("label");
            goalLabel.htmlFor = "workoutGoal";
            goalLabel.textContent = "Select Your Workout Goal:";

            statusResult.appendChild(goalLabel);

            // Workout Goal Dropdown

            const goalSelect = document.createElement("select");
            goalSelect.id = "workoutGoal";

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Choose your workout goal";

            goalSelect.appendChild(defaultOption);

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
        }

        return;
    }







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

     statusResult.style.display = "block";

     statusResult.textContent = "No record found. Please check your registered Gmail and CNIC.";

});






// GYM-CHECKSTATUS-GOAL-TRAINER-HIRE-FLOW