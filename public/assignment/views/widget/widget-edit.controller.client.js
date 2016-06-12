(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            WidgetService
                .findWidgetById( vm.widgetId )
                .then(function (response) {
                    vm.widget = angular.copy(response.data);
                });
        } init();

        function updateWidget(newWidget) {
           if(newWidget.name) {

               WidgetService
                   .updateWidget(vm.widgetId, newWidget)
                   .then(function (response) {
                       if (response.data) {
                           $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                       }
                       else {
                           vm.error = "Unable to update Widget";
                       }
                   });
           }
            else{
               vm.error="Widget name is required"
           }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(response){
                    if(response.data)
                    {
                        $location.url("/user/"+ vm.userId +"/website/"+ vm.websiteId +"/page/"+ vm.pageId +"/widget");
                    }
                    else
                    {
                        vm.error = "Unable to delete Widget";
                    }
                });
        }
    }
})();