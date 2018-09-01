const express = require('express');

class BaseRouter {
    constructor (app) {
        app.use(express.json());
        const arrayOfRoutes = this.routes();

        arrayOfRoutes.forEach((route) => {
            const {method, url, controller, controllerMethod} = route;

            app[method](url, (request, response) => {
                this.runMethodOfController(controller, controllerMethod, request, response);
            });
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