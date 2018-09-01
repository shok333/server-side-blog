const nodeMailer = require('nodemailer');

class Mail {
    constructor () {
        this.email = 'cms@supertop10.ru';
        this.domain = 'http://localhost:3000';

        this.transporter = nodeMailer.createTransport({
            host: 'cpanel3.d.fozzy.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: this.email, // generated ethereal user
                pass: 'Shokdimon333' // generated ethereal password
            }
        });
    }

    emailValidation(email) {
        // First check if any value was actually set
        if (email.length === 0) return false;
        // Now validate the email format using Regex
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(email);
    }

    sendVerificationMessage (email, verificationCode) {
        let mailOptions = {
            from: `"Блог Димона" <${this.email}>`, // sender address
            to: email, // list of receivers
            subject: 'Подтверждение регистрации', // Subject line
            text: `Для подтверждения регистрации перейдите по данной ссылке: ${this.domain}/verification-complete/${verificationCode}}`, // plain text body
            html: `<div>Для подтверждения регистрации перейдите по данной ссылке: <a href="${this.domain}/verification-complete/${verificationCode}">ссылка</a> </div>` // html body
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodeMailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    }
}

module.exports = new Mail();