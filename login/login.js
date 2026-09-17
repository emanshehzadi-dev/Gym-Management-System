let users = JSON.parse(localStorage.getItem("users")) || [];
localStorage.setItem("users", JSON.stringify(users));

if(users.length === 0){
   users.push(
      {
      email: "trainer@gmail.com",
      password: "trainer123",
      role: "trainer"
      },

      {
         email: "client@gmail.com",
         password: "client123",
         role: "client"
      }
   );
   localStorage.setItem("users", JSON.stringify(users));
}


const loginForm = document.querySelector(".login-form");
console.log(loginForm);



    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginMessage = document.getElementById("login-message");

    emailInput.disable = true;
    passwordInput.disable = true;

    const togglePassword = document.getElementById("toggle-password");
    const forgotPassword = document.getElementById("forgot-password");
    const loginButton = document.getElementById("login-button");

    const roleButtons = document.querySelectorAll(".role-btn")
    roleButtons.forEach(function(button){
      button.addEventListener("click", function(){
         const selectedRole = button.textContent.trim().toLowerCase();

         localStorage.setItem("selectedRole", selectedRole);

         roleButtons.forEach(function(btn){
            btn.classList.remove("active");
         });
         button.classList.add("active");

         emailInput.disabled = false;
         passwordInput.disabled = false;
         loginButton.disabled = false;

          console.log("Selected Role:", selectedRole);
      });
    });

    forgotPassword.addEventListener("click", function(event){
      event.preventDefault();
      const email = prompt("Enter your rejistered email:");

      if(email === null){
      return;
      }

      if(email.trim() === ""){
         alert("Email are required!");
      }

      else if(email.trim() !== "admin@gmail.com"){
         alert("Email not found!");
      }

      else{
         const resetToken = Math.floor(100000 + Math.random() * 900000);

         localStorage.setItem("resetToken", resetToken);
         localStorage.setItem("resetEmail", email.trim());
         alert("Your reset token is: " + resetToken);

         const enteredToken = prompt("Enter your reset token:");
         if(enteredToken === null){
            return;
         }

         if(enteredToken !== localStorage.getItem("resetToken")){
            alert("Invalid reset token!");
            return;
         }

         const newPassword = prompt("Enter your new password:")

         if(newPassword === null){
            return;
         }

         if(newPassword.trim() === ""){
            alert("Password is required!")
            return;
         }

         localStorage.setItem("adminPassword", newPassword.trim());

         localStorage.removeItem("resetToken");
         localStorage.removeItem("resetEmail");
         
         alert("Password reset successfully!");

      }

    });


    
    togglePassword.addEventListener("click", function(){
      if(passwordInput.type === "password"){
         passwordInput.type = "text";
      }

      else{
         passwordInput.type = "password"
      }
   });


     loginForm.addEventListener("submit", function(event){
     event.preventDefault();

    console.log("Login form submitTed!")

   




    console.log(emailInput.value);
     console.log(passwordInput.value);
     console.log(loginMessage);

     const correctEmail = "admin@gmail.com";
     const correctPassword = localStorage.getItem("adminPassword");
     const selectedRole = localStorage.getItem("selectedRole");




     if(emailInput.value === "" && passwordInput.value === ""){
      loginMessage.textContent = "Email or Password are required!";

      setTimeout(function(){
         loginMessage.textContent = "";
      }, 2000);
     }
      
     else if(emailInput.value === ""){
      loginMessage.textContent = "Email are required!";

      setTimeout(function(){
         loginMessage.textContent = "";
      }, 2000);
     }

     else if(passwordInput.value === ""){
      loginMessage.textContent = "Password are required!";
      
      setTimeout(function(){
         loginMessage.textContent = "";
      }, 2000);
   }

       //else if(selectedRole === null){
         // loginMessage.textContent = "Please select your Role!";

         // setTimeout(function(){
            // loginMessage.textContent = "";
        // }, 2000);
        //}

     else if (selectedRole === "admin" && 
      emailInput.value === correctEmail && 
      passwordInput.value === correctPassword){

         
        console.log("Login Successfully");
        loginMessage.textContent = "Login Successfully!";

        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("selectedRole", "admin");
   

        setTimeout(function(){
         loginMessage.textContent = "";
         window.location.replace("../admin-dashboard/admin-dashboard.html");
        }, 2000);
     }



else if(selectedRole !== "admin"){

   const user = users.find(function(user){
      return user.email === emailInput.value &&
      user.password === passwordInput.value &&
      user.role === selectedRole;
   });


   if(user){
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("selectedRole", selectedRole);

      console.log("Login Successful!");
      loginMessage.textContent = "Login Successful!";
      setTimeout(function(){
          loginMessage.textContent = "";
      
         if(selectedRole === "trainer"){
         window.location.replace("../trainer-dashboard/trainer-dashboard.html");
         }

         else if(selectedRole === "client"){
            window.location.replace("../client-dashboard/client-dashboard.html")
         }

      }, 2000);
   }


   else{
      console.log("Invalid email or password!");
      loginMessage.textContent = "Invalid email or password!";
      setTimeout(function(){
         loginMessage.textContent = "";
      }, 2000);
   }

}

     else{
        console.log("Invalid Email or Password");
        loginMessage.textContent = "Invalid Email or Password!";

        setTimeout(function(){
         loginMessage.textContent = "";
        }, 2000);
     }
});
