// ========== HTML element connect with js ==========

const nameInput = document.getElementById("name");
const fatherNameInput = document.getElementById("fatherName");
const dateOfBirthInput = document.getElementById("dateOfBirth");
const genderInput = document.getElementById("gender");
const cnicInput = document.getElementById("cnic");

const phoneNumberInput = document.getElementById("phoneNumber");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");

const amergencyContactNameInput = document.getElementById("amergencyContactName");
const amergencyContactNumberInput = document.getElementById("amergencyContactNumber");

const bloodGroupInput = document.getElementById("bloodGroup");
const medicalConditionInput = document.getElementById("medicalCondition");

const personalDurationInput = document.getElementById("personalDuration");
const groupDurationInput = document.getElementById("groupDuration");

// ========== Refrence validation connect ==============

const nameError = document.getElementById("nameError");
const fatherNameError = document.getElementById("fatherNameError");
const dateOfBirthError = document.getElementById("dateOfBirthError");
const genderError = document.getElementById("genderError");
const cnicError = document.getElementById("cnicError");
const phoneNumberError = document.getElementById("phoneNumberError");
const emailError = document.getElementById("emailError");
const addressError = document.getElementById("addressError");
const amergencyContactNameError = document.getElementById("amergencyContactNameError");
const amergencyContactNumberError = document.getElementById("amergencyContactNumberError");
const bloodGroupError = document.getElementById("bloodGroupError");
const medicalConditionError = document.getElementById("medicalConditionError");
const personalDurationError = document.getElementById("personalDurationError");
const groupDurationError = document.getElementById("groupDurationError");

// ========== HTML form ko js sy controle kiya h taky simple submit na ho or form validation kr sky ===========

const admissionForm = document.querySelector(".admission-form");

// ========== form submit krny py action lyna k browser reload na ho ============

admissionForm.addEventListener("submit", function(event){
    event.preventDefault();    

    //========= Validation ===========

    if(nameInput.value === ""){
        nameError.textContent = "Please enter your name!";
        // return;
    }


    if(fatherNameInput.value === ""){
         fatherNameError.textContent = "Please enter your father name!";
        //  return;
    }

    if(dateOfBirthInput.value === ""){
        dateOfBirthError.textContent = "Please enter your date of birth!";
        // return;
    }

    if(genderInput.value === ""){
        genderError.textContent = "Please select your gender!";
        // return;
    }

    if(cnicInput.value === ""){
        cnicError.textContent = "Please enter your CNIC!";
        // return;
    }

    if(phoneNumberInput.value === ""){
        phoneNumberError.textContent = "Please enter your phone number!";
        // return;
    }

    if(emailInput.value === ""){
        emailError.textContent = "Please enter your email!";
        // return;
    }

    if(addressInput.value === ""){
        addressError.textContent = "Please enter your address!";
        // return;
    }

    if(amergencyContactNameInput.value === ""){
        amergencyContactNameError.textContent = "Please enter your emergency contact name!";
        // return;
    }

    if(amergencyContactNumberInput.value === ""){
        amergencyContactNumberError.textContent = "Please enter your emergency contact number!";
        // return;
    }

    if(bloodGroupInput.value === ""){
        bloodGroupError.textContent = "Please select your blood group!";
        // return;
    }

    if(medicalConditionInput.value === ""){
        medicalConditionError.textContent = "Please enter your medical condition!";
        // return;
    }

    if(personalDurationInput.value === "" && groupDurationInput.value === ""){
        personalDurationError.textContent = "Please select a training package!";
        groupDurationError.textContent = "Please select a training package!";
        // return;
    }

    if(personalDurationInput.value !== "" && groupDurationInput.value !== ""){
         personalDurationError.textContent = "Please select only one training package!";
         groupDurationError.textContent = "Please select only one training package!";
        //  return;
    }

    
});


// ============== Input error message remove validation after fiil the box ==============


nameInput.addEventListener("input", function(){
    if(nameInput.value !== ""){
        nameError.textContent = "";
    }
}); 

fatherNameInput.addEventListener("input", function(){
    if(fatherNameInput.value !== ""){
        fatherNameError.textContent = "";
    }
});

dateOfBirthInput.addEventListener("input", function(){
    if(dateOfBirthInput.value !== ""){
        dateOfBirthError.textContent = "";
    }
});

genderInput.addEventListener("input", function(){
    if(genderInput.value !== ""){
        genderError.textContent = "";
    }
});

cnicInput.addEventListener("input", function(){
    if(cnicInput.value !== ""){
        cnicError.textContent = "";
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

amergencyContactNameInput.addEventListener("input", function(){
    if(amergencyContactNameInput.value !== ""){
        amergencyContactNameError.textContent = "";
    }
});

amergencyContactNumberInput.addEventListener("input", function(){
    if(amergencyContactNumberInput.value !== ""){
        amergencyContactNumberError.textContent = "";
    }
});

bloodGroupInput.addEventListener("input", function(){
    if(bloodGroupInput.value !== ""){
        bloodGroupError.textContent = "";
    }
});

medicalConditionInput.addEventListener("input", function(){
    if(medicalConditionInput.value !== ""){
        medicalConditionError.textContent = "";
    }
});

personalDurationInput.addEventListener("input", function(){
    if(personalDurationInput.value !== ""){
        personalDurationError.textContent = "";
    }
});

groupDurationInput.addEventListener("input", function(){
    if(groupDurationInput.value !== ""){
        groupDurationError.textContent = "";
    }
});
