// module.exports = function(){
//     var mongoose = require("mongoose");
//
//     var UserSchema = require("./user.schema.server")();
//     var User= mongoose.model("ProjectUser", UserSchema);
//
//     var api = {
//         createUser: createUser,
//         findUserById: findUserById,
//         findUserByCredentials: findUserByCredentials,
//         deleteUser: deleteUser,
//         findUserByUsername:findUserByUsername,
//         updateUser: updateUser
//         // findFacebookUser: findFacebookUser
//     };
//     return api;
//
//     // function findFacebookUser(id) {
//     //     return User.findOne({"facebook.id" : id});
//     // }
//
//     function createUser(user){
//         return User.create(user);
//     }
//
//     function findUserById(userId){
//         return User.findById({_id: userId});
//     }
//
//     function findUserByUsername(username) {
//         return User.findOne({username:username});
//     }
//
//     function findUserByCredentials(username , password){
//         return User.findOne({username: username, password: password});
//     }
//
//     function updateUser(userId , user){
//         delete user._id;
//
//         return User
//             .update({_id: userId},{
//                 $set: user
//             });
//     }
//
//     function deleteUser(userId){
//         return User.remove({_id: userId});
//     }
// }



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
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByGoogleId:findUserByGoogleId,
        findAllUsers:findAllUsers,





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
                    gender:user.gender,
                    dob:user.dob
                }
            });
    }

    function findUserById(userId) {
        return User.findById(userId);
    }
    
    function findUserByUsername(username) {
        return User.findOne({username:username});
    }

    // function findUserByUsername(username) //Search/find a user by his username
    // {
    //
    //     var deferred = q.defer();
    //
    //     console.log("Inside findUser name of project "+username);
    //     User.findOne({username:username},function(err,doc)
    //     {
    //         if(err){
    //             deferred.reject(err);
    //         }
    //         else{
    //             console.log("Same username found");
    //             deferred.resolve(doc);
    //         }
    //     });
    //     return deferred.promise;
    // }


    function findUserByGoogleId(googleId) {
        return User.findOne({'google.id': googleId});
    }


};