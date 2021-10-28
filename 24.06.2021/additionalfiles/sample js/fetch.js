/*fetch('demo.json')
.then(res => res.json())
.then(json => console.log(json));
*/

/*fetch("demo.json")
.then(res => {
    console.log(res);
    return res.json();
})
.then(json => console.log(json));
*/

/*fetch('https://unsplash.it/600/400')
.then(res => res.blob())
.then(blob => {
    let img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    document.querySelector('body').appendChild(img);

})*/

//fetch Post

const postsection = document.querySelector("#post");
const postTemplate = document.querySelector("#posttemplate");
getData()
    .catch(err => console.error(err));

async function getData(){
    const postStream = await fetch("https://jsonplaceholder.typicode.com/posts");
     const posts = await postStream.json();
     let i=0;

     throw 'Get Data Error'; 
     


     //console.log(posts);

     posts.forEach(post => {
         i++;
         if(i<10){
             const title = post.title;
             const body = post.body;
              
             fetch("https://unsplash.it/300/200")
             .then(res => res.blob())
             .then(blob => {
                const newpost = document.importNode(postTemplate.textContent,true);
                const postTitle = newpost.querySelector(".posttitle");
                const postBody = newpost.querySelector(".postbody");
                
                const postImg = newpost.querySelector(".postimg");
                
                throw 'Image Fetch error';

                postImg.src = URL.createObjectURL(blob);


                postTitle.innerText = title;
                postBody.innerText = body; 
                postsection.appendChild(newpost);

            })
            .catch(err => console.error(err));

             

        }
    })
}

// save the post

/*const newpost ={
    title : "New post title",
    body : "Post paragraph",
    userId: 1
}

const createNewPost = post =>{
    const options ={
        method : "POST",
        body: JSON.stringify(post),
        headers: new Headers({
            'content-Type' : 'application/json'
        })
    }
    return fetch("https://jsonplaceholder.typicode.com/posts",options)
        .then(res => res.json())
        .then(posts => console.log(posts))
        .catch(err => console.error(err));
}

createNewPost(newpost);*/