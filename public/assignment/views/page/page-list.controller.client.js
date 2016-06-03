
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.webSiteId = $routeParams.websiteId;
        vm.linkToPageNew = linkToPageNew;

        function init() {
            vm.pages = angular.copy(PageService.findPageByWebsiteId(vm.webSiteId));
        }
        init();

        function linkToPageNew() {
             $location.url("/user/" + vm.userId + "/website/" + vm.webSiteId + "/page/new");
         }
    }
})();
