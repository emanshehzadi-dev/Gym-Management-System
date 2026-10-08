// ========== HTML element connect with js ==========

const fullNameInput = document.getElementById("fullName");
const fatherNameInput = document.getElementById("fatherName");
const cnicInput = document.getElementById("cnic");
const genderInput = document.getElementById("gender");
const dateOfBirthInput = document.getElementById("dateOfBirth");

const phoneNumberInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

const specializationInput = document.getElementById("specialization");
const experienceInput = document.getElementById("experience");
const previousOrganizationInput = document.getElementById("previousOrganization");
const qualificationInput = document.getElementById("qualification");
const professionalSummaryInput = document.getElementById("professionalSummary");

const availableDaysInput = document.getElementById("availableDays");
const workingTimeInput = document.getElementById("workingTime");

const successMessage = document.getElementById("successMessage");


// ================= Array declaire ================

// // Pending applications multiple ho sakti hain

let pendingTrainerApplications = JSON.parse(localStorage.getItem("pendingTrainerApplications")) || [];



// let pendingTrainerApplications =
//     JSON.parse(sessionStorage.getItem("pendingTrainerApplications")) || [];


// Approved trainers / applications ke liye Local Storage
let trainerApplications = JSON.parse(localStorage.getItem("trainerApplications")) || [];


// ========== Refrence connect for error msg ==============

const fullNameError = document.getElementById("fullNameError");
const fatherNameError = document.getElementById("fatherNameError");
const cnicError = document.getElementById("cnicError");
const genderError = document.getElementById("genderError");
const dateOfBirthError = document.getElementById("dateOfBirthError");

const phoneNumberError = document.getElementById("phoneNumberError");
const emailError = document.getElementById("emailError");
const addressError = document.getElementById("addressError");

const specializationError = document.getElementById("specializationError");
const experienceError = document.getElementById("experienceError");
const previousOrganizationError = document.getElementById("previousOrganizationError");
const qualificationError = document.getElementById("qualificationError");
const professionalSummaryError = document.getElementById("professionalSummaryError");

const availableDaysError = document.getElementById("availableDaysError");
const workingTimeError = document.getElementById("workingTimeError");


// ========== HTML form ko js sy controle kiya h taky simple submit na ho or form validation kr sky ===========

const trainerApplicationForm = document.querySelector(".trainer-form");


// ========== form submit krny py action lyna k browser reload na ho ============

trainerApplicationForm.addEventListener("submit", function(event){

    console.log("Form submitted");

    event.preventDefault();

    let firstInvalidField = null;


    //========= Validation ===========

    if(fullNameInput.value === ""){
        fullNameError.textContent = "Please enter your name!";

        if(firstInvalidField === null){
            firstInvalidField = fullNameInput;
        }
    }


    if(fatherNameInput.value === ""){
        fatherNameError.textContent = "Please enter your father name!";

        if(firstInvalidField === null){
            firstInvalidField = fatherNameInput;
        }
    }


    if(cnicInput.value === ""){
        cnicError.textContent = "Please enter your CNIC!";

        if(firstInvalidField === null){
            firstInvalidField = cnicInput;
        }
    }


    if(genderInput.value === ""){
        genderError.textContent = "Please select your gender!";

        if(firstInvalidField === null){
            firstInvalidField = genderInput;
        }
    }


    if(dateOfBirthInput.value === ""){
        dateOfBirthError.textContent = "Please select your date of birth!";

        if(firstInvalidField === null){
            firstInvalidField = dateOfBirthInput;
        }
    }


    if(phoneNumberInput.value === ""){
        phoneNumberError.textContent = "Please enter your phone number!";

        if(firstInvalidField === null){
            firstInvalidField = phoneNumberInput;
        }
    }


    if(emailInput.value === ""){
        emailError.textContent = "Please enter your email!";

        if(firstInvalidField === null){
            firstInvalidField = emailInput;
        }
    }


    if(addressInput.value === ""){
        addressError.textContent = "Please enter your address!";

        if(firstInvalidField === null){
            firstInvalidField = addressInput;
        }
    }


    if(specializationInput.value === ""){
        specializationError.textContent = "Please enter your specialization!";

        if(firstInvalidField === null){
            firstInvalidField = specializationInput;
        }
    }


    if(experienceInput.value === ""){
        experienceError.textContent = "Please enter your experience!";

        if(firstInvalidField === null){
            firstInvalidField = experienceInput;
        }
    }


    if(qualificationInput.value === ""){
        qualificationError.textContent = "Please enter your qualification or certification!";

        if(firstInvalidField === null){
            firstInvalidField = qualificationInput;
        }
    }


    if(professionalSummaryInput.value === ""){
        professionalSummaryError.textContent = "Please enter your professional summary!";

        if(firstInvalidField === null){
            firstInvalidField = professionalSummaryInput;
        }
    }


    if(availableDaysInput.value === ""){
        availableDaysError.textContent = "Please enter your available days!";

        if(firstInvalidField === null){
            firstInvalidField = availableDaysInput;
        }
    }


    if(workingTimeInput.value === ""){
        workingTimeError.textContent = "Please enter your preferred working time!";

        if(firstInvalidField === null){
            firstInvalidField = workingTimeInput;
        }
    }


    // ========== First invalid field par le jana ==========

    if(firstInvalidField !== null){

        firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        firstInvalidField.focus();

        return;
    }


    // ============= Dublicate Email Check ================

    const emailExistsInPending = pendingTrainerApplications.some(function(application){

        return application.email === emailInput.value;

    });


    const emailExistsInApproved = trainerApplications.some(function(application){

        return application.email === emailInput.value;

    });


    if(emailExistsInPending || emailExistsInApproved){

        emailError.textContent = "This email is already registered!";

        emailInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        emailInput.focus();

        return;
    }


    // ============== Dublicate CNIC Check ==============

    const cnicExistsInPending = pendingTrainerApplications.some(function(application){

        return application.cnic === cnicInput.value;

    });


    const cnicExistsInApproved = trainerApplications.some(function(application){

        return application.cnic === cnicInput.value;

    });


    if(cnicExistsInPending || cnicExistsInApproved){

        cnicError.textContent = "This CNIC is already registered!";

        cnicInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        cnicInput.focus();

        return;
    }



 
    // ========== Application ID ==========

let applicationId = "APP-1001";

if(pendingTrainerApplications.length > 0){

    applicationId = "APP-" + (1001 + pendingTrainerApplications.length);

}




// ========== Application Date ==========

const applicationDate = new Date().toLocaleDateString();




    // ================ Object create ===============

    const trainerApplication = {


        applicationId: applicationId,
        applicationDate: applicationDate,


        fullName: fullNameInput.value,
        fatherName: fatherNameInput.value,
        cnic: cnicInput.value,
        gender: genderInput.value,
        dateOfBirth: dateOfBirthInput.value,

        phoneNumber: phoneNumberInput.value,
        email: emailInput.value,
        address: addressInput.value,

        specialization: specializationInput.value,
        experience: experienceInput.value,
        previousOrganization: previousOrganizationInput.value,
        qualification: qualificationInput.value,
        professionalSummary: professionalSummaryInput.value,

        availableDays: availableDaysInput.value,
        workingTime: workingTimeInput.value,

        status: "Pending"
    };


    // ========== Multiple Pending Applications Session Storage ma save ==========

    pendingTrainerApplications.push(trainerApplication);

    // sessionStorage.setItem(
    //     "pendingTrainerApplications",
    //     JSON.stringify(pendingTrainerApplications)
    // );



    localStorage.setItem(
    "pendingTrainerApplications",
    JSON.stringify(pendingTrainerApplications)
    );



    console.log(trainerApplication);


    successMessage.textContent =
    "Your application has been submitted successfully! Please visit the landing page to check your application status and wait for the Admin's decision.";
    


    // alert("Your trainer application has been submitted successfully!");

});


// ============== Input error message remove validation after fill the box ==============

fullNameInput.addEventListener("input", function(){

    if(fullNameInput.value !== ""){
        fullNameError.textContent = "";
    }

});


fatherNameInput.addEventListener("input", function(){

    if(fatherNameInput.value !== ""){
        fatherNameError.textContent = "";
    }

});


cnicInput.addEventListener("input", function(){

    if(cnicInput.value !== ""){
        cnicError.textContent = "";
    }

});


genderInput.addEventListener("input", function(){

    if(genderInput.value !== ""){
        genderError.textContent = "";
    }

});


dateOfBirthInput.addEventListener("input", function(){

    if(dateOfBirthInput.value !== ""){
        dateOfBirthError.textContent = "";
    }

});


phoneNumberInput.addEventListener("input", function(){

    if(phoneNumberInput.value !== ""){
        phoneNumberError.textContent = "";
    }

});


emailInput.addEventListener("input", function(){

    if(emailInput.value !== ""){
        emailError.textContent = "";
    }

});


addressInput.addEventListener("input", function(){

    if(addressInput.value !== ""){
        addressError.textContent = "";
    }

});


specializationInput.addEventListener("input", function(){

    if(specializationInput.value !== ""){
        specializationError.textContent = "";
    }

});


experienceInput.addEventListener("input", function(){

    if(experienceInput.value !== ""){
        experienceError.textContent = "";
    }

});


previousOrganizationInput.addEventListener("input", function(){

    if(previousOrganizationInput.value !== ""){
        previousOrganizationError.textContent = "";
    }

});


qualificationInput.addEventListener("input", function(){

    if(qualificationInput.value !== ""){
        qualificationError.textContent = "";
    }

});


professionalSummaryInput.addEventListener("input", function(){

    if(professionalSummaryInput.value !== ""){
        professionalSummaryError.textContent = "";
    }

});


availableDaysInput.addEventListener("input", function(){

    if(availableDaysInput.value !== ""){
        availableDaysError.textContent = "";
    }

});


workingTimeInput.addEventListener("input", function(){

    if(workingTimeInput.value !== ""){
        workingTimeError.textContent = "";
    }

});