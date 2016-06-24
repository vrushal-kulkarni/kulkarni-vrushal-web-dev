module.exports = function() {
    var mongoose = require("mongoose");

    var FollowerSchema =  mongoose.Schema({
            userId      : String,
            userName    : String,
            followerId  : String,
            followerName : String,
            notify      :  {type : String , default : "no"}
        },
        {collection: "follow"});
    return FollowerSchema;
};