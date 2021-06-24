var c =  function() {
        var lat = pos.coords.latitude,
           long = pos.coords.longitude,
           coords = lat + ', ' +long;
           document.getElementById('google_map').setAttribute('src','https://maps.google.co.uk/?q=' + coords +',0&z=60&output=embed');

        
    }


    document.getElementById('get_location').onclick = function(){
       navigator.geolocation.getCurrentPosition(c);
       return false; 
    }