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




    membershipStatusCard.textContent = currentClient.status;
    selectedPackageCard.textContent = currentClient.selectedPackage;
    trainingTimeCard.textContent = currentClient.trainingTime;


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
