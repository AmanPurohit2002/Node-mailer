const cron=require('node-cron');
const sendEmail = require('../nodeMailer/nodemailer');

cron.schedule("0 0 * * *",()=>{
    console.log("Email Testing using cron");
    sendEmail();
})