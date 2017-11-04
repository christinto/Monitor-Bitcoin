const nodemailer = require('nodemailer')
const pug = require('pug')

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
})

let compile = pug.compileFile('./view.pug')

function sendEmail(to, subject, data) {
    let html = compile(data)
    let options = {
        from: process.env.USER_EMAIL,
        to: to,
        subject: subject,
        html: html
    }
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
}

module.exports = sendEmail