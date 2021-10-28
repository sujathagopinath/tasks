function changecolor(element, color) {
    element.style.backgroundColor = color;
}

const box = document.getElementById('box');
try {
    changecolor(box, "blue");
} catch (e) {
    // console.log(e);
    alert("something went wrong")

} finally {
    console.log(20);
}



