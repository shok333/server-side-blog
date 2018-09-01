const
    template = require('./template'),
    fs = require('fs'),
    {frontendApplication} = require('../../static/main.js');


class BaseController {
    constructor (request, response) {
        this.request = request;
        this.response = response;
    }

    serverRenderingResponse (initState = []) {
        this.response.write(template(frontendApplication(initState, this.request.path), "<script src=\"../main.js\"></script></body>", initState));
        this.response.end();
    }

    staticFileResponse (url) {
        fs.readFile(url, (error, page) => {
            this.response.write(page);
            this.response.end();
        });
    }

    jsonResponse (data) {
        this.response.json(data);
        this.response.end();
    }
}

module.exports = BaseController;