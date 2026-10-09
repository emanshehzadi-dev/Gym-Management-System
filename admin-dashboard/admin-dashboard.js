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

//     const admissionRow = document.createElement("tr");

//     // ================= Client Name =================
//     const clientName = document.createElement("td");
//     clientName.textContent = client.name;
//     admissionRow.appendChild(clientName);

//     // ================= Phone Number =================
//     const clientPhone = document.createElement("td");
//     clientPhone.textContent = client.phoneNumber;
//     admissionRow.appendChild(clientPhone);

//     // ================= Email =================
//     const clientEmail = document.createElement("td");
//     clientEmail.textContent = client.email;
//     admissionRow.appendChild(clientEmail);

//     // ================= Package =================
//     const clientPackage = document.createElement("td");

//     if(client.personalDuration !== ""){
//         clientPackage.textContent = "Personal Training";
//     }

//     if(client.groupDuration !== ""){
//         clientPackage.textContent = "Group Training";
//     }

//     admissionRow.appendChild(clientPackage);

//     // ================= Duration =================
//     const clientDuration = document.createElement("td");

//     if(client.personalDuration !== ""){
//         clientDuration.textContent =
//             client.personalDuration.split(" - ")[0];
//     }

//     if(client.groupDuration !== ""){
//         clientDuration.textContent =
//             client.groupDuration.split(" - ")[0];
//     }

//     admissionRow.appendChild(clientDuration);

//     // ================= Fee =================
//     const clientFee = document.createElement("td");

//     if(client.personalDuration !== ""){
//         clientFee.textContent =
//             client.personalDuration.split(" - ")[1];
//     }

//     if(client.groupDuration !== ""){
//         clientFee.textContent =
//             client.groupDuration.split(" - ")[1];
//     }

//     admissionRow.appendChild(clientFee);

//     // ================= Payment Method =================
//     const clientPaymentMethod = document.createElement("td");
//     clientPaymentMethod.textContent =
//         client.payment.paymentMethod;

//     admissionRow.appendChild(clientPaymentMethod);

//     // ================= Reference Number =================
//     const clientReference = document.createElement("td");

//     if(client.payment.referenceNumber !== ""){
//         clientReference.textContent =
//             client.payment.referenceNumber;
//     }
//     else{
//         clientReference.textContent = "-";
//     }

//     admissionRow.appendChild(clientReference);

//     // ================= Payment Date =================
//     const clientDate = document.createElement("td");
//     clientDate.textContent =
//         client.payment.paymentDate;

//     admissionRow.appendChild(clientDate);

//     // ================= Payment Time =================
//     const clientTime = document.createElement("td");
//     clientTime.textContent =
//         client.payment.paymentTime;

//     admissionRow.appendChild(clientTime);

//     // ================= Payment Status =================
//     const clientStatus = document.createElement("td");
//     clientStatus.textContent =
//         client.payment.status;

//     admissionRow.appendChild(clientStatus);

//     // ================= Action =================
//     const actionCell = document.createElement("td");

//     const actionButtons = document.createElement("div");
//     actionButtons.className = "request-actions";

//     const approveButton = document.createElement("button");
//     approveButton.textContent = "Approve";
//     approveButton.className = "approve-btn";

//     approveButton.addEventListener("click", function(){

//         client.status = "Approved";
//         client.payment.status = "Verified";
//         client.approvalDate = new Date().toLocaleDateString();

//         let clientId;

//         do{
//             clientId =
//                 "CL" + Math.floor(1000 + Math.random() * 9000);

//         }while(clients.some(function(client){
//             return client.clientId === clientId;
//         }));

//         client.clientId = clientId;

//         let initialPassword =
//             Math.random().toString(36).slice(2, 8);

//         client.password = initialPassword;

//         const admissionNotification = {
//             clientId: client.clientId,
//             type: "Admission Approved",
//             message: "Your admission has been approved."
//         };

//         notifications.push(admissionNotification);

//         localStorage.setItem(
//             "notifications",
//             JSON.stringify(notifications)
//         );

//         const idGeneratedNotification = {
//             clientId: client.clientId,
//             type: "Client ID Generated",
//             message:
//                 "Your Client ID and initial password have been generated."
//         };

//         notifications.push(idGeneratedNotification);

//         localStorage.setItem(
//             "notifications",
//             JSON.stringify(notifications)
//         );

//         localStorage.setItem(
//             "clients",
//             JSON.stringify(clients)
//         );

//         approveButton.disabled = true;
//         rejectButton.disabled = true;

//     });

//     const rejectButton = document.createElement("button");
//     rejectButton.textContent = "Reject";
//     rejectButton.className = "reject-btn";

//     actionButtons.appendChild(approveButton);
//     actionButtons.appendChild(rejectButton);

//     actionCell.appendChild(actionButtons);

//     admissionRow.appendChild(actionCell);

//     admissionList.appendChild(admissionRow);

// });













//================== Display Pending Client ===============

pendingClients.forEach(function(client){

    const admissionRow = document.createElement("tr");

    // ================= Client Name =================
    const clientName = document.createElement("td");
    clientName.textContent = client.name;
    admissionRow.appendChild(clientName);


    // ================= Package =================
    const clientPackage = document.createElement("td");
    const isPersonal = client.personalDuration !== "";

    clientPackage.textContent = isPersonal
        ? "Personal Training"
        : "Group Training";

    admissionRow.appendChild(clientPackage);


    // ================= Duration =================
    const clientDuration = document.createElement("td");
    const selectedDuration = isPersonal
        ? client.personalDuration
        : client.groupDuration;

    clientDuration.textContent = selectedDuration
        ? selectedDuration.split(" - ")[0]
        : "-";

    admissionRow.appendChild(clientDuration);


    // ================= Payment Status =================
    const paymentStatus = document.createElement("td");
    paymentStatus.textContent = client.payment.status;
    admissionRow.appendChild(paymentStatus);


    // ================= Review Button =================
    const actionCell = document.createElement("td");

    const reviewButton = document.createElement("button");
    reviewButton.textContent = "Review";
    reviewButton.className = "review-admission-btn";

    actionCell.appendChild(reviewButton);
    admissionRow.appendChild(actionCell);

    admissionList.appendChild(admissionRow);


    // ================= Details Row =================
    const detailsRow = document.createElement("tr");

    const detailsCell = document.createElement("td");
    detailsCell.colSpan = 5;

    const admissionDetails = document.createElement("div");
    admissionDetails.className = "admission-details";
    admissionDetails.style.display = "none";

    detailsCell.appendChild(admissionDetails);
    detailsRow.appendChild(detailsCell);

    admissionList.appendChild(detailsRow);


    // ================= Review Details =================
    reviewButton.addEventListener("click", function(){

        if(admissionDetails.style.display === "block"){
            admissionDetails.style.display = "none";
            reviewButton.classList.remove("active");
            return;
        }

        // Close other open admission details
        document.querySelectorAll(".admission-details").forEach(function(details){

            details.style.display = "none";

            const otherButton = details.parentElement
                .querySelector(".review-admission-btn");

            if(otherButton){
                otherButton.classList.remove("active");
            }
        });

        admissionDetails.textContent = "";
        admissionDetails.style.display = "block";
        reviewButton.classList.add("active");


        // ================= Details Heading =================
        const detailsHeading = document.createElement("h3");
        detailsHeading.textContent = "Admission Details";
        admissionDetails.appendChild(detailsHeading);


        // ================= Complete Client Details =================
        const details = [
             ["Client ID", client.clientId || "-"],
            ["Client Name", client.name],
            ["Father Name", client.fatherName],
            ["Phone Number", client.phoneNumber],
            ["Email", client.email],
            ["CNIC", client.cnic],
            ["Date of Birth", client.dateOfBirth],
            ["Gender", client.gender],
            ["Blood Group", client.bloodGroup],
            ["Address", client.address],
            ["Emergency Contact Name", client.amergencyContactName],
            ["Emergency Contact Number", client.amergencyContactNumber],
            ["Medical Condition", client.medicalCondition],
            ["Package", isPersonal ? "Personal Training" : "Group Training"],
            ["Duration & Fee", selectedDuration || "-"],
            ["Payment Method", client.payment.paymentMethod],
            ["Reference Number", client.payment.referenceNumber || "-"],
            ["Payment Date", client.payment.paymentDate],
            ["Payment Time", client.payment.paymentTime],
            ["Payment Status", client.payment.status]
        ];

        details.forEach(function(item){

            const detail = document.createElement("p");
            detail.textContent = item[0] + " : " + (item[1] || "-");
            admissionDetails.appendChild(detail);
        });


        // ================= Action Buttons =================
        const actionButtons = document.createElement("div");
        actionButtons.className = "request-actions";

        const approveButton = document.createElement("button");
        approveButton.textContent = "Approve";
        approveButton.className = "approve-btn";

        const rejectButton = document.createElement("button");
        rejectButton.textContent = "Reject";
        rejectButton.className = "reject-btn";

        actionButtons.appendChild(approveButton);
        actionButtons.appendChild(rejectButton);

        admissionDetails.appendChild(actionButtons);


        // ================= Approve Admission =================
        approveButton.addEventListener("click", function(){

            client.status = "Approved";
            client.payment.status = "Verified";
            client.approvalDate = new Date().toLocaleDateString();

            localStorage.setItem("clients", JSON.stringify(clients));

            alert("Admission approved successfully.");

            window.location.reload();
        });


        // ================= Reject Admission =================
        rejectButton.addEventListener("click", function(){

            const confirmReject = confirm(
                "Are you sure you want to reject this admission?"
            );

            if(!confirmReject){
                return;
            }

            client.status = "Rejected";

            localStorage.setItem("clients", JSON.stringify(clients));

            alert("Admission rejected successfully.");

            window.location.reload();
        });

    });

});
















// ========================== Display Approved Client ===========================



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





// // ================= Reject Application Button =================
// const rejectApplicationButton = document.createElement("button");
// rejectApplicationButton.textContent = "Reject Application";
// rejectApplicationButton.className = "reject-application-btn";

// applicationDetailsColumn.appendChild(rejectApplicationButton);





// ================= Hire Trainer Button =================

const hireTrainerButton = document.createElement("button");
hireTrainerButton.textContent = "Hire Trainer";
hireTrainerButton.className = "hire-trainer-btn";

applicationDetailsColumn.appendChild(hireTrainerButton);


// ================= Hire Trainer Logic =================

hireTrainerButton.addEventListener("click", function() {

    if (
        application.interviewStatus !== "Scheduled" ||
        !application.interviewDate ||
        !application.interviewTime ||
        !application.meetLink
    ) {
        alert("Please schedule the interview first.");
        return;
    }

    const confirmHire = confirm(
        "Are you sure you want to hire this trainer?"
    );

    if (!confirmHire) {
        return;
    }

    const applicationIndex = pendingTrainerApplications.findIndex(
        function(record) {
            return record.applicationId === application.applicationId;
        }
    );

    if (applicationIndex === -1) {
        alert("Trainer application was not found.");
        return;
    }

    let trainers = JSON.parse(localStorage.getItem("trainers")) || [];

    // Check whether this application is already hired

    const existingTrainer = trainers.find(function(record) {
        return record.applicationId === application.applicationId;
    });

    if (existingTrainer) {
        alert("This trainer has already been hired.");
        return;
    }

    // Copy the complete application record

    const hiredTrainer = Object.assign(
        {},
        pendingTrainerApplications[applicationIndex]
    );

    // Generate a unique Trainer ID

    let trainerNumber = 1;
    let trainerId = "";

    do {
        trainerId = "TR" + String(trainerNumber).padStart(4, "0");
        trainerNumber++;
    } while (
        trainers.some(function(record) {
            return record.trainerId === trainerId;
        })
    );

    // hiredTrainer.trainerId = trainerId;
    // hiredTrainer.status = "Hired";
    // hiredTrainer.interviewStatus = "Completed";
    // hiredTrainer.hiredDate = new Date().toLocaleDateString();




       hiredTrainer.trainerId = trainerId;

       // Generate initial password for the newly hired trainer
    //    hiredTrainer.password = Math.random().toString(36).slice(2, 10);
    // hiredTrainer.password = "TR" + Math.random().toString(36).slice(2, 6);

    hiredTrainer.password = Math.random().toString(36).slice(2, 8);

       hiredTrainer.status = "Hired";
       hiredTrainer.interviewStatus = "Completed";
       hiredTrainer.hiredDate = new Date().toLocaleDateString();







    // Save the hired trainer

    trainers.push(hiredTrainer);

    localStorage.setItem(
        "trainers",
        JSON.stringify(trainers)
    );

    // Remove the application from pending records

    pendingTrainerApplications.splice(applicationIndex, 1);

    localStorage.setItem(
        "pendingTrainerApplications",
        JSON.stringify(pendingTrainerApplications)
    );

    // Remove the application from the dashboard

    row.remove();
    detailsRow.remove();

    alert(
        "Trainer hired successfully! Trainer ID: " + trainerId
    );

});


// ================= Reject Application Button =================

const rejectApplicationButton = document.createElement("button");
rejectApplicationButton.textContent = "Reject Application";
rejectApplicationButton.className = "reject-application-btn";

applicationDetailsColumn.appendChild(rejectApplicationButton);


// ================= Reject Application Logic =================

rejectApplicationButton.addEventListener("click", function() {

    const confirmReject = confirm(
        "Are you sure you want to reject this trainer application?"
    );

    if (!confirmReject) {
        return;
    }

    const applicationIndex = pendingTrainerApplications.findIndex(
        function(record) {
            return record.applicationId === application.applicationId;
        }
    );

    if (applicationIndex === -1) {
        alert("Trainer application was not found.");
        return;
    }

    let rejectedTrainerApplications =
        JSON.parse(localStorage.getItem("rejectedTrainerApplications")) || [];

    const rejectedApplication =
        pendingTrainerApplications[applicationIndex];

    rejectedApplication.status = "Rejected";

    rejectedTrainerApplications.push(rejectedApplication);

    localStorage.setItem(
        "rejectedTrainerApplications",
        JSON.stringify(rejectedTrainerApplications)
    );

    pendingTrainerApplications.splice(applicationIndex, 1);

    localStorage.setItem(
        "pendingTrainerApplications",
        JSON.stringify(pendingTrainerApplications)
    );

    row.remove();
    detailsRow.remove();

    alert("Trainer application rejected successfully.");

});




    });


    // Details cell mein details div
    detailsCell.appendChild(applicationDetails);

    detailsRow.appendChild(detailsCell);


    // Main application row
    trainerApplicationsList.appendChild(row);


    // Details row main row ke immediately neeche
    trainerApplicationsList.appendChild(detailsRow);

});
















// ================= Display Hired Trainers =================

const trainersList = document.getElementById("trainersList");

let trainers = JSON.parse(localStorage.getItem("trainers")) || [];

trainers.forEach(function(trainer) {

    // Sirf hired trainers display honge
    if (trainer.status !== "Hired") {
        return;
    }

    const trainerRow = document.createElement("tr");

    // ================= Trainer ID =================
    const trainerIdCell = document.createElement("td");
    trainerIdCell.textContent = trainer.trainerId || "-";
    trainerRow.appendChild(trainerIdCell);

    // ================= Trainer Name =================
    const trainerNameCell = document.createElement("td");
    trainerNameCell.textContent = trainer.fullName || "-";
    trainerRow.appendChild(trainerNameCell);

    // ================= Experience =================
    const experienceCell = document.createElement("td");
    experienceCell.textContent = trainer.experience || "-";
    trainerRow.appendChild(experienceCell);

    // ================= Specialization =================
    const specializationCell = document.createElement("td");
    specializationCell.textContent = trainer.specialization || "-";
    trainerRow.appendChild(specializationCell);

    // ================= Available Days =================
    const availableDaysCell = document.createElement("td");
    availableDaysCell.textContent = trainer.availableDays || "-";
    trainerRow.appendChild(availableDaysCell);

    // ================= Available Timings =================
    const timingsCell = document.createElement("td");
    timingsCell.textContent = trainer.workingTime || "-";
    trainerRow.appendChild(timingsCell);

    // ================= Assigned Clients =================
    const assignedClientsCell = document.createElement("td");

    const assignedClients = Array.isArray(trainer.assignedClients)
        ? trainer.assignedClients
        : [];

    assignedClientsCell.textContent = assignedClients.length;

    trainerRow.appendChild(assignedClientsCell);

    // ================= Action =================
    const actionCell = document.createElement("td");

    const reviewButton = document.createElement("button");
    reviewButton.textContent = "Review";
    reviewButton.className = "review-trainer-btn";

    actionCell.appendChild(reviewButton);
    trainerRow.appendChild(actionCell);

    // ================= Trainer Details Row =================
    const detailsRow = document.createElement("tr");

    const detailsCell = document.createElement("td");
    detailsCell.colSpan = 8;

    const trainerDetails = document.createElement("div");
    trainerDetails.className = "hired-trainer-details";
    trainerDetails.style.display = "none";

    detailsCell.appendChild(trainerDetails);
    detailsRow.appendChild(detailsCell);

    // ================= Review Trainer =================
    reviewButton.addEventListener("click", function() {

        if (trainerDetails.style.display === "block") {
            trainerDetails.style.display = "none";
            reviewButton.classList.remove("active");
            return;
        }

        // Doosre trainer ki open details band karna
        document.querySelectorAll(".hired-trainer-details").forEach(
            function(details) {
                details.style.display = "none";

                const otherButton = details.parentElement.parentElement
                    .previousElementSibling
                    .querySelector(".review-trainer-btn");

                if (otherButton) {
                    otherButton.classList.remove("active");
                }
            }
        );

        trainerDetails.textContent = "";
        trainerDetails.style.display = "block";
        reviewButton.classList.add("active");

        // ================= Details Heading =================
        const detailsHeading = document.createElement("h3");
        detailsHeading.textContent = "Trainer Details";
        trainerDetails.appendChild(detailsHeading);

        // ================= Complete Trainer Information =================
        const trainerInformation = [
            ["Trainer ID", trainer.trainerId],
            ["Full Name", trainer.fullName],
            ["Father Name", trainer.fatherName],
            ["CNIC", trainer.cnic],
            ["Gender", trainer.gender],
            ["Date of Birth", trainer.dateOfBirth],
            ["Phone Number", trainer.phoneNumber],
            ["Email", trainer.email],
            ["Address", trainer.address],
            ["Specialization", trainer.specialization],
            ["Experience", trainer.experience],
            ["Qualification / Certification", trainer.qualification],
            ["Previous Organization", trainer.previousOrganization],
            ["Professional Summary", trainer.professionalSummary],
            ["Available Days", trainer.availableDays],
            ["Preferred Working Time", trainer.workingTime],
            ["Application Date", trainer.applicationDate],
            ["Interview Date", trainer.interviewDate],
            ["Interview Time", trainer.interviewTime],
            ["Hired Date", trainer.hiredDate],
            ["Status", trainer.status]
        ];

        trainerInformation.forEach(function(item) {

            const detail = document.createElement("p");

            detail.textContent =
                item[0] + " : " + (item[1] || "-");

            trainerDetails.appendChild(detail);
        });
    });

    // Table mein main row aur details row add karna
    trainersList.appendChild(trainerRow);
    trainersList.appendChild(detailsRow);
});
