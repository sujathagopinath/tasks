function connection() {
    var connecting = 'trying'
    connecting += '.';
    postMessage(connecting);
    setTimeout("connection()", 10);
}

connection();