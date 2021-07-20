const fetch = require("node-fetch");


async function asyncfn() {
    try {
        const url = 'https://jsonplaceholder.typicode.com/posts/';
        const posts = await fetch(url);
        if (posts.ok === false) {
            throw "Page not found"
        }

        const parsedData = await posts.json();
        console.log(parsedData);
    }
    catch (err) {
        console.log(err);
        console.log("Page 404 error");
    }
}
asyncfn()