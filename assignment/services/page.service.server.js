module.exports = function (app, models) {

    var pageModel = models.pageModel;

    // var pages = [
    //     {"_id": "321", "name": "Post 1", "websiteId": "456"},
    //     {"_id": "432", "name": "Post 2", "websiteId": "456"},
    //     {"_id": "543", "name": "Post 3", "websiteId": "456"}
    // ];

    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageByID(pageId)
            .then(function(page) {
                res.send(page);
            },function(error) {
                res.status(400).send(error);
            });
        // for (var i in pages){
        //     if(pages[i]._id === pageId){
        //         res.send(pages[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findAllPagesForWebsite(req, res) {
        var result = [];
        var id = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(id)
            .then(
                function (pages) {
                    res.json(pages);
                },function(error) {
                    res.status(400).send(error);
                });
        // for(var i in pages){
        //     if(pages[i].websiteId === id){
        //         result.push(pages[i]);
        //     }
        // }
        // res.send(result)
        // return;
    }

    function createPage(req, res) {
        var page = req.body;

        pageModel
            .createPage(page)
            .then(
                function(page) {
                    console.log(page);
                    res.json(page);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            )
        // pages.push(page);
        // res.send(200);
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;

        pageModel
            .updatePage(id, newPage)
            .then(
                function(newPage) {
                    console.log(newPage);
                    res.json(newPage);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // for (var i in pages) {
        //     if (pages[i]._id === id) {
        //         pages[i]=newPage;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        pageModel
            .deletePage(id)
            .then(
                function (stats) {
                    console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        // for(var i in pages){
        //     if(pages[i]._id === id){
        //         pages.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

}