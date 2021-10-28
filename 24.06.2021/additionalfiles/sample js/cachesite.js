const cacheName ="v2";


//call install event

/*self.addEventListener("install",(e) =>{
    console.log("service Worker: Installed");
*/

//using the install event, waituntil,and skipwaiting method...

self.addEventListener("install",(e) =>{
    console.log("service Worker: Installed");
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

self.addEventListener("fetch",e => {
    console.log("services worker: Fetching");
    e.respondWith(
        fetch(e.request)
        .then(res => {
            //make copy of response

            const resClone =res.clone();
            //open cache
            caches
            .open(cacheName)
            .then(cache =>{
                //add response to cache
                cache.put(e.request,resClone);
            });
            return res;
        }).catch(err => caches.match(e.request).then(res => res))

    );
});























