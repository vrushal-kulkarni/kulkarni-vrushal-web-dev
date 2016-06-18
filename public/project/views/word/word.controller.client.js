
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService, $location) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.linkToPageNew = linkToPageNew;

        function  init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = angular.copy(response.data);
                });
        }
        init();

        function linkToPageNew() {
             $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
         }
    }
})();
