let parameters = {
    count: false,
    letters: false,
    numbers: false,
    special: false
}
let strengthBar = document.getElementById("strength-bar");
let msg = document.getElementById("msg");

function strengthChecker() {
    let password = document.getElementById("password").value;

    parameters.letters = (/[A-Za-z]+/.test(password)) ? true : false;
    parameters.numbers = (/[0-9]+/.test(password)) ? true : false;
    parameters.special = (/[!\"$%&/()=?@~`\\.\';:+=^*_-]+/.test(password)) ? true : false;
    parameters.count = (password.length > 7) ? true : false;

    let barLength = Object.values(parameters).filter(value => value);

    console.log(Object.values(parameters), barLength);

    strengthBar.innerHTML = "";
    for (let i in barLength) {
        let span = document.createElement("span");
        span.classList.add("strength");
        strengthBar.appendChild(span);
    }

    let spanRef = document.getElementsByClassName("strength");
    for (let i = 0; i < spanRef.length; i++) {
        switch (spanRef.length - 1) {
            case 0:
                spanRef[i].style.background = "#ff3e36";
                msg.textContent = "Your password is very weak";
                break;
            case 1:
                spanRef[i].style.background = "#ff691f";
                msg.textContent = "Your password is weak";
                break;
            case 2:
                spanRef[i].style.background = "#ffda36";
                msg.textContent = "Your password is good";
                break;
            case 3:
                spanRef[i].style.background = "#0be881";
                msg.textContent = "Your password is strong";
                break;
        }
    }
}


function toggle() {
    let password = document.getElementById("password");
    let eye = document.getElementById("toggle");

    if (password.getAttribute("type") == "password") {
        password.setAttribute("type", "text");
        eye.style.color = "#0be881";
    }
    else {
        password.setAttribute("type", "password");
        eye.style.color = "#808080";
    }
}



function validation() {
    var form = document.getElementById("form");
    var email = document.getElementById("email").value;
    var text = document.getElementById("text");
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email.match(pattern)) {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "Your Email Address is Valid.";
        text.style.color = "lightcoral";
    }
    else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "Please Enter Valid Email Address.";
        text.style.color = "lightcoral";

    }
    if (email = "") {
        form.classList.remove("valid");
        form.classList.remove("invalid");
        text.innerHTML = "";
        text.style.color = "#00ff00";
    }
}

// function popup(){
//         swal("Good job!", "You have Successfully Logged in!!", "success");
//     }


var username = document.forms["vform"]["username"];
var mailid = document.forms["vform"]["email"];
var password = document.forms["vform"]["password"];

var nameerror = document.getElementById("nameerror");
var emailerror = document.getElementById("emailerror");
var passerror = document.getElementById("passerror");
function popup() {

    if (username.value == "") {
        username.style.border = "1px solid red";
        nameerror.textContent = "Username is required";
        nameerror.style.color = "red";
        username.focus();
        return false;
    }
    if (email.value == "") {
        email.style.border = "1px solid red";
        emailerror.textContent = "EmailId is required";
        emailerror.style.color = "red";
        email.focus();
        return false;
    }
    if (password.value == "") {
        password.style.border = "1px solid red";
        passerror.textContent = "Password is required";
        passerror.style.color = "red";
        password.focus();
        return false;
    }
}

