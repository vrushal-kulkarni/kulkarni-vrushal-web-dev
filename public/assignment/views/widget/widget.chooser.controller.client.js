(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.createWidget = createWidget;

        function createWidget(type) {
                var widget = {
                    widgetType: type
                };

                WidgetService
                    .createWidget(vm.pageId, widget)
                    .then(
                        function (response) {
                            vm.widget = response.data;
                            if (vm.widget._id)
                                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                            else
                                vm.error = "Unable to create a Widget";
                        });
            
        }
    }

})();