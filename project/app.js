module.exports = function (app) {

    // app.get("/say/:message", function (req, res) {
    //     var msg = req.params["message"];
    //     //  console.log(msg);
    //     res.send({message : msg});
    // });

    var models = require("./models/models.server.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/wordlist.service.server.js")(app, models);
    require("./services/word.service.server.js")(app, models);
    //require("./services/widget.service.server.js")(app, models);

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];
    // app.get("/users/:id", function (req, res) {
    //     var id = req.params.id;
    //
    //     for(var i in users){
    //         if(users[i]._id ===id){
    //             res.send(users[i]);
    //             return;
    //         }
    //     }
    //     res.send({});
    // });

};