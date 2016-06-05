
module.exports = function(app) {

    var websites =
        [
            { "_id": "123", "name": "Facebook", "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "234", "name": "Tweeter", "desc": "Social Networking Site",    "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",  "desc": "Social Networking Site",   "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "desc": "Social Networking Site","developerId": "123" },
            { "_id": "678", "name": "Checkers", "desc": "Social Networking Site",   "developerId": "123" },
            { "_id": "789", "name": "Chess", "desc": "Social Networking Site",      "developerId": "234" }
        ];

    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);


    function findWebsiteById(req,res){
        var websiteId = req.params.websiteId;
        for(var i in websites) {
            if(websites[i]._id === websiteId) {
                res.send(websites[i]);
                return;
            }
        }
        res.send({});
    };

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        var id = req.params.userId;
        for(var i in websites){
            if(websites[i].developerId === id){
                resultSet.push(websites[i]);
            }
        }
        res.send(resultSet)
        return;
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.send(200);
    }

    function updateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id === id)
            {
                websites[i]=newWebsite;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWebsite(req, res) {
        var id = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === id)
            {
                websites.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};