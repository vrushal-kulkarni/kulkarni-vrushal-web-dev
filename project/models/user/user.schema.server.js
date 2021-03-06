
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email:String,
        phone: String,
        friends : [String],  //Follows
        roles : [String],
        google: {
            id:    String,
            token: String,
            displayName: String
        },
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.useracc"});

    return UserSchema;
};