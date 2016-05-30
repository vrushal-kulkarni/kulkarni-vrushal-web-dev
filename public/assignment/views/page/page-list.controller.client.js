( function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController ($routeParams, PageService, $location) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.linkToPageNew = linkToPageNew;
        //vm.linktoWebsiteList = linktoWebsiteList;

        function  init() {
            vm.pages = angular.copy(PageService.findPageByWebsiteId(vm.websiteId));
        } init();

        // function linktoWebsiteList() {
        //     $location.url("/user/" + vm.userId + "/website");
        // }
        //
        function linkToPageNew() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }
    }

})();
