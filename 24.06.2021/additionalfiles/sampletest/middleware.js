const router = require("./routes/orders");


router.use('/',(req,res,next)=>{
    req.headers["content-type"]='application/json';
    console.log("API call received");
    next();
});

router.get('/',(req,res,next)=>{
    res.send("headers received"+req.headers["content-type"]);
    res.send("Get request for users");
    next();
})

router.use('/',(req,res)=>{
    console.log("API call ended");
})