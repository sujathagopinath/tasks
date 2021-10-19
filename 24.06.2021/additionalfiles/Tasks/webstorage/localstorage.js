let txtuser = document.querySelector(".txtuser");
let txtpass = document.querySelector(".txtpass");
let submit = document.querySelector(".btn");

if (window.localStorage) {
    //     console.log("suppported");
    // }
    // else {
    //     console.log("not supported");
    // }

    localStorage.setItem("user", "suja");
    localStorage.setItem("password", "1234");

    let user = localStorage.getItem("user");
    let pass = localStorage.getItem("password");
    let message = document.querySelector(".message");

    submit.addEventListener('click', () => {
        if (user == txtuser.value && pass == txtpass.value) {
            message.innerHTML = "logged in successfully";
        }
        else {
            message.innerHTML = "username is invalid";
        }
    })

}
else {
    console.log("Not supported");
}