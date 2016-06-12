module.exports = function(){
    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget= mongoose.model("Widget", WidgetSchema);

    var api = {
        findWidgetByID: findWidgetByID,
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget,
        dragWidget:dragWidget
    };
    return api;

    function findWidgetByID(widgetId){
        return Widget.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page": pageId});
    }

    function createWidget(pageId, widget){
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                }
            );
    }

    function deleteWidget(widgetId){
        return Widget.remove({_id: widgetId});
    }

    function updateWidget(widgetId , newWidget){
        delete newWidget._id;

        return Widget
            .update({_id: widgetId},{
                $set: newWidget
            });
    }

    function dragWidget(pageId,widgets){
        return  Widget.update({_page: pageId}, {$set: widgets}, false, true);
    }
}