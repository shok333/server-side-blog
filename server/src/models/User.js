const DBModel = require('./DBModel');
const mail = require('../models/Mail');
const uuid = require('uuid/v1')
const {SHA256} = require("sha2");

class User extends DBModel {
    constructor (props) {
        super(props);

        this.schema = {
            login: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                validate: {
                    validator: (email) => {
                        return mail.emailValidation(email);
                    },
                    message: 'email do not valid',
                },
                required: true,
            },
            status: {
                type: String,
                required: true,
            },
            emailConfirmCode: String,
        };

        this.passwordSalf = 'salf';
        this.dbName = 'users';
        this.createModelWithSchema(this.dbName, this.schema);
    }

    async create (userObject) {
        const {password, email} = userObject;
        const emailConfirmCode = uuid();
        const oldUser = await this.findOne({
            email,
        });

        if (!oldUser) {
            await this.add({
                ...userObject,
                password: SHA256(this.passwordSalf + password),
                emailConfirmCode,
                status: 'user',
            });
            await mail.sendVerificationMessage(email, emailConfirmCode);

            return 'user has created';
        }

        return 'user has created early';
    }

    async emailConfirm (emailConfirmCode) {
        await this.findOneAndUpdate({emailConfirmCode}, { $set: { emailConfirmCode: null }});
        return !await this.findOne({emailConfirmCode});
    }
}

module.exports = new User();