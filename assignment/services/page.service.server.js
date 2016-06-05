module.exports = function (app) {
    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"}
    ];

    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages){
            if(pages[i]._id === pageId){
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }

    function findAllPagesForWebsite(req, res) {
        var result = [];
        var id = req.params.websiteId;
        for(var i in pages){
            if(pages[i].websiteId === id){
                result.push(pages[i]);
            }
        }
        res.send(result)
        return;
    }

    function createPage(req, res) {
        var page = req.body;
        pages.push(page);
        res.send(200);
    }

    function updatePage(req, res) {
        var id = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === id) {
                pages[i]=newPage;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deletePage(req, res) {
        var id = req.params.pageId;
        for(var i in pages){
            if(pages[i]._id === id){
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

}