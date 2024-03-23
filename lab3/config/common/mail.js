var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "khaindpd08774@fpt.edu.vn",
        pass: "123456",
    },
});

module.exports = transporter;