const mongoose = require("mongoose");

class DBModel {
    constructor () {
        mongoose.Promise = global.Promise;
        this.dbUrl = "mongodb://127.0.0.1:27017/cms";
        this.add = this.add.bind(this);
        this.getAll = this.getAll.bind(this);
        this.schema = mongoose.Schema(this.schema);
        this.mongoose = mongoose;
    }

    createModelWithSchema () {
        this.modelWithSchema = mongoose.model(this.dbName, this.schema);
    }

    async add (data) {
        await mongoose.connect(this.dbUrl);
        const model = await new this.modelWithSchema(data);
        await model.save();
        await mongoose.disconnect();
    };

    async getAll () {
        await mongoose.connect(this.dbUrl);
        const total = await this.modelWithSchema.find();
        await mongoose.disconnect();

        return total;
    }

    async findOne (findProps) {
        await mongoose.connect(this.dbUrl);
        const total = await this.modelWithSchema.findOne(findProps);
        await mongoose.disconnect();

        return total;
    }

    async findOneAndUpdate (findProps, newProps) {
        await mongoose.connect(this.dbUrl);
        const total = await this.modelWithSchema.findOneAndUpdate(findProps, newProps);
        await mongoose.disconnect();

        return total;
    }
}

module.exports = DBModel;