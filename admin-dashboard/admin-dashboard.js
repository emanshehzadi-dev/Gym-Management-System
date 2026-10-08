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
const cells = membershipCard.querySelectorAll("td");

cells[0].textContent = client.clientId;
cells[1].textContent = client.name;
cells[2].textContent = new Date(client.approvalDate).toLocaleDateString();
cells[3].textContent = expiryDate.toLocaleDateString();
cells[4].textContent = "Expiring Soon";
cells[5].textContent = "Membership expires in " + daysLeft + " days !";

expiringSoonList.appendChild(membershipCard);
















        //     const membershipCard = expiringSoonTemplate.content.cloneNode(true);
        //     const paragraphs = membershipCard.querySelectorAll("p");
        //     // ================= client card ====================
        //     paragraphs[0].textContent = "Client ID : " + client.clientId;
        //     paragraphs[1].textContent = "Client Name : " + client.name;
        //     paragraphs[2].textContent = "Entry Date : " + new Date(client.approvalDate).toLocaleDateString();
        //     paragraphs[3].textContent = "Expiry Date : " + expiryDate.toLocaleDateString();
        //     paragraphs[4].textContent = "Membership Status : Expiring Soon";


        //     paragraphs[5].textContent = "Warning  : Membership expires in " + daysLeft + " days !";
        //     expiringSoonList.appendChild(membershipCard);
         }

        //================= Active memberships ==================
        else if(expiryDate > today){
            console.log(client.name, "Active Membership");
            activeClientCount++;
            

        

            const membershipRow = document.createElement("tr");

const clientIdCell = document.createElement("td");
clientIdCell.textContent = client.clientId;
membershipRow.appendChild(clientIdCell);

const clientNameCell = document.createElement("td");
clientNameCell.textContent = client.name;
membershipRow.appendChild(clientNameCell);

const membershipStatusCell = document.createElement("td");
membershipStatusCell.textContent = client.status;
membershipRow.appendChild(membershipStatusCell);

activeMembershipList.appendChild(membershipRow);





        // // ================== Div Create for Membership Client ================
        // const membershipCard = document.createElement("div");
        // membershipCard.className = "membership-client";


        // // ================== Client Id =================
        // const clientId = document.createElement("p");
        // clientId.textContent = "Client ID : " + client.clientId;
        // membershipCard.appendChild(clientId);


        // // ================= Client Name =======================
        // const clientName = document.createElement("p");
        // clientName.textContent = "Client Name : " + client.name;
        // membershipCard.appendChild(clientName);


        // // ================= Membership Status ================
        // const membershipStatus = document.createElement("p");
        // membershipStatus.textContent = "Membership Status : " + client.status;
        // membershipCard.appendChild(membershipStatus);

        // activeMembershipList.appendChild(membershipCard);
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
const expiredCells = expiredCard.querySelectorAll("td");

// ================= client Row ===================
expiredCells[0].textContent = client.clientId;
expiredCells[1].textContent = client.name;
expiredCells[2].textContent = new Date(client.approvalDate).toLocaleDateString();
expiredCells[3].textContent = expiryDate.toLocaleDateString();
expiredCells[4].textContent = "Expired";

expiredMemberships.appendChild(expiredCard);











        // const expiredCard = expiredTemplate.content.cloneNode(true);
        // const expiredParagraphs = expiredCard.querySelectorAll("p");
        // // ================= client Card ===================
        // expiredParagraphs[0].textContent = "Client ID : " + client.clientId;
        // expiredParagraphs[1].textContent = "Client Name : " + client.name;
        // expiredParagraphs[2].textContent = "Entry Date : " + new Date(client.approvalDate).toLocaleDateString();
        // expiredParagraphs[3].textContent = "Expiry Date : " + expiryDate.toLocaleDateString();
        // expiredParagraphs[4].textContent = "Membership Status : Expired";
        // expiredMemberships.appendChild(expiredCard);
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




// //================== Display Pending Client ===============

// pendingClients.forEach(function(client){
//     const admissionCard = document.createElement("div");
//     admissionCard.className = "admission-card";


//     const clientInfo = document.createElement("div");
//     clientInfo.className = "client-info";


//     // ============= Info Name ============
//     const clientName = document.createElement("p");
//     clientName.textContent = "Client Name: " + client.name;
//     clientInfo.appendChild(clientName);


//     // ================ Phone Number ================
//     const clientPhone = document.createElement("p");
//     clientPhone.textContent = "Phone Number: " + client.phoneNumber;
//     clientInfo.appendChild(clientPhone);


//     // ================== Email ================
//     const clientEmail = document.createElement("p");
//     clientEmail.textContent = "Email: " + client.email;
//     clientInfo.appendChild(clientEmail);


//     // ================ Selected Package ================
//     const clientPackage = document.createElement("p");
//     if(client.personalDuration !== ""){
//         clientPackage.textContent = "Selected Package: Personal Training"; 
//     }
//     if(client.groupDuration !== ""){
//         clientPackage.textContent = "Selected Package: Group Training";
//     }
//     clientInfo.appendChild(clientPackage);


//     // ================== Duration ================
//     const clientDuration = document.createElement("p");
//     if(client.personalDuration !== ""){
//         clientDuration.textContent = "Duration: " + client.personalDuration.split(" - ")[0];
//     }
//     if(client.groupDuration !== ""){
//         clientDuration.textContent = "Duration: " + client.groupDuration.split(" - ")[0];
//     }
//     clientInfo.appendChild(clientDuration);

//     // ================ Fee ===================
//     const clientFee = document.createElement("p");
//     if(client.personalDuration !== ""){
//         clientFee.textContent = "Fee: " + client.personalDuration.split(" - ")[1];
//     }
//     if(client.groupDuration !== ""){
//         clientFee.textContent = "Fee: " + client.groupDuration.split(" - ")[1];
//     }
//     clientInfo.appendChild(clientFee);


//     // =============== Payment method ===============
//     const clientPaymentMethod = document.createElement("p");
//     clientPaymentMethod.textContent = "Payment Method: " + client.payment.paymentMethod;
//     clientInfo.appendChild(clientPaymentMethod);


//     // =============== Reference Transaction Number =================
//     if(client.payment.referenceNumber !== ""){
//         const clientReference = document.createElement("p");
//         clientReference.textContent = "Reference / Transaction Number: " + client.payment.referenceNumber;
//         clientInfo.appendChild(clientReference);
//     }


//     // ================ Date =================
//     const clientDate = document.createElement("p");
//     clientDate.textContent = "Date: " + client.payment.paymentDate;
//     clientInfo.appendChild(clientDate);


//     // ================ Time ================
//     const clientTime = document.createElement("p");
//     clientTime.textContent = "Time: " + client.payment.paymentTime;
//     clientInfo.appendChild(clientTime);


//     // ================= Status ===================
//     const clientStatus = document.createElement("p");
//     clientStatus.textContent = "Status: " + client.payment.status;
//     clientInfo.appendChild(clientStatus);


//     // ============== Actions Buttons ====================
//     const actionButtons = document.createElement("div");
//     actionButtons.className = "request-actions";

//     const approveButton = document.createElement("button");
//     approveButton.textContent = "Approve";
//     approveButton.className = "approve-btn";

//     // ================ approval =================
//     approveButton.addEventListener("click", function(){
//         client.status = "Approved";
//         client.payment.status = "Verified";
//         client.approvalDate = new Date().toLocaleDateString();



//     // ================== ID Generate ================
//         let clientId;
//         do{
//             clientId = "CL" + Math.floor(1000 + Math.random() * 9000);
//         }while(clients.some(function(client){
//             return client.clientId === clientId;
//         }));
//         client.clientId = clientId;


//         // ================= Password Generate ================
//          let initialPassword = Math.random().toString(36).slice(2, 8);
//          client.password = initialPassword;




//         // =========================== NOTIFICATIONS SECTION ==============================
//         // ================== Admission approved notification ====================
//         const admissionNotification = {
//             clientId: client.clientId,
//             type: "Admission Approved",
//             message: "Your admission has been approved."
//         }
//         notifications.push(admissionNotification);
//         localStorage.setItem("notifications", JSON.stringify(notifications));




//         // ================ Client id jenerate notification =====================
//         const idGeneratedNotification = {
//             clientId: client.clientId,
//             type: "Client ID Generated",
//             message: "Your Client ID and initial password have been generated."
//         };
//         notifications.push(idGeneratedNotification);
//         localStorage.setItem("notifications", JSON.stringify(notifications));


        

//         localStorage.setItem("clients", JSON.stringify(clients));

//         approveButton.disabled = true;
//         rejectButton.disabled = true;
//     });

//     const rejectButton = document.createElement("button");
//     rejectButton.textContent = "Reject";
//     rejectButton.className = "reject-btn";

//     actionButtons.appendChild(approveButton);
//     actionButtons.appendChild(rejectButton);


//     admissionCard.appendChild(clientInfo);
//        admissionCard.appendChild(actionButtons);
//     admissionList.appendChild(admissionCard);
// });






//================== Display Pending Client ===============

pendingClients.forEach(function(client){

    const admissionRow = document.createElement("tr");

    // ================= Client Name =================
    const clientName = document.createElement("td");
    clientName.textContent = client.name;
    admissionRow.appendChild(clientName);

    // ================= Phone Number =================
    const clientPhone = document.createElement("td");
    clientPhone.textContent = client.phoneNumber;
    admissionRow.appendChild(clientPhone);

    // ================= Email =================
    const clientEmail = document.createElement("td");
    clientEmail.textContent = client.email;
    admissionRow.appendChild(clientEmail);

    // ================= Package =================
    const clientPackage = document.createElement("td");

    if(client.personalDuration !== ""){
        clientPackage.textContent = "Personal Training";
    }

    if(client.groupDuration !== ""){
        clientPackage.textContent = "Group Training";
    }

    admissionRow.appendChild(clientPackage);

    // ================= Duration =================
    const clientDuration = document.createElement("td");

    if(client.personalDuration !== ""){
        clientDuration.textContent =
            client.personalDuration.split(" - ")[0];
    }

    if(client.groupDuration !== ""){
        clientDuration.textContent =
            client.groupDuration.split(" - ")[0];
    }

    admissionRow.appendChild(clientDuration);

    // ================= Fee =================
    const clientFee = document.createElement("td");

    if(client.personalDuration !== ""){
        clientFee.textContent =
            client.personalDuration.split(" - ")[1];
    }

    if(client.groupDuration !== ""){
        clientFee.textContent =
            client.groupDuration.split(" - ")[1];
    }

    admissionRow.appendChild(clientFee);

    // ================= Payment Method =================
    const clientPaymentMethod = document.createElement("td");
    clientPaymentMethod.textContent =
        client.payment.paymentMethod;

    admissionRow.appendChild(clientPaymentMethod);

    // ================= Reference Number =================
    const clientReference = document.createElement("td");

    if(client.payment.referenceNumber !== ""){
        clientReference.textContent =
            client.payment.referenceNumber;
    }
    else{
        clientReference.textContent = "-";
    }

    admissionRow.appendChild(clientReference);

    // ================= Payment Date =================
    const clientDate = document.createElement("td");
    clientDate.textContent =
        client.payment.paymentDate;

    admissionRow.appendChild(clientDate);

    // ================= Payment Time =================
    const clientTime = document.createElement("td");
    clientTime.textContent =
        client.payment.paymentTime;

    admissionRow.appendChild(clientTime);

    // ================= Payment Status =================
    const clientStatus = document.createElement("td");
    clientStatus.textContent =
        client.payment.status;

    admissionRow.appendChild(clientStatus);

    // ================= Action =================
    const actionCell = document.createElement("td");

    const actionButtons = document.createElement("div");
    actionButtons.className = "request-actions";

    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.className = "approve-btn";

    approveButton.addEventListener("click", function(){

        client.status = "Approved";
        client.payment.status = "Verified";
        client.approvalDate = new Date().toLocaleDateString();

        let clientId;

        do{
            clientId =
                "CL" + Math.floor(1000 + Math.random() * 9000);

        }while(clients.some(function(client){
            return client.clientId === clientId;
        }));

        client.clientId = clientId;

        let initialPassword =
            Math.random().toString(36).slice(2, 8);

        client.password = initialPassword;

        const admissionNotification = {
            clientId: client.clientId,
            type: "Admission Approved",
            message: "Your admission has been approved."
        };

        notifications.push(admissionNotification);

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

        const idGeneratedNotification = {
            clientId: client.clientId,
            type: "Client ID Generated",
            message:
                "Your Client ID and initial password have been generated."
        };

        notifications.push(idGeneratedNotification);

        localStorage.setItem(
            "notifications",
            JSON.stringify(notifications)
        );

        localStorage.setItem(
            "clients",
            JSON.stringify(clients)
        );

        approveButton.disabled = true;
        rejectButton.disabled = true;

    });

    const rejectButton = document.createElement("button");
    rejectButton.textContent = "Reject";
    rejectButton.className = "reject-btn";

    actionButtons.appendChild(approveButton);
    actionButtons.appendChild(rejectButton);

    actionCell.appendChild(actionButtons);

    admissionRow.appendChild(actionCell);

    admissionList.appendChild(admissionRow);

});














// // ========================== Display Approved Client ===========================
// approvedClients.forEach(function(client){

//     // ===================== Client Card ==================
//     const clientCard = document.createElement("div");
//     clientCard.className = "client-card";

    
//     // ================= Client Details Box =================
//     const clientDetails = document.createElement("div");
//     clientDetails.className = "client-details";


//     // ===================== client Info =====================
//     const clientInfo = document.createElement("div");
//     clientInfo.className = "client-info";


    
//     // =============== Client Name ==================
//     const clientName = document.createElement("p");
//     clientName.textContent = "Client Name: " + client.name;
//     clientInfo.appendChild(clientName);


//     // =============== Client ID =====================
//     const clientId = document.createElement("p");
//     clientId.textContent = "Client Id: " + client.clientId;
//     clientInfo.appendChild(clientId);




//     // ============== Phone Number ======================
//     // const clientPhone = document.createElement("p");
//     // clientPhone.textContent = "Phone Number: " + client.phoneNumber;
//     // clientInfo.appendChild(clientPhone);


//     // ==================== Email ====================
//     // const clientEmail = document.createElement("p");
//     // clientEmail.textContent = "Email: " + client.email;
//     // clientInfo.appendChild(clientEmail);


//     // ==================== Package =======================
//     const clientPackage = document.createElement("p");
//     if(client.personalDuration !== ""){
//     clientPackage.textContent = "Selected Package: Personal Training";
//     }
//     if(client.groupDuration !== ""){
//         clientPackage.textContent = "Selected Package: Group Training";
//     }
//     clientInfo.appendChild(clientPackage);


//     // ==================== Duration & Fee ====================
//     // const clientDurationFee = document.createElement("p");
//     // if(client.personalDuration !== ""){
//         // clientDurationFee.textContent = "Duration & Fee: " + client.personalDuration;
//     // }
//     // if(client.groupDuration !== ""){
//         // clientDurationFee.textContent = "Duration & Fee: " + client.groupDuration;
//     // }
//     // clientInfo.appendChild(clientDurationFee);


//     // ==================== Status ===================
//     const clientStatus = document.createElement("p");
//     clientStatus.textContent = "Membership Status: " + client.status;
//     clientInfo.appendChild(clientStatus);



//     // ================== Manage Button ====================
//     const clientActions = document.createElement("div");
//     clientActions.className = "client-actions";

//     const manageClientButton = document.createElement("button");
//     manageClientButton.textContent = "Manage Client";
//     manageClientButton.className = "manage-client-btn";
//     clientActions.appendChild(manageClientButton);


//     // =============== Complete Info Disply on click manage btn =======================
//     manageClientButton.addEventListener("click", function(){
        
//         if(clientDetails.style.display === "block"){
//         clientDetails.style.display = "none";
//         clientMain.style.display = "flex";
//         manageClientButton.classList.remove("active");
//         return;
//         }

        
//         document.querySelectorAll(".client-details").forEach(function(details){

//     if(details !== clientDetails){

//         details.style.display = "none";

//         const otherClientCard = details.parentElement;

//         const otherClientMain =
//             otherClientCard.querySelector(".client-main");

//         const otherManageButton =
//             otherClientCard.querySelector(".manage-client-btn");

//         otherClientMain.style.display = "flex";

//         otherManageButton.classList.remove("active");
//     }

//     });

 
//         clientDetails.style.display = "block";
//         clientMain.style.display = "none";
//         manageClientButton.classList.add("active");

//         clientDetails.textContent = "";


//         // ================= Client Details Heading =================
//         const detailsHeading = document.createElement("h2");
//         detailsHeading.textContent = "Client Details";
//         clientDetails.appendChild(detailsHeading);


//         // =============== ID ================
//         const clientId = document.createElement("p");
//         clientId.textContent = "Client Id : " + client.clientId;
//         clientDetails.appendChild(clientId);


//         // =================== Name ======================
//         const clientName = document.createElement("p");
//         clientName.textContent = "Client Name : " + client.name;
//         clientDetails.appendChild(clientName);


//         // ===================== Father Name ======================
//         const fatherName = document.createElement("p");
//         fatherName.textContent = "Father Name : " + client.fatherName;
//         clientDetails.appendChild(fatherName);


//         // ==================== Date of BIrth =======================
//         const dateOfBirth = document.createElement("p");
//         dateOfBirth.textContent = "Date of Birth : " + client.dateOfBirth;
//         clientDetails.appendChild(dateOfBirth);


//         // ================= Gender ==================
//         const gender = document.createElement("p");
//         gender.textContent = "Gender : " + client.gender;
//         clientDetails.appendChild(gender);


//         // ==================== CNIC ===================
//         const CNIC = document.createElement("p");
//         CNIC.textContent = "CNIC : " + client.cnic;
//         clientDetails.appendChild(CNIC);


//         // =============== Blood Group ======================
//         const bloodGroup = document.createElement("p");
//         bloodGroup.textContent = "Blood Group : " + client.bloodGroup;
//         clientDetails.appendChild(bloodGroup);


//         // =================== Phone Number ====================
//         const phoneNumber = document.createElement("p");
//         phoneNumber.textContent = "Phone Number : " + client.phoneNumber;
//         clientDetails.appendChild(phoneNumber);


//         // ================= Email ================
//         const email = document.createElement("p");
//         email.textContent = "Email : " + client.email;
//         clientDetails.appendChild(email);


//         // ================ Address ====================
//         const address = document.createElement("p");
//         address.textContent = "Address : " + client.address;
//         clientDetails.appendChild(address);


//         // ================== Emergency Contact Name ===================
//         const emergencyContactName = document.createElement("p");
//         emergencyContactName.textContent = "Emergency Contact Name : " + client.amergencyContactName;
//         clientDetails.appendChild(emergencyContactName);


        

//         // ================== Emergency Contact Number===================
//         const emergencyContactNumber = document.createElement("p");
//         emergencyContactNumber.textContent = "Emergency Contact Number : " + client.amergencyContactNumber;
//         clientDetails.appendChild(emergencyContactNumber);


        
//         // ================ Medical Condition ====================
//         const medicalCondition = document.createElement("p");
//         medicalCondition.textContent = "Medical Condition : " + client.medicalCondition;
//         clientDetails.appendChild(medicalCondition);


        
//     // ==================== Package =======================
//     const selectedPackage = document.createElement("p");
//     if(client.personalDuration !== ""){
//     selectedPackage.textContent = "Selected Package: Personal Training";
//     }
//     if(client.groupDuration !== ""){
//         selectedPackage.textContent = "Selected Package: Group Training";
//     }
//     clientDetails.appendChild(selectedPackage);


//     // ==================== Duration & Fee ====================
//     const DurationFee = document.createElement("p");
//     if(client.personalDuration !== ""){
//         DurationFee.textContent = "Duration & Fee: " + client.personalDuration;
//     }
//     if(client.groupDuration !== ""){
//         DurationFee.textContent = "Duration & Fee: " + client.groupDuration;
//     }
//     clientDetails.appendChild(DurationFee);

   
    
//     // ================ Status ====================
//     const membershipStatus = document.createElement("p");
//     membershipStatus.textContent = "Membership Status : " + client.status;
//     clientDetails.appendChild(membershipStatus);


    
//     // ================ Payment Method ====================
//     const paymentMethod = document.createElement("p");
//     paymentMethod.textContent = "Payment Method : " + client.payment.paymentMethod;
//     clientDetails.appendChild(paymentMethod);


    
//     // ================ Payment Reference Number ====================
//     if(client.payment.referenceNumber !== ""){
//     const referenceNumber = document.createElement("p");
//     referenceNumber.textContent = "Reference / Transaction Number : " + client.payment.referenceNumber;
//     clientDetails.appendChild(referenceNumber);
//     }

    
//     // ================ Date ====================
//     const paymentDate = document.createElement("p");
//     paymentDate.textContent = "Payment Date : " + client.payment.paymentDate;
//     clientDetails.appendChild(paymentDate);


//     // ================ Time ====================
//     const paymentTime = document.createElement("p");
//     paymentTime.textContent = "Payment Time : " + client.payment.paymentTime;
//     clientDetails.appendChild(paymentTime);


    
//     // ================ Payment Status ====================
//     const paymentStatus = document.createElement("p");
//     paymentStatus.textContent = "Payment Status : " + client.payment.status;
//     clientDetails.appendChild(paymentStatus);
//     });

//     const clientMain = document.createElement("div");
//     clientMain.className = "client-main";

//     clientMain.appendChild(clientInfo);

//     const clientView = document.createElement("div");
//     clientView.className = "client-view";
    

//     clientView.appendChild(clientMain);
//     // clientView.appendChild(clientActions);

//     clientCard.appendChild(clientView);
//     clientCard.appendChild(clientDetails);
//     clientCard.appendChild(clientActions);

//     clientsList.appendChild(clientCard);        
// });













// ========================== Display Approved Client ===========================
// const clientsTable = document.createElement("table");
// clientsTable.className = "admin-table";


const clientsTable = document.createElement("table"); 
clientsTable.className = "clients-table";

// ========================== Table Heading ===========================
const clientsThead = document.createElement("thead");
const clientsHeadingRow = document.createElement("tr");

const clientNameHeading = document.createElement("th");
clientNameHeading.textContent = "Client Name";

const clientIdHeading = document.createElement("th");
clientIdHeading.textContent = "Client ID";

const clientPackageHeading = document.createElement("th");
clientPackageHeading.textContent = "Package";

const clientStatusHeading = document.createElement("th");
clientStatusHeading.textContent = "Membership Status";

const clientActionHeading = document.createElement("th");
clientActionHeading.textContent = "Action";

clientsHeadingRow.appendChild(clientNameHeading);
clientsHeadingRow.appendChild(clientIdHeading);
clientsHeadingRow.appendChild(clientPackageHeading);
clientsHeadingRow.appendChild(clientStatusHeading);
clientsHeadingRow.appendChild(clientActionHeading);

clientsThead.appendChild(clientsHeadingRow);
clientsTable.appendChild(clientsThead);


// ========================== Table Body ===========================
const clientsTbody = document.createElement("tbody");

approvedClients.forEach(function(client){

    const clientRow = document.createElement("tr");

    // ================= Client Name =================
    const clientName = document.createElement("td");
    clientName.textContent = client.name;
    clientRow.appendChild(clientName);


    // ================= Client ID =================
    const clientId = document.createElement("td");
    clientId.textContent = client.clientId;
    clientRow.appendChild(clientId);


    // ================= Package =================
    const clientPackage = document.createElement("td");

    if(client.personalDuration !== ""){
        clientPackage.textContent = "Personal Training";
    }

    if(client.groupDuration !== ""){
        clientPackage.textContent = "Group Training";
    }

    clientRow.appendChild(clientPackage);


    // ================= Membership Status =================
    const clientStatus = document.createElement("td");
    clientStatus.textContent = client.status;
    clientRow.appendChild(clientStatus);


    // ================= Action =================
    const clientAction = document.createElement("td");

    const manageClientButton = document.createElement("button");
    manageClientButton.textContent = "Manage Client";
    manageClientButton.className = "manage-client-btn";

    clientAction.appendChild(manageClientButton);
    clientRow.appendChild(clientAction);


    // ================= Client Details =================
    const clientDetails = document.createElement("div");
    clientDetails.className = "client-details";


    // ================= Complete Info Display =================
    manageClientButton.addEventListener("click", function(){

        if(clientDetails.style.display === "block"){
            clientDetails.style.display = "none";
            manageClientButton.classList.remove("active");
            return;
        }


        document.querySelectorAll(".client-details").forEach(function(details){

            if(details !== clientDetails){

                details.style.display = "none";

                const otherManageButton =
                    details.parentElement.querySelector(".manage-client-btn");

                if(otherManageButton){
                    otherManageButton.classList.remove("active");
                }
            }

        });


        clientDetails.style.display = "block";
        manageClientButton.classList.add("active");

        clientDetails.textContent = "";


        // ================= Client Details Heading =================
        const detailsHeading = document.createElement("h2");
        detailsHeading.textContent = "Client Details";
        clientDetails.appendChild(detailsHeading);


        // ================= ID =================
        const clientId = document.createElement("p");
        clientId.textContent = "Client Id : " + client.clientId;
        clientDetails.appendChild(clientId);


        // ================= Name =================
        const clientName = document.createElement("p");
        clientName.textContent = "Client Name : " + client.name;
        clientDetails.appendChild(clientName);


        // ================= Father Name =================
        const fatherName = document.createElement("p");
        fatherName.textContent = "Father Name : " + client.fatherName;
        clientDetails.appendChild(fatherName);


        // ================= Date of Birth =================
        const dateOfBirth = document.createElement("p");
        dateOfBirth.textContent = "Date of Birth : " + client.dateOfBirth;
        clientDetails.appendChild(dateOfBirth);


        // ================= Gender =================
        const gender = document.createElement("p");
        gender.textContent = "Gender : " + client.gender;
        clientDetails.appendChild(gender);


        // ================= CNIC =================
        const CNIC = document.createElement("p");
        CNIC.textContent = "CNIC : " + client.cnic;
        clientDetails.appendChild(CNIC);


        // ================= Blood Group =================
        const bloodGroup = document.createElement("p");
        bloodGroup.textContent = "Blood Group : " + client.bloodGroup;
        clientDetails.appendChild(bloodGroup);


        // ================= Phone Number =================
        const phoneNumber = document.createElement("p");
        phoneNumber.textContent = "Phone Number : " + client.phoneNumber;
        clientDetails.appendChild(phoneNumber);


        // ================= Email =================
        const email = document.createElement("p");
        email.textContent = "Email : " + client.email;
        clientDetails.appendChild(email);


        // ================= Address =================
        const address = document.createElement("p");
        address.textContent = "Address : " + client.address;
        clientDetails.appendChild(address);


        // ================= Emergency Contact Name =================
        const emergencyContactName = document.createElement("p");
        emergencyContactName.textContent =
            "Emergency Contact Name : " + client.amergencyContactName;
        clientDetails.appendChild(emergencyContactName);


        // ================= Emergency Contact Number =================
        const emergencyContactNumber = document.createElement("p");
        emergencyContactNumber.textContent =
            "Emergency Contact Number : " + client.amergencyContactNumber;
        clientDetails.appendChild(emergencyContactNumber);


        // ================= Medical Condition =================
        const medicalCondition = document.createElement("p");
        medicalCondition.textContent =
            "Medical Condition : " + client.medicalCondition;
        clientDetails.appendChild(medicalCondition);


        // ================= Package =================
        const selectedPackage = document.createElement("p");

        if(client.personalDuration !== ""){
            selectedPackage.textContent =
                "Selected Package: Personal Training";
        }

        if(client.groupDuration !== ""){
            selectedPackage.textContent =
                "Selected Package: Group Training";
        }

        clientDetails.appendChild(selectedPackage);


        // ================= Duration & Fee =================
        const DurationFee = document.createElement("p");

        if(client.personalDuration !== ""){
            DurationFee.textContent =
                "Duration & Fee: " + client.personalDuration;
        }

        if(client.groupDuration !== ""){
            DurationFee.textContent =
                "Duration & Fee: " + client.groupDuration;
        }

        clientDetails.appendChild(DurationFee);


        // ================= Status =================
        const membershipStatus = document.createElement("p");
        membershipStatus.textContent =
            "Membership Status : " + client.status;
        clientDetails.appendChild(membershipStatus);


        // ================= Payment Method =================
        const paymentMethod = document.createElement("p");
        paymentMethod.textContent =
            "Payment Method : " + client.payment.paymentMethod;
        clientDetails.appendChild(paymentMethod);


        // ================= Payment Reference Number =================
        if(client.payment.referenceNumber !== ""){

            const referenceNumber = document.createElement("p");

            referenceNumber.textContent =
                "Reference / Transaction Number : " +
                client.payment.referenceNumber;

            clientDetails.appendChild(referenceNumber);
        }


        // ================= Payment Date =================
        const paymentDate = document.createElement("p");
        paymentDate.textContent =
            "Payment Date : " + client.payment.paymentDate;
        clientDetails.appendChild(paymentDate);


        // ================= Payment Time =================
        const paymentTime = document.createElement("p");
        paymentTime.textContent =
            "Payment Time : " + client.payment.paymentTime;
        clientDetails.appendChild(paymentTime);


        // ================= Payment Status =================
        const paymentStatus = document.createElement("p");
        paymentStatus.textContent =
            "Payment Status : " + client.payment.status;
        clientDetails.appendChild(paymentStatus);

    });


    clientsTbody.appendChild(clientRow);

    // Details ko table ke neeche rakhne ke liye
    clientsTbody.appendChild(
        Object.assign(document.createElement("tr"), {
            innerHTML: '<td colspan="5"></td>'
        })
    );

    clientsTbody.lastElementChild.firstElementChild.appendChild(clientDetails);

});

clientsTable.appendChild(clientsTbody);


// ========================== Display Table ===========================
// clientsList.appendChild(clientsTable);


// ========================== Display Table ===========================

const clientsTableContainer = document.createElement("div");
clientsTableContainer.className = "clients-table-container";

clientsTableContainer.appendChild(clientsTable);

clientsList.appendChild(clientsTableContainer);


















// ============ Trainer Applications ==================

// let pendingTrainerApplications =
//     JSON.parse(sessionStorage.getItem("pendingTrainerApplications")) || [];

const trainerApplicationsList = document.getElementById("trainerApplicationsList");

let pendingTrainerApplications = JSON.parse(localStorage.getItem("pendingTrainerApplications")) || [];

let trainerApplications = JSON.parse(localStorage.getItem("trainerApplications")) || [];


pendingTrainerApplications.forEach(function(application) {

    const row = document.createElement("tr");

    // ================= Application ID =================
    const applicationId = document.createElement("td");
    applicationId.textContent = application.applicationId;
    row.appendChild(applicationId);


    // ================= Applicant Name =================
    const applicantName = document.createElement("td");
    applicantName.textContent = application.fullName;
    row.appendChild(applicantName);


    // // ================= Email =================
    // const email = document.createElement("td");
    // email.textContent = application.email;
    // row.appendChild(email);


    // ================= Specialization =================
    const specialization = document.createElement("td");
    specialization.textContent = application.specialization;
    row.appendChild(specialization);


    // // ================= Experience =================
    // const experience = document.createElement("td");
    // experience.textContent = application.experience;
    // row.appendChild(experience);


    // ================= Application Date =================
    const applicationDate = document.createElement("td");
    applicationDate.textContent = application.applicationDate;
    row.appendChild(applicationDate);


    // ================= Status =================
    const status = document.createElement("td");
    status.textContent = application.status;
    row.appendChild(status);




//     // ================= Select Application Button =================
// const selectButton = document.createElement("button");
// selectButton.textContent = "Select";
// selectButton.className = "select-application-btn";

// applicationDetails.appendChild(selectButton);





    // ================= Action =================
    const actionCell = document.createElement("td");

    const reviewButton = document.createElement("button");
    reviewButton.textContent = "Review";
    reviewButton.className = "review-application-btn";

    actionCell.appendChild(reviewButton);
    row.appendChild(actionCell);


    // ================= Trainer Application Details =================
    const detailsRow = document.createElement("tr");

    const detailsCell = document.createElement("td");
    detailsCell.colSpan = 6;


    const applicationDetails = document.createElement("div");
    applicationDetails.className = "trainer-application-details";


    // ================= Review Button =================
    reviewButton.addEventListener("click", function(){

        // Agar details already open hain to close kar do
        if(applicationDetails.style.display === "block"){

            applicationDetails.style.display = "none";
            reviewButton.classList.remove("active");

            return;
        }


        // Baqi open trainer details close karna
        document.querySelectorAll(".trainer-application-details")
        .forEach(function(details){

            if(details !== applicationDetails){

                details.style.display = "none";

                const otherReviewButton =
                    details.parentElement.parentElement
                    .previousElementSibling
                    .querySelector(".review-application-btn");

                if(otherReviewButton){
                    otherReviewButton.classList.remove("active");
                }
            }

        });


        applicationDetails.style.display = "block";
        reviewButton.classList.add("active");

        applicationDetails.textContent = "";







        // ================= Review Content Wrapper =================
const reviewContentWrapper = document.createElement("div");
reviewContentWrapper.className = "review-content-wrapper";


// ================= Application Details Column =================
const applicationDetailsColumn = document.createElement("div");
applicationDetailsColumn.className = "application-details-column";

reviewContentWrapper.appendChild(applicationDetailsColumn);


// ================= Interview Schedule Column =================
const interviewScheduleColumn = document.createElement("div");
interviewScheduleColumn.className = "interview-schedule-column";


interviewScheduleColumn.style.display = "none";

reviewContentWrapper.appendChild(interviewScheduleColumn);


// Review wrapper ko details mein add karna
applicationDetails.appendChild(reviewContentWrapper);












        // ================= Details Heading =================
        const detailsHeading = document.createElement("h2");
        detailsHeading.textContent = "Trainer Application Details";
        // applicationDetails.appendChild(detailsHeading);
        applicationDetailsColumn.appendChild(detailsHeading);


        // ================= Application ID =================
        const reviewApplicationId = document.createElement("p");
        reviewApplicationId.textContent = "Application Id : " + application.applicationId;
        applicationDetailsColumn.appendChild(reviewApplicationId);


        // ================= Full Name =================
        const reviewFullName = document.createElement("p");
        reviewFullName.textContent = "Full Name : " + application.fullName;
        applicationDetailsColumn.appendChild(reviewFullName);


        // ================= Father Name =================
        const reviewFatherName = document.createElement("p");
        reviewFatherName.textContent = "Father Name : " + application.fatherName;
        applicationDetailsColumn.appendChild(reviewFatherName);


        // ================= CNIC =================
        const reviewCnic = document.createElement("p");
        reviewCnic.textContent = "CNIC : " + application.cnic;
        applicationDetailsColumn.appendChild(reviewCnic);


        // ================= Gender =================
        const reviewGender = document.createElement("p");
        reviewGender.textContent = "Gender : " + application.gender;
        applicationDetailsColumn.appendChild(reviewGender);


        // ================= Date of Birth =================
        const reviewDateOfBirth = document.createElement("p");
        reviewDateOfBirth.textContent = "Date of Birth : " + application.dateOfBirth;
        applicationDetailsColumn.appendChild(reviewDateOfBirth);


        // ================= Phone Number =================
        const reviewPhoneNumber = document.createElement("p");
        reviewPhoneNumber.textContent = "Phone Number : " + application.phoneNumber;
        applicationDetailsColumn.appendChild(reviewPhoneNumber);


        // ================= Email =================
        const reviewEmail = document.createElement("p");
        reviewEmail.textContent = "Email : " + application.email;
        applicationDetailsColumn.appendChild(reviewEmail);


        // ================= Address =================
        const reviewAddress = document.createElement("p");
        reviewAddress.textContent = "Address : " + application.address;
        applicationDetailsColumn.appendChild(reviewAddress);


        // ================= Specialization =================
        const reviewSpecialization = document.createElement("p");
        reviewSpecialization.textContent = "Specialization : " + application.specialization;
        applicationDetailsColumn.appendChild(reviewSpecialization);


        // ================= Experience =================
        const reviewExperience = document.createElement("p");
        reviewExperience.textContent = "Experience : " + application.experience;
        applicationDetailsColumn.appendChild(reviewExperience);


        // ================= Previous Organization =================
        const reviewPreviousOrganization = document.createElement("p");
        reviewPreviousOrganization.textContent =  "Previous Organization : " + application.previousOrganization;
        applicationDetailsColumn.appendChild(reviewPreviousOrganization);


        // ================= Qualification =================
        const reviewQualification = document.createElement("p");
        reviewQualification.textContent = "Qualification / Certification : " + application.qualification;
        applicationDetailsColumn.appendChild(reviewQualification);


        // ================= Professional Summary =================
        const reviewProfessionalSummary = document.createElement("p");
        reviewProfessionalSummary.textContent = "Professional Summary : " + application.professionalSummary;
        applicationDetailsColumn.appendChild(reviewProfessionalSummary);


        // ================= Available Days =================
        const reviewAvailableDays = document.createElement("p");
        reviewAvailableDays.textContent = "Available Days : " + application.availableDays;
        applicationDetailsColumn.appendChild(reviewAvailableDays);


        // ================= Preferred Working Time =================
        const reviewWorkingTime = document.createElement("p");
        reviewWorkingTime.textContent = "Preferred Working Time : " + application.workingTime;
        applicationDetailsColumn.appendChild(reviewWorkingTime);


        // ================= Application Date =================
        const reviewApplicationDate = document.createElement("p");
        reviewApplicationDate.textContent = "Application Date : " + application.applicationDate;
        applicationDetailsColumn.appendChild(reviewApplicationDate);


        // ================= Status =================
        const reviewStatus = document.createElement("p");
        reviewStatus.textContent = "Status : " + application.status;
        applicationDetailsColumn.appendChild(reviewStatus);






        // ================= Scheduled Interview Details =================
if(application.interviewStatus === "Scheduled"){

    const interviewStatus = document.createElement("p");
    interviewStatus.textContent = "Interview Status : " + application.interviewStatus;
    applicationDetailsColumn.appendChild(interviewStatus);


    const interviewDate = document.createElement("p");
    interviewDate.textContent = "Interview Date : " + application.interviewDate;
    applicationDetailsColumn.appendChild(interviewDate);


    const interviewTime = document.createElement("p");
    interviewTime.textContent = "Interview Time : " + application.interviewTime;
    applicationDetailsColumn.appendChild(interviewTime);


    // const meetLink = document.createElement("a");
    // meetLink.textContent = "Join Interview";
    // meetLink.href = application.meetLink;
    // meetLink.target = "_blank";
    // applicationDetailsColumn.appendChild(meetLink);
}






        // ================= Schedule Interview Button =================
const scheduleInterviewButton = document.createElement("button");
scheduleInterviewButton.textContent = "Schedule Interview";
scheduleInterviewButton.className = "schedule-interview-btn";

applicationDetailsColumn.appendChild(scheduleInterviewButton);




// ================= Schedule Interview Form =================
scheduleInterviewButton.addEventListener("click", function(){

    // Agar form already open hai to close kar do
    if(interviewScheduleColumn.style.display === "block"){
        interviewScheduleColumn.style.display = "none";
        return;
    }

    // Pehle existing content clear karna
    interviewScheduleColumn.textContent = "";

    // Form show karna
    interviewScheduleColumn.style.display = "block";


    // ================= Form Heading =================
    const interviewHeading = document.createElement("h2");
    interviewHeading.textContent = "Schedule Interview";
    interviewScheduleColumn.appendChild(interviewHeading);




const applicantName = document.createElement("p");
applicantName.textContent = "Applicant Name : " + application.fullName;
interviewScheduleColumn.appendChild(applicantName);

const applicationId = document.createElement("p");
applicationId.textContent = "Application ID : " + application.applicationId;
interviewScheduleColumn.appendChild(applicationId);






    // ================= Interview Date =================
    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Interview Date";
    interviewScheduleColumn.appendChild(dateLabel);

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.className = "interview-date";
    interviewScheduleColumn.appendChild(dateInput);

    dateInput.value = application.interviewDate || "";


    // ================= Interview Time =================
    const timeLabel = document.createElement("label");
    timeLabel.textContent = "Interview Time";
    interviewScheduleColumn.appendChild(timeLabel);

    const timeInput = document.createElement("input");
    timeInput.type = "time";
    timeInput.className = "interview-time";
    interviewScheduleColumn.appendChild(timeInput);

    timeInput.value = application.interviewTime || "";


    // ================= Google Meet Link =================
    const meetLabel = document.createElement("label");
    meetLabel.textContent = "Google Meet Link";
    interviewScheduleColumn.appendChild(meetLabel);

    const meetInput = document.createElement("input");
    meetInput.type = "url";
    meetInput.placeholder = "Paste Google Meet link";
    meetInput.className = "meet-link";
    interviewScheduleColumn.appendChild(meetInput);

    meetInput.value = application.meetLink || "";





    // ================= Schedule Interview Button =================
const saveInterviewButton = document.createElement("button");
saveInterviewButton.textContent = "Schedule Interview";
saveInterviewButton.className = "save-interview-btn";

interviewScheduleColumn.appendChild(saveInterviewButton);


// ================= Cancel Button =================
const cancelInterviewButton = document.createElement("button");
cancelInterviewButton.textContent = "Cancel";
cancelInterviewButton.className = "cancel-interview-btn";

interviewScheduleColumn.appendChild(cancelInterviewButton);






// Join Interview Button
const joinInterviewButton = document.createElement("button");
joinInterviewButton.textContent = "Join Interview";
joinInterviewButton.className = "join-interview-btn";
joinInterviewButton.disabled = true;
interviewScheduleColumn.appendChild(joinInterviewButton);


// Agar interview pehle se scheduled hai
if(application.interviewStatus === "Scheduled" && application.meetLink){
    joinInterviewButton.disabled = false;
}








// Join Interview
joinInterviewButton.addEventListener("click", function(){

    if(application.meetLink){
        window.open(application.meetLink, "_blank");
    }

});


// joinInterviewButton.disabled = true;






// ================= Interview Message =================
const interviewMessage = document.createElement("p");
interviewMessage.className = "interview-message";

interviewScheduleColumn.appendChild(interviewMessage);


// ================= Save Interview =================
saveInterviewButton.addEventListener("click", function(){

    const interviewDate = dateInput.value;
    const interviewTime = timeInput.value;
    const meetLink = meetInput.value.trim();

    if(!interviewDate || !interviewTime || !meetLink){
        return;
    }

    application.interviewDate = interviewDate;
    application.interviewTime = interviewTime;
    application.meetLink = meetLink;
    application.interviewStatus = "Scheduled";

    localStorage.setItem(
        "pendingTrainerApplications",
        JSON.stringify(pendingTrainerApplications)
    );


    // Enable Join Interview Button
    joinInterviewButton.disabled = false;


//     // Join Interview
//     joinInterviewButton.addEventListener("click", function(){

//     if(application.meetLink){
//         window.open(application.meetLink, "_blank");
//     }

// });



    interviewMessage.textContent = "Interview scheduled successfully.";

});


// ================= Cancel Interview Form =================
cancelInterviewButton.addEventListener("click", function(){

    interviewScheduleColumn.style.display = "none";
    interviewScheduleColumn.textContent = "";

});
});


//========= Agar interview pehle se scheduled hai to form automatically open karo ==========
if(application.interviewStatus === "Scheduled"){
    scheduleInterviewButton.click();
}





// ================= Reject Application Button =================
const rejectApplicationButton = document.createElement("button");
rejectApplicationButton.textContent = "Reject Application";
rejectApplicationButton.className = "reject-application-btn";

applicationDetailsColumn.appendChild(rejectApplicationButton);


    });


    // Details cell mein details div
    detailsCell.appendChild(applicationDetails);

    detailsRow.appendChild(detailsCell);


    // Main application row
    trainerApplicationsList.appendChild(row);


    // Details row main row ke immediately neeche
    trainerApplicationsList.appendChild(detailsRow);

});