const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/Reservation.jsx', (req, res) => {
  const { fullName, phoneNumber, email, persons, date } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'eneserendp@gmail.com',
    subject: 'Reservation Request',
    text: `
      Full Name: ${fullName}
      Phone Number: ${phoneNumber}
      Email: ${email}
      Number of Persons: ${persons}
      Reservation Date: ${date}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 3000; // 3000 portunda çalıştır
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
