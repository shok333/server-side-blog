const BaseRouter = require('./libs/BaseRouter');
const PublicController = require('./controllers/PublicController');
const AuthController = require('./controllers/AuthController');

class Router extends BaseRouter {
    routes () {
        return [
            {method: 'get', url: '/payload/posts', controller: 'PublicController', controllerMethod: 'getPostsPayload'},
            {method: 'get', url: '/create-post', controller: 'PublicController', controllerMethod: 'getCreatePost'},
            {method: 'get', url: '/main.js', controller: 'PublicController', controllerMethod: 'getMainJS'},
            {method: 'get', url: '/get-index-state', controller: 'PublicController', controllerMethod: 'getInitialState'},
            {method: 'get', url: '/main.css', controller: 'PublicController', controllerMethod: 'getMainCSS'},
            {method: 'get', url: '/login', controller: 'AuthController', controllerMethod: 'getLogin'},
            {method: 'get', url: '/', controller: 'PublicController', controllerMethod: 'getIndex'},
            {method: 'get', url: '/posts', controller: 'PublicController', controllerMethod: 'getPosts'},
            {method: 'get', url: '/post', controller: 'PublicController', controllerMethod: 'postRegistration'},

            {method: 'post', url: '/login', controller: 'AuthController', controllerMethod: 'postLogin'},
            {method: 'get', url: '/logout', controller: 'AuthController', controllerMethod: 'postLogout', allow: 'user'},
            {method: 'get', url: '/user-profile', controller: 'AuthController', controllerMethod: 'getUserProfile', allow: 'user'},
            {method: 'get', url: '/registration', controller: 'AuthController', controllerMethod: 'getRegistration'},
            {method: 'post', url: '/registration', controller: 'AuthController', controllerMethod: 'postRegistration'},
            {method: 'get', url: '/verification-complete/:code', controller: 'AuthController', controllerMethod: 'postRegistrationConfirm'},
        ]
    }

    controllers () {
        return {
            PublicController,
            AuthController,
        }
    }
}

module.exports = Router;