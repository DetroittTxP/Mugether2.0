const nodemailer = require('nodemailer');

require('dotenv').config({path:'../.env'});



const transporter = nodemailer.createTransport({
     host:'smtp.gmail.com',
     service:'gmail',
     port:587,
     secure:false,
     auth:{
          user:process.env.EMAIL,
          pass:process.env.MAILPASS
     }
    })




const Reg_Guide_Mail = async (email)=>{
       const mailOptions= {
           from : process.env.EMAIL,
           to:email,
           subject:'guide registration',
           text:'ขอบคุณสำหรับ',
           html:`
                    <h2>ขอบคุณสำหรับการ สมัครไกด์ โปรดรอการติดต่อกลับจากทาง Mugether</h2>
                    <br/>
                    <br/>
                    <h2>ขอบคุณครับ</h2>
              `
       }
      transporter.sendMail(mailOptions,(err,info) => {
            if(err){
                 return {
                    stauts:'error',
                    err
                 }
            }
            else{
               return {
                     status:'success',
                     msg:'email was send'
               }
            }
       })
}


const Reg_User_mail=async(email)=>{
       const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:'ขอบคุณสำหรับการสมัครสมาชิก Mugether',
            html:`
                <h1>Thank you for your registration with Mugether</h1>
                <br/> 
                <h3>ขอให้สนุกกับการมูของคุณ</h3>
                <br/>  <br/> 
                <h3>ขอบคุณครับ</h3>
             `
       }

       transporter.sendMail(mailOptions,(err,info) => {
          if(err){
               return {
                  stauts:'error',
                  err
               }
          }
          else{
             return {
                   status:'success',
                   msg:'email was send'
             }
          }
       })
}



module.exports = {
     Reg_Guide_Mail,
     Reg_User_mail
};