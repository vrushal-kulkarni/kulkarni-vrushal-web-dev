module.exports = function(){
    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();
    var User= mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByID: findUserByID,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser
    };
    return api;

    function createUser(user){
        return User.create(user);
    }

    function findUserByID(userId){
        return User.findById({_id: userId});
    }

    function findUserByCredentials(username , password){
        return User.findOne({username: username, password: password});
    }

    function updateUser(userId , user){
        delete user._id;

        return User
            .update({_id: userId},{
                $set: user
            });
    }

    function deleteUser(userId){
        return User.remove({_id: userId});
    }
}