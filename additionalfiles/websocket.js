function sendmessage() {
    var message = document.getElementById("type").value;

    var html = '<div class ="message-box">' +
        '<div class="my-message">' + message + '</div>' +
        '<div class="separator"></div>' +
        '</div>';

    document.getElementById("message").innerHTML += html;

    document.getElementById("type").value = "";

}