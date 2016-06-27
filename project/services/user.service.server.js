// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require("bcrypt-nodejs");
// // var FacebookStrategy = require('passport-facebook').Strategy;
//
//
// module.exports = function (app, models) {
//
//     var projectUserModel = models.usersModel;
//
//     app.get("/project/user", getUsers);
//     app.get("/project/user/:userId", findUserById);
//     app.post("/project/user", createUser);
//     app.put("/project/user/:userId", updateUser);
//     app.delete("/project/user/:userId", deleteUser);
//     app.post("/project/login", passport.authenticate('Projectlocal'), login);
//     app.post("/project/logout", logout);
//     app.get ("/project/loggedIn", loggedIn);
//     app.post ("/project/register", register);
//     // app.get("/auth/pfacebook", passport.authenticate('facebook'));
//     // app.get("/auth/pfacebook/callback", passport.authenticate('facebook', {
//     //     successRedirect: '/project/#/profile-homepage',
//     //     failureRedirect: '/project/#/login'
//     // }));
//     //
//     //
//     // var facebookConfig = {
//     //     clientID     : process.env.FACEBOOK_CLIENT_ID,
//     //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
//     //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
//     // };
//     // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));
//
//     passport.use('Projectlocal',new LocalStrategy(localStrategy));
//     passport.serializeUser(serializeUser);
//     passport.deserializeUser(deserializeUser);
//
//
//     // function facebookLogin(token, refreshToken, profile, done) {
//     //     console.log(profile);
//     //     userModel
//     //         .findFacebookUser(profile.id)
//     //         .then(
//     //             function (facebookUser) {
//     //                 if(facebookUser){
//     //                     return done(null, facebookUser);
//     //                 }else{
//     //                     facebookUser = {
//     //                         username: profile.displayName.replace(/ /g, ''),
//     //                         facebook: {
//     //                             token: token,
//     //                             id: profile.id,
//     //                             displayName: profile.displayName
//     //                         }
//     //                     };
//     //                     userModel
//     //                         .createUser(facebookUser)
//     //                         .then(
//     //                             function (user) {
//     //                                 done(null, user);
//     //                             }
//     //                         );
//     //
//     //                 }
//     //
//     //             }
//     //         );
//     // }
//
//     function localStrategy(username, password, done) {
//         projectUserModel
//             .findUserByUsername(username)
//             .then(
//                 function (user) {
//                     if(user && bcrypt.compareSync(password, user.password)) {
//                         done(null, user);
//                     } else {
//                         done(null, false);
//                     }
//                 },
//                 function(err) {
//                     done(err);
//                 }
//             );
//     }
//
//     function serializeUser(user, done) {
//         done(null, user);
//     }
//
//     function deserializeUser(user, done) {
//         projectUserModel
//             .findUserById(user._id)
//             .then(
//                 function(user){
//                     done(null, user);
//                 },
//                 function(err){
//                     done(err, null);
//                 }
//             );
//     }
//
//     function loggedIn(req, res) {
//         if(req.isAuthenticated()) {
//             console.log("in loggenin");
//             res.send(req.user);
//         } else {
//             res.send('0');
//         }
//     }
//
//     function register(req, res) {
//         var username = req.body.username;
//         var password = req.body.password;
//
//         projectUserModel
//             .findUserByUsername(username)
//             .then(
//                 function(user) {
//                     if(user) {
//                         res.status(400).send("Username already in use");
//                         return;
//                     } else {
//                         req.body.password = bcrypt.hashSync(req.body.password);
//                         return projectUserModel
//                             .createUser(req.body);
//                     }
//                 },
//                 function(err) {
//                     res.status(400).send(err);
//                 }
//             )
//             .then(
//                 function(user) {
//                     if(user) {
//                         req.login(user, function(err) {
//                             if(err) {
//                                 res.status(400).send(err);
//                             } else {
//                                 res.json(user);
//                             }
//                         })
//                     }
//                 },
//                 function(err) {
//                     res.status(400).send(err);
//                 }
//             )
//     }
//
//     function logout(req, res) {
//         req.logout();
//         res.send(200);
//     }
//
//     function login(req, res) {
//         var user = req.user;
//         res.json(user);
//     }
//
//
//     function getUsers(req, res) {
//         var username = req.query['username'];
//         var password = req.query['password'];
//         if (username && password) {
//             findUserByCredentials(username, password, res);
//         }
//         else if (username) {
//             findUserByUsername(username, res);
//         }
//         else {
//             res.send(users);
//         }
//     }
//
//     function findUserByUsername(username, res) {
//         projectUserModel
//             .findUserByUsername(username)
//             .then(
//                 function (user) {
//                     res.json(user);
//                 },
//                 function (error) {
//                     res.status(400).send(error);
//                 }
//             );
//
//     }
//
//     function findUserByCredentials(username, password, res) {
//         projectUserModel
//             .findUserByCredentials(username, password)
//             .then(
//                 function (user) {
//                     res.json(user);
//                 },
//                 function (error) {
//                     res.status(400).send(error);
//                 }
//             );
//
//     }
//
//
//
//     function findUserById(req, res) {
//         var userId = req.params.userId;
//         projectUserModel
//             .findUserById(userId)
//             .then(function(user) {
//                 res.send(user);
//             },function(error) {
//                 res.status(400).send(error);
//             });
//
//     }
//
//     function createUser(req, res) {
//         var newUser = req.body;
//
//         projectUserModel
//             .createUser(newUser)
//             .then(
//                 function(user) {
//                     console.log(user);
//                     res.json(user);
//                 },
//                 function(error) {
//                     res.statusCode(400).send(error);
//                 }
//             );
//     }
//
//     function updateUser(req, res) {
//         var id = req.params.userId;
//         var newUser = req.body;
//
//         projectUserModel
//             .updateUser(id, newUser)
//             .then(
//                 function(stats) {
//                     console.log(stats);
//                     res.send(200);
//                 },
//                 function(error) {
//                     res.statusCode(400).send(error);
//                 }
//             );
//
//     }
//
//     function deleteUser(req, res) {
//         var id = req.params.userId;
//
//         projectUserModel
//             .deleteUser(id)
//             .then(
//                 function (stats) {
//                     console.log(stats);
//                     res.send(200);
//                 },
//                 function (error) {
//                     res.statusCode(400).send(error);
//                 }
//             );
//
//     }
//
// }
//
//
//
//


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app,models) {

    var projUserModel = models.projUserModel;


    var loggedInUser;


    // User Follows Part
    app.post("/api/project/:userId/follow/:userName", addFriend);
    app.get("/api/project/find/friends/:userId", findFriends);
    app.get("/api/project/find/followers/:userId", findFollowers);
    app.delete("/api/project/:userId/friend/:fId", removeFriend);
    app.put("/api/project/notify", undoNotify);
    app.get("/api/project/userAll",findAllUsersForFollow);



    app.get("/api/project/user",findUserByUsername); //Changed

    app.post("/proj/user", isAdmin, createUser);
    app.get("/proj/user", findUserByCredentials);
    app.get("/proj/user/:userId", findUserById);
    app.put("/proj/user/:userId", updateUser);

    app.delete('/api/project/user/:id', deleteUserById);


    app.post("/proj/logout", logout);
    app.post("/proj/login", passport.authenticate('localNew'), login);
    app.post ('/proj/register', register);
    app.get ('/proj/loggedin', loggedin);

    app.get('/auth/google',passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/project/#/user/:userId',
        failureRedirect: '/project/#/login'
    }));
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    passport.use(new GoogleStrategy(googleConfig,googleLogin));
    passport.use('localNew',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function googleLogin(token, refreshToken, profile, done) {
        projUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function (googleUser) {
                    if(googleUser){
                        return done(null,googleUser);
                    } else{
                        googleUser = {
                            username:  profile.displayName.replace(/ /g,''),
                            google: {
                                token: token,
                                id: profile.id,
                                displayName: profile.displayName
                            }
                        };
                        projUserModel.createUser(googleUser)
                            .then(
                                function (user) {
                                    done(null,user);
                                }
                            );
                    }
                }
            )
    }




    function localStrategy(username, password, done) {
        projUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user &&  bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }
    function deserializeUser(user, done) {
        projUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }













    // 1. addFriend function
    function addFriend(req,res){
        console.log(req.params.userName);

        projUserModel.addFriend(req.params.userId,req.params.userName,req.body)
            .then(
                function (doc) {

                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // 2. FindFriends
    function findFriends (req,res){
        console.log(req.params.userId);
        console.log("Inside findFriends");
        //console.log(req.params.userId);
        projUserModel.findFriends(req.params.userId)
            .then(
                function (doc) {

                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // 3. findFollowers
    function findFollowers (req,res){
        console.log(req.params.userId);

        projUserModel.findFollowers(req.params.userId)
            .then(
                function (doc) {

                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // 4. RemoveFriend
    function removeFriend(req,res){
        projUserModel.removeFriend(req.params.userId,req.params.fId)
            .then(
                function (doc) {

                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // 5. Undo Notify
    function undoNotify(req,res){
        var friend = req.body;
        console.log(req.body);

        projUserModel.undoNotify(friend.userName, friend.followerName)
            .then(function (doc) {

                    res.json(doc);
                },
                function ( err ) {
                    res.status(400).send(err);
                });
    }

    // 6.FindAllUserForFollow
    function findAllUsersForFollow(req,res){
        var userName = req.query.username;
        var password = req.query.password;
        var user = null;
        if (userName != null && password != null){
            var credentials = {username : userName, password : password};
            projUserModel.findUserByCredentials(credentials)
                .then( function(user){
                        //req.session.currentUser = user;
                        res.json(user);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        }
        if(userName!=null && password == null){
            projUserModel.findUserByUsername(userName)
            // handle model promise
                .then(
                    // login user if promise resolved
                    function(doc) {

                        //console.log(JSON.stringify(doc));
                        res.json(doc);
                    },
                    // send error if promise rejected
                    function ( err ) {
                        res.status(400).send(err);
                    });
        }
        if(userName ==null && password == null){
            projUserModel.findAllUsers()
                .then(function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }
    }
















    function login(req, res) {
        var user = req.user;
        loggedInUser = user;
        res.json(user);
    }


    function createUser(req, res) {
        var user = req.body;

        user.roles = ["user"];

        console.log("user role is:"+user.roles);
        projUserModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )

    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        projUserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            )
    }






    function findUserByUsername(req,res)
    {

        var username = req.query.username;

        console.log("Inside findUSer of services");
        console.log(username);
        projUserModel.findUserByUsername(username)
            .then(function(doc)
                {
                    console.log("In services returned Object: ");
                    console.log(doc);
                    res.json(doc);
                },
                function(err)
                {
                    console.log("Returned error");
                    res.status(400).send(err);
                });
    }






    // Changed this fucntion
    function updateUser(req,res) {
        console.log("Inside update function of server Services");
        var userId = req.params.id;
        var userObj = req.body;
        console.log("Password coming from client");
        console.log(userObj.password);
        console.log(userObj.password);

        for (var email in userObj.emails) {
            userObj.emails[email] = userObj.emails[email].trim();
        }
        console.log("Inside Update User: ");
        console.log(userObj);
        projUserModel.findUserById(userId)
            .then(
                function (doc) {
                    var user = doc;
                    console.log("Old password is : ");
                    console.log(user.password);
                    if (user.password !== userObj.password) {
                        userObj.password = bcrypt.hashSync(userObj.password);
                        console.log("Updated Password");
                        console.log(userObj.password);
                    }
                    projUserModel.updateUser(userId, userObj)
                        .then(
                            function (doc) {

                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            }
                        )


                }
            )


    }









    //
    // function updateUser(req, res) {
    //     var id = req.params.userId;
    //     var newUser = req.body;
    //
    //     projUserModel
    //         .updateUser(id, newUser)
    //         .then(
    //             function(stats) {
    //                 console.log(stats);
    //                 res.send(200);
    //             },
    //             function(error) {
    //                 res.statusCode(404).send(error);
    //             }
    //         );
    // }


    function deleteUserById(req, res) {
        var userId = req.params.id;
        projUserModel.deleteUserById(userId)
            .then(
                function(doc) {
                    res.json(doc);
                },

                function(err) {
                    res.status(400).send(err);
                }
            );
    }


    function isAdmin(req, res, next) {

        if(req.isAuthenticated()) {
            if(loggedInUser.roles.indexOf("admin") >= 0) {
                next();
            }
        }
        else {
            res.send(403);
        }
    }


    function findUserById(req, res) {
        var id = req.params.userId;

        projUserModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            )
    }
    function logout(req,res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = req.body;
        newUser.roles = ['user'];

        projUserModel.findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        res.status("400").send("UserName already in use");
                        return;
                    }
                    else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return projUserModel.createUser(req.body);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(
                function (user) {
                    if(user){
                        req.login(user,function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                loggedInUser = user;
                                res.json(user);
                            }
                        });
                    }
                },function (err) {
                    res.status(400).send(err);
                }
            );

        ;
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

};