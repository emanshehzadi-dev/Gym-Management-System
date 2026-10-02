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

// ================= Array declaire ================

let clients = JSON.parse(localStorage.getItem("clients")) || [];

// ================ Session Storage ================

const pendingClient = JSON.parse(sessionStorage.getItem("pendingClient"));


// ========== Refrence connect for error msg ==============

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
    console.log("Form submitted");
    event.preventDefault();    
    let firstInvalidField = null;

    //========= Validation ===========

    if(nameInput.value === ""){
        nameError.textContent = "Please enter your name!";
           if(firstInvalidField === null){
            firstInvalidField = nameInput;
        }
        // return;
    }


    if(fatherNameInput.value === ""){
         fatherNameError.textContent = "Please enter your father name!";
         if(firstInvalidField === null){
            firstInvalidField = fatherNameInput;
         }
        //  return;
    }

    if(dateOfBirthInput.value === ""){
        dateOfBirthError.textContent = "Please select your date of birth!";
        if(firstInvalidField === null){
            firstInvalidField = dateOfBirthInput;
        }
        // return;
    }

    if(genderInput.value === ""){
        genderError.textContent = "Please select your gender!";
        if(firstInvalidField === null){
            firstInvalidField = genderInput;
        }
        // return;
    }

    if(cnicInput.value === ""){
        cnicError.textContent = "Please enter your CNIC!";
        if(firstInvalidField === null){
            firstInvalidField = cnicInput;
        }
        // return;
    }

    if(phoneNumberInput.value === ""){
        phoneNumberError.textContent = "Please enter your phone number!";
        if(firstInvalidField === null){
            firstInvalidField = phoneNumberInput;
        }
        // return;
    }

    if(emailInput.value === ""){
        emailError.textContent = "Please enter your email!";
        if(firstInvalidField === null){
            firstInvalidField = emailInput;
        }
        // return;
    }

    if(addressInput.value === ""){
        addressError.textContent = "Please enter your address!";
        if(firstInvalidField === null){
            firstInvalidField =addressInput;
        }
        // return;
    }

    if(amergencyContactNameInput.value === ""){
        amergencyContactNameError.textContent = "Please enter your emergency contact name!";
        if(firstInvalidField === null){
            firstInvalidField = amergencyContactNameInput;
        }
        // return;
    }

    if(amergencyContactNumberInput.value === ""){
        amergencyContactNumberError.textContent = "Please enter your emergency contact number!";
        if(firstInvalidField === null){
            firstInvalidField = amergencyContactNumberInput;
        }
        // return;
    }

    if(bloodGroupInput.value === ""){
        bloodGroupError.textContent = "Please select your blood group!";
        if(firstInvalidField === null){
            firstInvalidField = bloodGroupInput;
        }
        // return;
    }

    if(medicalConditionInput.value === ""){
        medicalConditionError.textContent = "Please enter your medical condition!";
        if(firstInvalidField === null){
            firstInvalidField = medicalConditionInput;
        }
        // return;
    }

    if(personalDurationInput.value === "" && groupDurationInput.value === ""){
        personalDurationError.textContent = "Please select a training package!";
        groupDurationError.textContent = "Please select a training package!";
        if(firstInvalidField === null){
            firstInvalidField = personalDurationInput;
        }
        // return;
    }

    if(personalDurationInput.value !== "" && groupDurationInput.value !== ""){
         personalDurationError.textContent = "Please select only one training package!";
         groupDurationError.textContent = "Please select only one training package!";
         if(firstInvalidField === null){
            firstInvalidField = personalDurationInput;
         }
        //  return;
    }
    

    if(firstInvalidField !== null){
        firstInvalidField.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        firstInvalidField.focus();
        return;
    }


    // ============= dublicate email check ================

    const emailExists = clients.some(function(client){
        return client.email === emailInput.value;
    });
    if(emailExists){
        emailError.textContent = "This email is already rejistered!";
        emailInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        emailInput.focus();
        return;
    }

    
    // ============== Dublicate CNIC check ==============

    const cnicExists = clients.some(function(client){
        return client.cnic === cnicInput.value;
    });
    if(cnicExists){
        cnicError.textContent = " This CNIC is already rejistered!";
        cnicInput.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
        cnicInput.focus();
        return;
    }

    
    // ================ Object create ===============

     const client = {
    name: nameInput.value,
    fatherName: fatherNameInput.value,
    dateOfBirth: dateOfBirthInput.value,
    gender: genderInput.value,
    cnic: cnicInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
    amergencyContactName: amergencyContactNameInput.value,
    amergencyContactNumber: amergencyContactNumberInput.value,
    bloodGroup: bloodGroupInput.value,
    medicalCondition: medicalConditionInput.value,
    personalDuration: personalDurationInput.value,
    groupDuration: groupDurationInput.value,
    status: "Pending"
 };

    // clients.push(client);
    // localStorage.setItem("clients", JSON.stringify(clients));

    // localStorage.setItem("pendingClientEmail", client.email);


    // ========== Session storage ma save kiya h ===============

    sessionStorage.setItem("pendingClient", JSON.stringify(client));
    window.location.href= "../payment/payment.html";

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
    // ===================================================


    personalDurationInput.addEventListener("change", function(){
        if(personalDurationInput.value !== ""){
            groupDurationInput.value = "";
            groupDurationError.textContent = "";
        }
    });

    groupDurationInput.addEventListener("change", function(){
        if(groupDurationInput.value !== ""){
            personalDurationInput.value = "";
            personalDurationError.textContent = "";
        }
    });

