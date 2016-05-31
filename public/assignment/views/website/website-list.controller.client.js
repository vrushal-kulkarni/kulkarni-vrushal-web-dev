(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            vm.websites = angular.copy(WebsiteService.findWebsitesByUser(vm.userId));
        }
        init();
        
    }
})();