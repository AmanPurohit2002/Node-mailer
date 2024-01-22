const cron=require('node-cron');
const sendEmail = require('../nodeMailer/nodemailer');

cron.schedule("* * * * *",()=>{
    console.log("Email Testing using cron");
    sendEmail();
})