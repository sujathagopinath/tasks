const signIn = document.querySelector("#signInButton");
const signUp = document.querySelector("#signUpButton");
const signInForm = document.querySelector(".container .sign-in-form");
const signUpForm = document.querySelector(".container .sign-up-form");
const overlay_container = document.querySelector(".container .overlay-container");
const overlay = document.querySelector(".container .overlay-container .overlay");


signIn.addEventListener("click", () => {
  overlay_container.style.transform = "translateX(100%)";
  overlay.style.transform = "translateX(-50%)";
  signInForm.classList.add("active");
  signUpForm.classList.remove("active");
});
signUp.addEventListener("click", () => {
  overlay_container.style.transform = "translateX(0)";
  overlay.style.transform = "translateX(0)";
  signUpForm.classList.add("active");
  signInForm.classList.remove("active");
});

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function validation(){
    var form = document.getElementById("form");
    var email = document.getElementById("validationCustom04").value;
    // var text = document.getElementById("text");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(email.match(pattern)){
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = " ";
        text.style.color = "lightcoral";
    }
    else{
        form.classList.remove("valid");
        form.classList.add("invalid");
        form.style.border="1px solid red";
        text.style.color = "lightcoral";

    }
    if(email=""){
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    }
}


// var password = document.getElementById('validationCustom05').value;

// var confirmpassword = document.getElementById('validationCustom06').value;

// function validatepassword(){
//   if(password.value!= confirmpassword.value){
//     confirmpassword.setCustomValidity("Password does not match");
//   }
//   else{
//     confirmpassword.setCustomValidity("");     
//   }
// }

// password.onchange = validatepassword;

// confirmpassword.onkeyup = validatepassword;


