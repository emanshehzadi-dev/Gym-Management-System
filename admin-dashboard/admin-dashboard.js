if(localStorage.getItem("adminLoggedIn") !== "true"){
    window.location.replace("../login/login.html");
}

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("selectedRole");
    window.location.replace("../login/login.html");
});

// ============= Variable Declaire ================
const admissionList = document.getElementById("admissionList");



// ============= Get Clients From Local Storage ================
let clients = JSON.parse(localStorage.getItem("clients")) || [];


// =================== Get Notification from local storage =====================
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];



// ============= Variable Declaire ================
const clientsList = document.getElementById("clientsList");



// ====================== Membership ===================
const activeMembershipList = document.getElementById("activeMembershipList");
const expiringSoonList = document.getElementById("expiringSoonList");
const expiringSoonTemplate = document.getElementById("expiringSoonTemplate");
const noExpiringSoon = document.getElementById("noExpiringSoon");
const expiredMemberships = document.getElementById("expiredMemberships");
const expiredTemplate = document.getElementById("expiredTemplate");
const noExpiredMemberships = document.getElementById("noExpiredMemberships");



// ================== Card reference =====================
const totalClients = document.getElementById("totalClients");
const activeClients = document.getElementById("activeClients");
const pendingRequests = document.getElementById("pendingRequests");
const expiringMembershipCard = document.getElementById("expiringMemberships");
const expiredMembershipCard = document.getElementById("expiredMembershipsCount");
let activeClientCount = 0;
let expiringMembershipCount = 0;
let expiredMembershipCount = 0;



// =================== Approved Clients ====================
const approvedClients = clients.filter(function(client){
    return client.status === "Approved" || client.status === "Expired";
});



// ================== Active membership k liy duration calculate =================
approvedClients.forEach(function(client){
    let duration;
    if(client.personalDuration !== ""){
        duration = client.personalDuration.split(" - ")[0];
    }
    if(client.groupDuration !== ""){
        duration = client.groupDuration.split(" - ")[0];
    }
    console.log(client.name, duration);

    // =================== Expiry Date ======================
    if(client.approvalDate){
        console.log("Approval Date:", client.approvalDate);
        const approvalDate = new Date(client.approvalDate);
        const months = parseInt(duration);

        const expiryDate = new Date(client.approvalDate);
        expiryDate.setMonth(expiryDate.getMonth() + months);

        console.log(client.name, "Expiry Date:", expiryDate.toLocaleDateString());

        const today = new Date();


        //================ Expirying Soon ==================
        const warningDate = new Date(expiryDate);
        warningDate.setDate(warningDate.getDate() - 7);


        if(today >= warningDate && today <= expiryDate){

            noExpiringSoon.style.display = "none";

            console.log(client.name, "Expiring Soon");





        // ================= Membership Expiring Soon Notification =================

        const daysLeft = Math.ceil(
        (expiryDate - today) / (1000 * 60 * 60 * 24)
);

        const expiringNotification = notifications.find(function(notification){
        return notification.clientId === client.clientId &&
           notification.type === "Membership Expiring Soon";
});

if(expiringNotification){

        expiringNotification.message =
        "Your membership expires in " + daysLeft + " days.";

}
else{

    notifications.push({
        clientId: client.clientId,
        type: "Membership Expiring Soon",
        message: "Your membership expires in " + daysLeft + " days."
    });

}

localStorage.setItem("notifications", JSON.stringify(notifications));    



            activeClientCount++;

            expiringMembershipCount++;

            const membershipCard = expiringSoonTemplate.content.cloneNode(true);
            const paragraphs = membershipCard.querySelectorAll("p");
            // ================= client card ====================
            paragraphs[0].textContent = "Client ID : " + client.clientId;
            paragraphs[1].textContent = "Client Name : " + client.name;
            paragraphs[2].textContent = "Entry Date : " + new Date(client.approvalDate).toLocaleDateString();
            paragraphs[3].textContent = "Expiry Date : " + expiryDate.toLocaleDateString();
            paragraphs[4].textContent = "Membership Status : Expiring Soon";


            paragraphs[5].textContent = "Warning  : Membership expires in " + daysLeft + " days !";
            expiringSoonList.appendChild(membershipCard);
         }

        //================= Active memberships ==================
        else if(expiryDate > today){
            console.log(client.name, "Active Membership");
            activeClientCount++;
            

        // ================== Div Create for Membership Client ================
        const membershipCard = document.createElement("div");
        membershipCard.className = "membership-client";


        // ================== Client Id =================
        const clientId = document.createElement("p");
        clientId.textContent = "Client ID : " + client.clientId;
        membershipCard.appendChild(clientId);


        // ================= Client Name =======================
        const clientName = document.createElement("p");
        clientName.textContent = "Client Name : " + client.name;
        membershipCard.appendChild(clientName);


        // ================= Membership Status ================
        const membershipStatus = document.createElement("p");
        membershipStatus.textContent = "Membership Status : " + client.status;
        membershipCard.appendChild(membershipStatus);

        activeMembershipList.appendChild(membershipCard);
        }


        //================ Expired memberships ===================
        else if(expiryDate < today){
            console.log(client.name, "Expired Memberships");


            client.status = "Expired";
            localStorage.setItem("clients", JSON.stringify(clients));

            noExpiredMemberships.style.display = "none";

            expiredMembershipCount++;

            const expiringNotificationIndex = notifications.findIndex(function(notification){
            return notification.clientId === client.clientId &&
            notification.type === "Membership Expiring Soon";
});

if(expiringNotificationIndex !== -1){
    notifications.splice(expiringNotificationIndex, 1);
    localStorage.setItem("notifications", JSON.stringify(notifications));
}

          
        const expiredCard = expiredTemplate.content.cloneNode(true);
        const expiredParagraphs = expiredCard.querySelectorAll("p");
        // ================= client Card ===================
        expiredParagraphs[0].textContent = "Client ID : " + client.clientId;
        expiredParagraphs[1].textContent = "Client Name : " + client.name;
        expiredParagraphs[2].textContent = "Entry Date : " + new Date(client.approvalDate).toLocaleDateString();
        expiredParagraphs[3].textContent = "Expiry Date : " + expiryDate.toLocaleDateString();
        expiredParagraphs[4].textContent = "Membership Status : Expired";
        expiredMemberships.appendChild(expiredCard);
        }
    }   
});




// ============== Active Clients Count ======================
activeClients.textContent = activeClientCount;

expiringMembershipCard.textContent = expiringMembershipCount;

expiredMembershipCard.textContent = expiredMembershipCount;



//===================== Get Pending Client ==================
const pendingClients = clients.filter(function(client){
    return client.status === "Pending";
});
pendingRequests.textContent = pendingClients.length;



// ===================== Total Clients ===============
totalClients.textContent = activeClientCount + pendingClients.length;




//================== Display Pending Client ===============

pendingClients.forEach(function(client){
    const admissionCard = document.createElement("div");
    admissionCard.className = "admission-card";


    const clientInfo = document.createElement("div");
    clientInfo.className = "client-info";


    // ============= Info Name ============
    const clientName = document.createElement("p");
    clientName.textContent = "Client Name: " + client.name;
    clientInfo.appendChild(clientName);


    // ================ Phone Number ================
    const clientPhone = document.createElement("p");
    clientPhone.textContent = "Phone Number: " + client.phoneNumber;
    clientInfo.appendChild(clientPhone);


    // ================== Email ================
    const clientEmail = document.createElement("p");
    clientEmail.textContent = "Email: " + client.email;
    clientInfo.appendChild(clientEmail);


    // ================ Selected Package ================
    const clientPackage = document.createElement("p");
    if(client.personalDuration !== ""){
        clientPackage.textContent = "Selected Package: Personal Training"; 
    }
    if(client.groupDuration !== ""){
        clientPackage.textContent = "Selected Package: Group Training";
    }
    clientInfo.appendChild(clientPackage);


    // ================== Duration ================
    const clientDuration = document.createElement("p");
    if(client.personalDuration !== ""){
        clientDuration.textContent = "Duration: " + client.personalDuration.split(" - ")[0];
    }
    if(client.groupDuration !== ""){
        clientDuration.textContent = "Duration: " + client.groupDuration.split(" - ")[0];
    }
    clientInfo.appendChild(clientDuration);

    // ================ Fee ===================
    const clientFee = document.createElement("p");
    if(client.personalDuration !== ""){
        clientFee.textContent = "Fee: " + client.personalDuration.split(" - ")[1];
    }
    if(client.groupDuration !== ""){
        clientFee.textContent = "Fee: " + client.groupDuration.split(" - ")[1];
    }
    clientInfo.appendChild(clientFee);


    // =============== Payment method ===============
    const clientPaymentMethod = document.createElement("p");
    clientPaymentMethod.textContent = "Payment Method: " + client.payment.paymentMethod;
    clientInfo.appendChild(clientPaymentMethod);


    // =============== Reference Transaction Number =================
    if(client.payment.referenceNumber !== ""){
        const clientReference = document.createElement("p");
        clientReference.textContent = "Reference / Transaction Number: " + client.payment.referenceNumber;
        clientInfo.appendChild(clientReference);
    }


    // ================ Date =================
    const clientDate = document.createElement("p");
    clientDate.textContent = "Date: " + client.payment.paymentDate;
    clientInfo.appendChild(clientDate);


    // ================ Time ================
    const clientTime = document.createElement("p");
    clientTime.textContent = "Time: " + client.payment.paymentTime;
    clientInfo.appendChild(clientTime);


    // ================= Status ===================
    const clientStatus = document.createElement("p");
    clientStatus.textContent = "Status: " + client.payment.status;
    clientInfo.appendChild(clientStatus);


    // ============== Actions Buttons ====================
    const actionButtons = document.createElement("div");
    actionButtons.className = "request-actions";

    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.className = "approve-btn";

    // ================ approval =================
    approveButton.addEventListener("click", function(){
        client.status = "Approved";
        client.payment.status = "Verified";
        client.approvalDate = new Date().toLocaleDateString();



    // ================== ID Generate ================
        let clientId;
        do{
            clientId = "CL" + Math.floor(1000 + Math.random() * 9000);
        }while(clients.some(function(client){
            return client.clientId === clientId;
        }));
        client.clientId = clientId;


        // ================= Password Generate ================
         let initialPassword = Math.random().toString(36).slice(2, 8);
         client.password = initialPassword;




        // =========================== NOTIFICATIONS SECTION ==============================
        // ================== Admission approved notification ====================
        const admissionNotification = {
            clientId: client.clientId,
            type: "Admission Approved",
            message: "Your admission has been approved."
        }
        notifications.push(admissionNotification);
        localStorage.setItem("notifications", JSON.stringify(notifications));




        // ================ Client id jenerate notification =====================
        const idGeneratedNotification = {
            clientId: client.clientId,
            type: "Client ID Generated",
            message: "Your Client ID and initial password have been generated."
        };
        notifications.push(idGeneratedNotification);
        localStorage.setItem("notifications", JSON.stringify(notifications));


        

        localStorage.setItem("clients", JSON.stringify(clients));

        approveButton.disabled = true;
        rejectButton.disabled = true;
    });

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.className = "reject-btn";

    actionButtons.appendChild(approveButton);
    actionButtons.appendChild(rejectButton);


    admissionCard.appendChild(clientInfo);
       admissionCard.appendChild(actionButtons);
    admissionList.appendChild(admissionCard);
});


// ========================== Display Approved Client ===========================
approvedClients.forEach(function(client){

    // ===================== Client Card ==================
    const clientCard = document.createElement("div");
    clientCard.className = "client-card";

    
    // ================= Client Details Box =================
    const clientDetails = document.createElement("div");
    clientDetails.className = "client-details";


    // ===================== client Info =====================
    const clientInfo = document.createElement("div");
    clientInfo.className = "client-info";


    
    // =============== Client Name ==================
    const clientName = document.createElement("p");
    clientName.textContent = "Client Name: " + client.name;
    clientInfo.appendChild(clientName);


    // =============== Client ID =====================
    const clientId = document.createElement("p");
    clientId.textContent = "Client Id: " + client.clientId;
    clientInfo.appendChild(clientId);




    // ============== Phone Number ======================
    // const clientPhone = document.createElement("p");
    // clientPhone.textContent = "Phone Number: " + client.phoneNumber;
    // clientInfo.appendChild(clientPhone);


    // ==================== Email ====================
    // const clientEmail = document.createElement("p");
    // clientEmail.textContent = "Email: " + client.email;
    // clientInfo.appendChild(clientEmail);


    // ==================== Package =======================
    const clientPackage = document.createElement("p");
    if(client.personalDuration !== ""){
    clientPackage.textContent = "Selected Package: Personal Training";
    }
    if(client.groupDuration !== ""){
        clientPackage.textContent = "Selected Package: Group Training";
    }
    clientInfo.appendChild(clientPackage);


    // ==================== Duration & Fee ====================
    // const clientDurationFee = document.createElement("p");
    // if(client.personalDuration !== ""){
        // clientDurationFee.textContent = "Duration & Fee: " + client.personalDuration;
    // }
    // if(client.groupDuration !== ""){
        // clientDurationFee.textContent = "Duration & Fee: " + client.groupDuration;
    // }
    // clientInfo.appendChild(clientDurationFee);


    // ==================== Status ===================
    const clientStatus = document.createElement("p");
    clientStatus.textContent = "Membership Status: " + client.status;
    clientInfo.appendChild(clientStatus);



    // ================== Manage Button ====================
    const clientActions = document.createElement("div");
    clientActions.className = "client-actions";

    const manageClientButton = document.createElement("button");
    manageClientButton.textContent = "Manage Client";
    manageClientButton.className = "manage-client-btn";
    clientActions.appendChild(manageClientButton);


    // =============== Complete Info Disply on click manage btn =======================
    manageClientButton.addEventListener("click", function(){
        
        if(clientDetails.style.display === "block"){
        clientDetails.style.display = "none";
        clientMain.style.display = "flex";
        manageClientButton.classList.remove("active");
        return;
        }

        
        document.querySelectorAll(".client-details").forEach(function(details){

    if(details !== clientDetails){

        details.style.display = "none";

        const otherClientCard = details.parentElement;

        const otherClientMain =
            otherClientCard.querySelector(".client-main");

        const otherManageButton =
            otherClientCard.querySelector(".manage-client-btn");

        otherClientMain.style.display = "flex";

        otherManageButton.classList.remove("active");
    }

    });

 
        clientDetails.style.display = "block";
        clientMain.style.display = "none";
        manageClientButton.classList.add("active");

        clientDetails.textContent = "";


        // ================= Client Details Heading =================
        const detailsHeading = document.createElement("h2");
        detailsHeading.textContent = "Client Details";
        clientDetails.appendChild(detailsHeading);


        // =============== ID ================
        const clientId = document.createElement("p");
        clientId.textContent = "Client Id : " + client.clientId;
        clientDetails.appendChild(clientId);


        // =================== Name ======================
        const clientName = document.createElement("p");
        clientName.textContent = "Client Name : " + client.name;
        clientDetails.appendChild(clientName);


        // ===================== Father Name ======================
        const fatherName = document.createElement("p");
        fatherName.textContent = "Father Name : " + client.fatherName;
        clientDetails.appendChild(fatherName);


        // ==================== Date of BIrth =======================
        const dateOfBirth = document.createElement("p");
        dateOfBirth.textContent = "Date of Birth : " + client.dateOfBirth;
        clientDetails.appendChild(dateOfBirth);


        // ================= Gender ==================
        const gender = document.createElement("p");
        gender.textContent = "Gender : " + client.gender;
        clientDetails.appendChild(gender);


        // ==================== CNIC ===================
        const CNIC = document.createElement("p");
        CNIC.textContent = "CNIC : " + client.cnic;
        clientDetails.appendChild(CNIC);


        // =============== Blood Group ======================
        const bloodGroup = document.createElement("p");
        bloodGroup.textContent = "Blood Group : " + client.bloodGroup;
        clientDetails.appendChild(bloodGroup);


        // =================== Phone Number ====================
        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = "Phone Number : " + client.phoneNumber;
        clientDetails.appendChild(phoneNumber);


        // ================= Email ================
        const email = document.createElement("p");
        email.textContent = "Email : " + client.email;
        clientDetails.appendChild(email);


        // ================ Address ====================
        const address = document.createElement("p");
        address.textContent = "Address : " + client.address;
        clientDetails.appendChild(address);


        // ================== Emergency Contact Name ===================
        const emergencyContactName = document.createElement("p");
        emergencyContactName.textContent = "Emergency Contact Name : " + client.amergencyContactName;
        clientDetails.appendChild(emergencyContactName);


        

        // ================== Emergency Contact Number===================
        const emergencyContactNumber = document.createElement("p");
        emergencyContactNumber.textContent = "Emergency Contact Number : " + client.amergencyContactNumber;
        clientDetails.appendChild(emergencyContactNumber);


        
        // ================ Medical Condition ====================
        const medicalCondition = document.createElement("p");
        medicalCondition.textContent = "Medical Condition : " + client.medicalCondition;
        clientDetails.appendChild(medicalCondition);


        
    // ==================== Package =======================
    const selectedPackage = document.createElement("p");
    if(client.personalDuration !== ""){
    selectedPackage.textContent = "Selected Package: Personal Training";
    }
    if(client.groupDuration !== ""){
        selectedPackage.textContent = "Selected Package: Group Training";
    }
    clientDetails.appendChild(selectedPackage);


    // ==================== Duration & Fee ====================
    const DurationFee = document.createElement("p");
    if(client.personalDuration !== ""){
        DurationFee.textContent = "Duration & Fee: " + client.personalDuration;
    }
    if(client.groupDuration !== ""){
        DurationFee.textContent = "Duration & Fee: " + client.groupDuration;
    }
    clientDetails.appendChild(DurationFee);

   
    
    // ================ Status ====================
    const membershipStatus = document.createElement("p");
    membershipStatus.textContent = "Membership Status : " + client.status;
    clientDetails.appendChild(membershipStatus);


    
    // ================ Payment Method ====================
    const paymentMethod = document.createElement("p");
    paymentMethod.textContent = "Payment Method : " + client.payment.paymentMethod;
    clientDetails.appendChild(paymentMethod);


    
    // ================ Payment Reference Number ====================
    if(client.payment.referenceNumber !== ""){
    const referenceNumber = document.createElement("p");
    referenceNumber.textContent = "Reference / Transaction Number : " + client.payment.referenceNumber;
    clientDetails.appendChild(referenceNumber);
    }

    
    // ================ Date ====================
    const paymentDate = document.createElement("p");
    paymentDate.textContent = "Payment Date : " + client.payment.paymentDate;
    clientDetails.appendChild(paymentDate);


    // ================ Time ====================
    const paymentTime = document.createElement("p");
    paymentTime.textContent = "Payment Time : " + client.payment.paymentTime;
    clientDetails.appendChild(paymentTime);


    
    // ================ Payment Status ====================
    const paymentStatus = document.createElement("p");
    paymentStatus.textContent = "Payment Status : " + client.payment.status;
    clientDetails.appendChild(paymentStatus);
    });

    const clientMain = document.createElement("div");
    clientMain.className = "client-main";

    clientMain.appendChild(clientInfo);

    const clientView = document.createElement("div");
    clientView.className = "client-view";
    

    clientView.appendChild(clientMain);
    // clientView.appendChild(clientActions);

    clientCard.appendChild(clientView);
    clientCard.appendChild(clientDetails);
    clientCard.appendChild(clientActions);

    clientsList.appendChild(clientCard);        
});