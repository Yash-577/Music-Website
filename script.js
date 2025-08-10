document.querySelectorAll(".btn").forEach (button=>{
    button.addEventListener("click", () => {
       ("button clicked")
    });
    });

   
    const togglebutton = document.getElementById("toggle");
    const body= document.body;

    togglebutton.addEventListener("click" ,() => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains(dark-mode)) {
         togglebutton.textContent='Light-Mode';
      } else{
         togglebutton.textContent='Dark-Mode';
      }
    });
    const searchInput= document.querySelector(".search input");
    const cards = document.querySelectorAll(".card");

    searchInput.addEventListener('input', () =>{
      const filter= searchInput.value.toLowerCase();
   

    

      cards.forEach(card => {
         const artistName = card.querySelector('h3').textContent.toLowerCase();
         if(artistName.includes(filter)){
            card.style.display='';
         }else{
            card.style.display='none';
         }
      })
    })
function data() {
    let a= document.getElementById("username").value;
    let b= document.getElementById("password").value;
    let c= document.getElementById("confirmpassword").value;

    if (a==""||b==""||c=="")
    {
      alert("All fields are mandatory")
      return false;

    }else if(b!=c)
    {
      alert("Enter same password")
     return false;
    }else {
      return true;
    }
   }

const buttons= document.querySelectorAll(".btn");
buttons.forEach (button =>{
   button.addEventListener("click", async() =>{
   
     try{

      const response= await fetch('https://itunes.apple.com/search?term=jack+johnson')
      console.log(response);
      const data = await response.json()
      console.log(data);
      
   } catch (error) {
      console.log("E:", error);
   }
   
});
});


