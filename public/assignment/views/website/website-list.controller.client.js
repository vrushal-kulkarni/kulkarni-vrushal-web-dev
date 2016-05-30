(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        //vm.navigateToNewWebsite = navigateToNewWebsite;

        function init() {
            vm.websites = angular.copy(WebsiteService.findWebsitesByUser(vm.userId));
        }
        init();

        // function navigateToNewWebsite() {
        //     $location.url("/user/" + vm.userId + "/website/new");
        // }
    }
})();