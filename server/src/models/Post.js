const DBModel = require('./DBModel');

class Post extends DBModel {
    constructor (props) {
        super(props);

        this.schema = {
            header: String,
            text: String,
            createDate: {
                type: Date,
                default: Date.now()
            }
        };

        this.dbName = 'posts';
        this.createModelWithSchema(this.dbName, this.schema);
    }
}

module.exports = new Post();