//------------------ buttons logic------------------

//---Section-2 buttons selections---

const tabButton = document.querySelectorAll('.tab-btn');

tabButton.forEach((button)=>{
    button.addEventListener("click", () => {
        tabButton.forEach((btn)=>{
            btn.classList.remove("active");
        });
        button.classList.add("active");
    });
});



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