module.exports = function(){
    var mongoose = require("mongoose");

    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget= mongoose.model("Widget", WidgetSchema);

    var api = {
        findWidgetByID: findWidgetByID,
        findAllWidgetsForPage: findAllWidgetsForPage,
        createWidget: createWidget,
        deleteWidget: deleteWidget,
        updateWidget: updateWidget
    };
    return api;

    function findWidgetByID(widgetId){
        return Widget.findById(widgetId);
    }

    function findAllWidgetsForPage(pageId){
        return Widget.find({"_page": pageId});
    }

    function createWidget(newWidget){
        delete newWidget._id;

        return Widget.create(newWidget);
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
}