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

       const mailOptionsTOadmin = {
          from : process.env.EMAIL,
          to:['peerawutkeawnoi@gmail.com','pondkab582@gmail.com','bankkich@gmail.com','julanoppza@gmail.com'],
          subject:'มีคนสมัครไกด์ไปเเอดให้เขาด้วย',
          html:`
          <h2>${email}</h2>
          <br/>
          <br/>
          <h2>ขอบคุณครับ</h2>
          `
       }

       transporter.sendMail(mailOptionsTOadmin,(err,info) => {
          if(err){
            return {
               status:'some error',
               err
            }
          }
          else{
             return {
                 status:'some one register',
                 msg:'confirmhis mail'
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


const Reset_Pass_Email= async(email,token) => {
   const mailOptions = {
      from:process.env.EMAIL,
      to:email,
      subject:'Mugther resetpassword',
      html:`
          <h1>input token in form</h1>
          <h4>Token : ${token}</h4>
       `
 }

      transporter.sendMail(mailOptions,(err,info) => {

         if(err){ 
            return err;
         }
         else{
            console.log('ok');
            return
         }
      })
}



module.exports = {
     Reg_Guide_Mail,
     Reg_User_mail,
     Reset_Pass_Email
};