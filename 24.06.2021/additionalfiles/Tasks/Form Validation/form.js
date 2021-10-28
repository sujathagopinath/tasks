var fname = document.forms['vform']['FirstName'];

var company = document.forms['vform']['company'];
var email = document.forms['vform']['email'];
var number = document.forms['vform']['phno'];

var nameerror = document.getElementById("nameerror");

var comerror = document.getElementById("comerror");
var emailerror = document.getElementById("emailerror");
var numbererror = document.getElementById("numbererror");


function popup() {

    if (fname.value == "") {
        fname.style.border = "1px solid red";
        nameerror.textContent = "Username is required";
        nameerror.style.color = "red";
        fname.focus();
        return false;
    }

    if (company.value == "") {
        company.style.border = "1px solid red";
        comerror.textContent = "Company is required";
        comerror.style.color = "red";
        company.focus();
        return false;
    }
    if (email.value == "") {
        email.style.border = "1px solid red";
        emailerror.textContent = "EmailId is required";
        emailerror.style.color = "red";
        email.focus();
        return false;
    }
    if (number.value == "") {
        number.style.border = "1px solid red";
        numbererror.textContent = "Phone Number is required";
        numbererror.style.color = "red";
        number.focus();
        return false;
    }
}

