let clients = JSON.parse(localStorage.getItem("clients")) || [];
const pendingClient = JSON.parse(sessionStorage.getItem("pendingClient"));

// const pendingClientEmail = localStorage.getItem("pendingClientEmail");


const selectedPackage = document.getElementById("selectedPackage");
const selectedDuration = document.getElementById("selectedDuration");
const selectedFee = document.getElementById("selectedFee");

const paymentSuccessMessage = document.getElementById("paymentSuccessMessage");

// const pendingClient = clients.find(function(client){
    // return client.email === pendingClientEmail;
// });

// console.log(pendingClient);


// ============== autometically show ================

if(pendingClient.personalDuration !== ""){
    selectedPackage.textContent = "Personal Training";
    selectedDuration.textContent = pendingClient.personalDuration.split(" - ")[0];
    selectedFee.textContent = pendingClient.personalDuration.split(" - ")[1];
}

if(pendingClient.groupDuration !== ""){
    selectedPackage.textContent = "Group Training";
    selectedDuration.textContent = pendingClient.groupDuration.split(" - ")[0];
    selectedFee.textContent = pendingClient.groupDuration.split(" - ")[1];
}


const paymentMethod= document.getElementById("paymentMethod");
const transferDetails = document.getElementById("transferDetails");

const bankDetails = document.getElementById("bankDetails");
const bankAccountTitle = document.getElementById("bankAccountTitle");
const bankAccountNumber = document.getElementById("bankAccountNumber");

const jazzCashDetails = document.getElementById("jazzCashDetails");
const easyPaisaDetails = document.getElementById("easyPaisaDetails");

const referenceSection = document.querySelector(".reference-section");

const referenceNumber = document.getElementById("referenceNumber");
const referenceNumberError = document.getElementById("referenceNumberError");
const paymentMethodError = document.getElementById("paymentMethodError");

const paymentForm = document.querySelector(".payment-form");

const paymentDate = document.getElementById("paymentDate");
const paymentTime = document.getElementById("paymentTime");


paymentMethod.addEventListener("change", function(){

    paymentMethodError.textContent = "";
    referenceNumberError.textContent = "";

    
        paymentDate.textContent = "";
        paymentTime.textContent = "";

    if(paymentMethod.value === "cash"){
        transferDetails.style.display = "none";
        referenceSection.style.display = "none";
    }
    if(paymentMethod.value === "bankTransfer"){
        transferDetails.style.display = "block";
        referenceSection.style.display = "block";
        bankDetails.textContent = "Bank Name: UBL Bank";
        bankAccountTitle.textContent = "Account Title: Gym Management System";
        bankAccountNumber.textContent = "Account Number: 123456789";
        jazzCashDetails.textContent = "";
        easyPaisaDetails.textContent = "";
    }
    if(paymentMethod.value === "onlinePayment"){
        transferDetails.style.display = "block";
        referenceSection.style.display = "block";
        
        bankDetails.textContent = "";
        bankAccountTitle.textContent = "";
        bankAccountNumber.textContent = "";


        jazzCashDetails.textContent = "JazzCash Number: 0300-1234567";
        easyPaisaDetails.textContent = "EasyPaisa Number: 0300-7654321";
     
    }
});


referenceNumber.addEventListener("input", function(event){
    referenceNumberError.textContent = "";
});


paymentForm.addEventListener("submit", function(event){
    event.preventDefault();

    const now = new Date();
   
    // ============= Validation =============

 if(paymentMethod.value === ""){
        paymentMethodError.textContent = "Please select a payment method!";
        paymentMethod.focus();
        return;
    }
if(paymentMethod.value !== "cash" && referenceNumber.value === ""){
    referenceNumberError.textContent = "Please enter Reference / Transaction Number!";
    referenceNumber.focus();
    return;
}


    paymentDate.textContent = now.toLocaleDateString();
    paymentTime.textContent = now.toLocaleTimeString();
     console.log("Payment submitted successfully!");

     
    // pendingClient.selectedPackage = selectedPackage.textContent;
    // pendingClient.selectedDuration = selectedDuration.textContent;
    // pendingClient.selectedFee = selectedFee.textContent;


    pendingClient.selectedPackage = selectedPackage.textContent;
    pendingClient.duration = selectedDuration.textContent;
    pendingClient.fee = selectedFee.textContent;


     const payment = {
        paymentMethod: paymentMethod.value,
        referenceNumber: referenceNumber.value,
        paymentDate: now.toLocaleDateString(),
        paymentTime: now.toLocaleTimeString(),
        status: "Pending verification"
     }

     pendingClient.payment = payment;
    //  console.log(pendingClient);

    clients.push(pendingClient);
    localStorage.setItem("clients", JSON.stringify(clients));
    sessionStorage.removeItem("pendingClient");

    paymentSuccessMessage.textContent = "Payment submitted successfully! Your payment is under verification. Please wait for admin approval. " +
    "You can check your admission status from the 'Check Status' option on the landing page.";

    completePayment.disabled = true;

    // paymentForm.reset();

    console.log("pendingClient removed:", sessionStorage.getItem("pendingClient"));
});

