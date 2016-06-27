
var q = require("q");

module.exports = function() {

    var mongoose = require("mongoose")

    var FollowerSchema = require("./follower.schema.server")();
    var FollowModel =  mongoose.model('follow',FollowerSchema);

    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        updateUserByUserId:updateUserByUserId,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByGoogleId:findUserByGoogleId,
        findAllUsers:findAllUsers,
        deleteUserById : deleteUserById,

        //Follower Part
        //follow
        addFriend:addFriend,
        findFriends:findFriends,
        findFollowers:findFollowers,
        removeFriend:removeFriend,
        updateFollower: updateFollower,
        undoNotify:undoNotify
    };
    return api;




    function findAllUsers()
    {
        var deferred = q.defer();

        User.find(
            function(err, doc) {
                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }


    // 1. addFriend
    function addFriend(uid,username,friend){
        var deferred = q.defer();


        FollowModel.create(
            {
                userId      : uid,
                userName  : username,
                followerId  : friend._id,
                followerName : friend.username
            },function(err,follow){
                if(err){
                    deferred.reject(err);
                }
                else{
                    deferred.resolve(follow);
                }
            }
        );
        return deferred.promise;
    }

    // 2.findFriends
    function findFriends(uid){
        var deferred = q.defer();
        console.log("Inside findFriends Model");
        console.log(uid);
        FollowModel.find({userId:uid},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // 3.findFollowers
    function findFollowers(uid){
        var deferred = q.defer();
        FollowModel.find({followerId:uid},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {

                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    // 4.removeFriend
    function removeFriend(userId,fId) {
        var deferred = q.defer();
        console.log(userId);
        console.log(fId);
        FollowModel.findOneAndRemove({$and: [{'userId': userId}, {'followerId': fId}]},
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    console.log(users);
                    console.log("removed");
                    deferred.resolve(users);
                }
            });
        return deferred.promise;
    }

    // 5. updateFollower
    function updateFollower(uid){
        var deferred = q.defer();
        console.log("Inside Model update");
        console.log(uid);
        FollowModel.update({followerId:uid}, {notify: "yes"}, {multi: true},
            function(err, fuser) {
                if(err){
                    deferred.reject(err);
                }else{
                    console.log("updated ");
                    deferred.resolve(fuser);
                }

            }
        );
        return deferred.promise;
    }

    // 6.UndoNotify
    function undoNotify(uName,fName){
        var deferred = q.defer();
        console.log("Inside Model undoNotify");
        console.log(uName);
        console.log(fName);
        FollowModel.update({userName : uName ,followerName : fName}, {notify: "no"},
            function(err, fuser) {
                if(err){
                    deferred.reject(err);
                }else{
                    console.log("updated ");
                    deferred.resolve(fuser);
                }

            }
        );
        return deferred.promise;
    }


    function createUser(user) {
        return User.create(user);
    }
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }


    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dob:user.dob
                }
            });
    }

    function updateUserByUserId(userId,updateduser) //Update a user by id, and updated user object
    {
        var deferred = q.defer();
        User.update({_id:userId},
            updateduser,
            function(err,stats)
            {
                if(stats) {

                    User.findById(userId, function (err, doc) {
                        if (err) {
                            deferred.reject(err);
                        }
                        else {
                            deferred.resolve(doc);
                        }
                    });
                }
                else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }



    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username:username});
    }


    function deleteUserById(userId) {
        var deferred = q.defer();
        User.remove({_id : userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }


};