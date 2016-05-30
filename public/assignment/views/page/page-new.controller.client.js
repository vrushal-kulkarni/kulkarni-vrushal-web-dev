(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.createPage = createPage;
        vm.linkToPageList = linkToPageList;

        function createPage(pageName, pageTitle) {
            var result = PageService.createPage(vm.websiteId, {pageName: pageName, pageTitle: pageTitle});
            if (result){
                $location.url("/user/" + vm.userId + "/website/" + result.websiteId + "/page");
            } else {
                vm.error = "Unable to create website";
            }
        }
        function linkToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();