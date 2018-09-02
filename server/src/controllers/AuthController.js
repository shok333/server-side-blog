const BaseController = require('../libs/BaseController');
const dbUser = require('../models/User');
const passport       = require('passport');

class AuthController extends BaseController {
  getLogin () {
      this.serverRenderingResponse();
  }

  async postLogin ({login, password}) {
    this.jsonResponse({cms: '2222'});
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

  getUserProfile () {
    this.jsonResponse({cms: '123'});
  }
}

module.exports = AuthController;