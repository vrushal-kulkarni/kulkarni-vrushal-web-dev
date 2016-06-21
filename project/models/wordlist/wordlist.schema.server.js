module.exports = function () {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        name: {type: String, required: true},
        desc: String,
        _user: {type: mongoose.Schema.ObjectId, ref:"User"},
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "project.website"});

    return WebsiteSchema;
};