const express = require("express");
const router = express.Router();
const app =express();

router.use('/',(req,res)=>{
    res.send("Get orders");
});

app.use('/orders/:id',(req,res)=> {
    res.send("Get request for specific order"+req.params.id);
});

router.get('/search/:key([0-9]{4})',(req,res)=>{
    res.send("data captured is "+req.params.key);
});


/*app.get('/:PATH', (req, res) => {
        const { q } = req.query;
         const { PATH } = req.params;
         res.send(` your are you asking for ${PATH} query ah edhooo ${q}`);
     })
*/

app.get('/search-order/:key([a-z A-z]{4})',(req,res)=>{
    res.send("Data is captured is"+req.params.key);
})

//CRUD operations
router.post('/create',(req,res)=>{
    res.send("List of users");
})

router.put('/update',(req,res)=>{
    res.send("List of users");
})

router.get('/d ',(req,res)=>{
    res.send("List of users");
})

module.exports = router;