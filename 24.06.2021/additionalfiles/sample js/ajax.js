function getcontent()
{
    //instance of the HTTP request object 
    var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET","Ajax.html",false);

        xmlHttp.send(null);

        //responseText

    var element = document.getElementById("content");    
    
}
