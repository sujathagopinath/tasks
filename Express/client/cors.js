fetch("https://localhost:3001/data")
    .then(res => res.json())
    .then(data => console.log(data))