const nodemailer = require('nodemailer');
require('dotenv').config()
// Create a transporter using SMTP or other transport options
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'yahoo', etc.
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
});

const sendPurchaseEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


const sendRevenueEmail = (to, subject, text) => {
    const mailOptions = {
        from: `Bookstore App <${process.env.USER_EMAIL}>`,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { sendPurchaseEmail,sendRevenueEmail };
