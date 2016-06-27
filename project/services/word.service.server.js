module.exports = function (app, models) {

    var pageModel = models.wordModel;

    app.get("/project/word/mnemonic/:name", findPageByName);

    app.get("/project/word/:pageId", findPageById);
    app.get("/project/wordlist/:websiteId/word", findAllPagesForWebsite);
    app.post("/project/wordlist/:websiteId/word", createPage);
    app.put("/project/word/:pageId", updatePage);
    app.delete("/project/word/:pageId", deletePage);



    function findPageByName(req, res) {
        var pageName=req.params.name;

        pageModel
            .findPageByName(pageName)
            .then(function (page) {
                res.send(page);
            },function(error) {
                res.status(400).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;

        pageModel
            .findPageByID(pageId)
            .then(function(page) {
                res.send(page);
            },function(error) {
                res.status(400).send(error);
            });
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
    }

}