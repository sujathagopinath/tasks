const cacheName ="v1";

const cacheAssets = [
    'cache.html',
    'about.html',
    'cache.css',
    'cache.js'
];

//call install event

/*self.addEventListener("install",(e) =>{
    console.log("service Worker: Installed");
*/

//using the install event, waituntil,and skipwaiting method...

self.addEventListener("install",(e) =>{
    console.log("service Worker: Installed");
    e.waitUntil(
        caches            //caches storage API
        .open(cacheName)   
        .then(cache => {      //cache Object
            console.log("service Workers : caching files");
            cache.addAll(cacheAssets);   //addAll is inbuilt method

        })
        .then(()=> self.skipWaiting())
    );
});

//Call activate event
//self.addEventListener("activate",(e) =>{
  //  console.log("service Worker: Activated");
//});

//Call activate event
self.addEventListener("activate", (e) =>{
    console.log("service Worker: Activated");

    //remove unwanted caches

    e.waitUntil(
        caches.keys().then(cacheName =>{    //looping over the properties of the object manually
            return Promise.all(
                cacheName.map(cache =>{     //creates a new array with result calling a func of every element(higher order func) 
                  if(cache!== cacheName){
                      console.log("service worker: clearing old cache");
                      return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//call fetch event

self.addEventListener("fetch",(e)=>{
    console.log("service worker: Fetching");
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
})