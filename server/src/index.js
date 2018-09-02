const
    express = require("express"),
    app = express(),
    Router = require('./Router');
    // router = require('./routes/index');

new Router(app);

app.listen(3000);