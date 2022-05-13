
const nodemailer = require("nodemailer");


const mail=async(req,res)=>{
   

    const{correo,adjunto}=req.body;
    console.log({correo,adjunto})

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.distprolab.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "christian.solano@distprolab.com", // generated ethereal user
        pass: "12345678", // generated ethereal password
      },
    });



    let mailOptions ={
        from:"christian.solano@distprolab.com", // sender address
        to:  `${correo}`, // list of receivers
        subject: "Envio de examenes", // Subject line
        text: "buenos dias estimado/a a recibido los examenes que se a realizo", // plain text body
        html: `<a href="${adjunto}"><i class='bx bxs-file-pdf'>Da clic en este enclace</i></a>`, // html body
      };

    await transporter.sendMail(mailOptions,(error, info)=>{
if (error) {
    res.status(500).json({msg: error.message})
}else{
    res.status(200).json({ok:true, msg:'Correo enviado con exito'})
}

        
    })
}

module.exports={mail}