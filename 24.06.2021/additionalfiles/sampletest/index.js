var express = require('express');

//importing the express js module into our application

var app = express();

var orders =  require('./routes/orders');

app.use('/orders',orders); 
//we are initliasing the app using express

//using the app we are configuring the route of GET and path is '/'

//app.get("/getusers",(req,res) =>{
  //  res.send("hello world");
//})

app.get("/read-users",(req,res) =>{
    res.send("list of users");
});

/*app.get("/getuser",(req,res)=>{         //JSON format
    const userobj = {
        id: 10,
        Name: 'sss',
        active: true
    }
    res.send(userobj);
})*/

//CRUD users

app.post('/create',(req,res)=>{
    res.send("List of users");
})

app.put('/update',(req,res)=>{
    res.send("List of users");
})

app.delete('/delete',(req,res)=>{
    res.send("List of users");
})


//we are starting the app at port 
//node -> http.createServer
app.listen(4000);



