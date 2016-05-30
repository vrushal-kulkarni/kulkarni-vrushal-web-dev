(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Are you pondering what I’m pondering? No, it has nothing to do with monkeys and dental floss. We’re ranking every single one of Brain’s schemes—both from the <em>Pinky and the Brain</em> series <em>and</em> their shorts on <em>Animaniacs</em>—and thereby take over the internet! (Enh, we’ll figure that part out later.)</p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var i in widgets){
                if(widgets[i].pageId === pageId)
                    result.push(widgets[i]);
            }
            return result;
        }

        function findWidgetById(widgetId) {
            for (var i in widgets){
                if(widgets[i]._id === widgetId){
                    return widgets[i];
                }
            }
            return null;
        }

        function createWidget(pageId, widget) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                widgetType: widget.widgetType,
                pageId: pageId,
                text: widget.text
            };
            widgets.push(newWidget);
            return newWidget;
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets[i] = widget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets){
                if(widgets[i]._id === widgetId){
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

    }

})();