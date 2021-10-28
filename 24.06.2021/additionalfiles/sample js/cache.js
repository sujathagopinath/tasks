// ensure Sw are supported
/*
if("serviceWorker" in navigator){
    console.log("service  worker supported");
}
*/

if("serviceWorker" in navigator){                     //navigator provides information about the information in web browsers.
    window.addEventListener("load",()=>{              // load is a event
        navigator.serviceWorker
        .register("cachesite.js")                    //register inbuild function which holds the script url externally
        //.register("cachepages.js")
        .then(reg => console.log('service worker:Registered'))  //.then(value) =>syntax reg is  declared as value does not read... 
        .catch(err => console.log(`service worker:Error: ${err}`));
    })
}
