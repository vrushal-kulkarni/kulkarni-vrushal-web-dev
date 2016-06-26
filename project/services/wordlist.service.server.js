module.exports = function(app, models) {

    var projectWebsiteModel = models.wordlistModel;

    app.get("/project/user/:userId/wordlist", findAllWebsitesForUser);
    app.get("/project/wordlist/:websiteId", findWebsiteById);
    app.put("/project/wordlist/:websiteId", updateWebsite);
    app.delete("/project/wordlist/:websiteId", deleteWebsite);
    app.post("/project/user/:userId/wordlist", createWebsite);



    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        projectWebsiteModel
            .findWebsiteByID(websiteId)
            .then(function (website) {
                res.send(website);
            }, function (error) {
                res.status(400).send(error);
            });
        // for(var i in websites) {
        //     if(websites[i]._id === websiteId) {
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send({});
    };

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        var id = req.params.userId;
        projectWebsiteModel
            .findAllWebsitesForUser(id)
            .then(
                function (websites) {
                    res.json(websites);
                },function(error) {
                    res.status(400).send(error);
                });

        // for(var i in websites){
        //     if(websites[i].developerId === id){
        //         resultSet.push(websites[i]);
        //     }
        // }
        // res.send(resultSet)
        // return;
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        projectWebsiteModel
            .createWebsite(newWebsite)
            .then(
                function(newWebsite) {
                    console.log(newWebsite);
                    res.json(newWebsite);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

        // websites.push(newWebsite);
        // res.send(200);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;

        projectWebsiteModel
            .updateWebsite(id, newWebsite)
            .then(
                function(newWebsite) {
                    console.log(newWebsite);
                    res.json(newWebsite);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // for (var i in websites) {
        //     if (websites[i]._id === id)
        //     {
        //         websites[i]=newWebsite;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        projectWebsiteModel
            .deleteWebsite(id)
            .then(
                function(stats){
                    console.log(stats);
                    res.send(200);
                },
                function(error){
                    res.statusCode(400).send(err);
                }
            );
        // for (var i in websites) {
        //     if (websites[i]._id === id)
        //     {
        //         websites.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

};