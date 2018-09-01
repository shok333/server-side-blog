const BaseController = require('../libs/BaseController');
const dbUser = require('../models/User');
var passport       = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

class AuthController extends BaseController {
    getLogin () {
        this.serverRenderingResponse();
    }

    async postLogin ({login, password}) {
        const users = await dbUser.getAll();
        passport.use(new LocalStrategy(
            function(username, password, done) {
                findUser(username, function (err, user) {
                    if (err) {
                        return done(err)
                    }
                    if (!user) {
                        return done(null, false)
                    }
                    if (password !== user.password ) {
                        return done(null, false)
                    }
                    return done(null, user)
                })
            }
        ))
        this.jsonResponse(users);
    }

    getRegistration () {
        this.serverRenderingResponse();
    }

    async postRegistration ({login, password, email}) {
        const message = await dbUser.create({
            login,
            email,
            password,
        });

        console.log(message);
    }

    async postRegistrationConfirm (body, {code}) {
        this.jsonResponse({
            profileHasConfirmed: await dbUser.emailConfirm(code)
        });
    }
}

module.exports = AuthController;