(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function  EditPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.linkToPageList = linkToPageList;

        function deletePage() {
            var result = PageService.deletePage(vm.pageId);
            if (result) {
                if (result) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.error = "Unable to delete page";
                }
            }
        }

        function updatePage() {
            var result =  PageService.updatePage(vm.pageId, vm.page);
            if (result){
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Unable to update page";
            }
        }
        
        function linkToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();
