const express = require('express');
const passport = require('passport');
const dbUser = require('../models/User');
const session = require('express-session');
const LocalStrategy  = require('passport-local').Strategy;
const loginStategy = new LocalStrategy(
  {
    usernameField: 'login',
    passwordField: 'password',
  },
  async function (login, password, done) {
    const user = await dbUser.findOne({ login });

    if (user) {
      return done(null, {
        user,
      });
    }

    return done(null, false, { 
      message: 'Неверный логин или пароль' 
    });
  }
);

passport.use('auth-strategy', loginStategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

class BaseRouter {
  middleware(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  constructor (app) {
      app.use(session({
        secret: 'secrettexthere',
        saveUninitialized: true,
        resave: true,
      }));
      app.use(passport.initialize());
      app.use(passport.session());
      app.use(express.json());
      const arrayOfRoutes = this.routes();

      arrayOfRoutes.forEach((route) => {
          const {method, url, controller, controllerMethod, allow} = route;
          
          if (allow) {
            app[method](url, this.middleware, (request, response) => {
                this.runMethodOfController(controller, controllerMethod, request, response);
            });
          } else if (url === '/login' && method === 'post') {
            app[method](url, passport.authenticate('auth-strategy', {
              successRedirect: '/user-profile',
              failureRedirect: '/',
            }));
          } else {
            app[method](url, (request, response) => {
              this.runMethodOfController(controller, controllerMethod, request, response);
            });
          }
      });
  }

  runMethodOfController (controller, controllerMethod, request, response) {
      const arrayOfControllers = this.controllers();

      if (arrayOfControllers[controller]) {
          const controllerObject = new arrayOfControllers[controller](request, response);

          if (controllerObject[controllerMethod]) {
              controllerObject[controllerMethod](request.body, request.params);
          }
      }

  }
}

module.exports = BaseRouter;