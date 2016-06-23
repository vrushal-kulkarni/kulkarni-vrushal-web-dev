var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
// var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function (app, models) {

    var projectUserModel = models.usersModel;

    app.get("/project/user", getUsers);
    app.get("/project/user/:userId", findUserById);
    app.post("/project/user", createUser);
    app.put("/project/user/:userId", updateUser);
    app.delete("/project/user/:userId", deleteUser);
    app.post("/project/login", passport.authenticate('Projectlocal'), login);
    app.post("/project/logout", logout);
    app.get ("/project/loggedIn", loggedIn);
    app.post ("/project/register", register);
    // app.get("/auth/pfacebook", passport.authenticate('facebook'));
    // app.get("/auth/pfacebook/callback", passport.authenticate('facebook', {
    //     successRedirect: '/project/#/profile-homepage',
    //     failureRedirect: '/project/#/login'
    // }));
    //
    //
    // var facebookConfig = {
    //     clientID     : process.env.FACEBOOK_CLIENT_ID,
    //     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    //     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    // };
    // passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    passport.use('Projectlocal',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    // function facebookLogin(token, refreshToken, profile, done) {
    //     console.log(profile);
    //     userModel
    //         .findFacebookUser(profile.id)
    //         .then(
    //             function (facebookUser) {
    //                 if(facebookUser){
    //                     return done(null, facebookUser);
    //                 }else{
    //                     facebookUser = {
    //                         username: profile.displayName.replace(/ /g, ''),
    //                         facebook: {
    //                             token: token,
    //                             id: profile.id,
    //                             displayName: profile.displayName
    //                         }
    //                     };
    //                     userModel
    //                         .createUser(facebookUser)
    //                         .then(
    //                             function (user) {
    //                                 done(null, user);
    //                             }
    //                         );
    //
    //                 }
    //
    //             }
    //         );
    // }

    function localStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                },
                function(err) {
                    done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        projectUserModel
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

    function loggedIn(req, res) {
        if(req.isAuthenticated()) {
            console.log("in loggenin");
            res.send(req.user);
        } else {
            res.send('0');
        }
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        projectUserModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user) {
                        res.status(400).send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return projectUserModel
                            .createUser(req.body);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if(user) {
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        })
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (username && password) {
            findUserByCredentials(username, password, res);
        }
        else if (username) {
            findUserByUsername(username, res);
        }
        else {
            res.send(users);
        }
    }

    function findUserByUsername(username, res) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }

    function findUserByCredentials(username, password, res) {
        projectUserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }



    function findUserById(req, res) {
        var userId = req.params.userId;
        projectUserModel
            .findUserById(userId)
            .then(function(user) {
                res.send(user);
            },function(error) {
                res.status(400).send(error);
            });

    }

    function createUser(req, res) {
        var newUser = req.body;

        projectUserModel
            .createUser(newUser)
            .then(
                function(user) {
                    console.log(user);
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        projectUserModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    console.log(stats);
                    res.send(200);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

    }

    function deleteUser(req, res) {
        var id = req.params.userId;

        projectUserModel
            .deleteUser(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );

    }

}




