const btn = document.querySelector('input');
const display = document.querySelector('.textarea');

btn.addEventListener('click', DateTime)
function DateTime() {
    let dateAndTime = new Date();
    dateAndTime = dateAndTime.toUTCString();
    document.getElementById("value").innerHTML = dateAndTime;
}

display.addEventListener('focus', () => {
    display.style.backgroundColor = "rgb(223, 145, 223)";
})

display.addEventListener('focusout', () => {
    display.style.backgroundColor = "white";
})