const nodemailer = require('nodemailer')

var transporter =  nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"testuserdata178@gmail.com",
        pass:"testuserdatapassword"
    }
})

var options = {
    from:'testuserdata178@gmail.com',
    to:'sujathagopinath1999@gmail.com',
    subject:'test',
    text:'Hello',
}

transporter.sendMail(options,function(error,info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: '+ info.response);
})