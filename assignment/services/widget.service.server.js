
module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    // var widgets =
    //     [
    //         { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //         { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //             "url": "http://lorempixel.com/400/200/"},
    //         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //         { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //             "url": "https://youtu.be/AM2Ivdi9c4E" },
    //         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    //     ];

    app.get("/api/widget/:widgetId", findWidgetById);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post ("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype= myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
            }
        }

        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetByID(widgetId)
            .then(function(widget) {
                console.log(widget);
                res.send(widget);
            },function(error) {
                res.status(400).send(error);
            });
        // for (var i in widgets){
        //     if(widgets[i]._id === widgetId){
        //         res.send(widgets[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }

    function findAllWidgetsForPage(req, res) {
        var id = req.params.pageId;
        var result = [];
        widgetModel
            .findAllWidgetsForPage(id)
            .then(
                function (widgets) {
                    res.json(widgets);
                },function(error) {
                    res.status(400).send(error);
                });
        // for(var i in widgets){
        //     if(widgets[i].pageId === id){
        //         result.push(widgets[i]);
        //     }
        // }
        // res.send(result)
        // return;
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        widgetModel
            .createWidget(newWidget)
            .then(
                function(newWidget) {
                    console.log(newWidget);
                    res.json(newWidget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // newWidget._id = (new Date()).getTime()+"";
        // widgets.push(newWidget);
        // res.send(newWidget);
    }

    function updateWidget(req, res) {
        var id = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(id, widget)
            .then(
                function(widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
        // for (var i in widgets) {
        //     if (widgets[i]._id === id)
        //     {
        //         widgets[i]=widget;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

    function deleteWidget(req, res) {
        var id = req.params.widgetId;
        widgetModel
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
        // for(var i in widgets){
        //     if(widgets[i]._id === id){
        //         widgets.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }

};