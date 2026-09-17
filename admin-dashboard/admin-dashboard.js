if(localStorage.getItem("adminLoggedIn") !== "true"){
    window.location.replace("../login/login.html");
}

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("selectedRole");
    window.location.replace("../login/login.html");
});