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