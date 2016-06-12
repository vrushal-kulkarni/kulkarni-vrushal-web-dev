module.exports = function () {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
        name: {type: String, required: true},
        title: String,
        description: String,
        _website: {type: mongoose.Schema.ObjectId, ref:"Website"},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "assignment.page"});

    return PageSchema;
};