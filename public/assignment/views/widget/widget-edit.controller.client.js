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
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
        } init();

        function updateWidget(newWidget) {
            var result =  WidgetService.updateWidget(vm.widgetId, newWidget);
            if (result){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to update Widget";
            }
        }

        function deleteWidget() {
            var result =  WidgetService.deleteWidget(vm.widgetId);
            if (result){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to delete Widget";
            }
        }
    }
})();