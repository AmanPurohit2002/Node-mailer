const nodemailer = require('nodemailer');
const User = require('../models/User');

const sendEmail = async () => {
    try {
        // Fetch all users from the database
        const users = await User.find({});

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER_EMAIL,
                pass: process.env.GMAIL_USER_PASSWORD,
            }
        });

        // Iterate through each user and send an email
        for (const user of users) {
            const mailOptions = {
                from: process.env.GMAIL_USER_EMAIL,
                to: user.email,
                subject: "Hello from Aman Purohit",
                text: `Hello ${user.username},\nThis is a test email sent using Nodemailer.`,
            };

            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${user.email}: ${info.response}`);
        }

    } catch (error) {
        console.error("Error sending emails:", error);
    }
};

module.exports = sendEmail;
