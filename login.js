// ----------------login-----------------------

const getUsername = document.getElementById("username");
const getPassword = document.getElementById("password");

const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", (e)=>{
    
    e.preventDefault();
    if(getUsername.value === "admin" && getPassword.value === "admin123")
    {
        alert("logged In in Progress !!!");
        window.location.href = "main_page.html"
        

    }
    else
       {
        alert("invalid");
       } 
})