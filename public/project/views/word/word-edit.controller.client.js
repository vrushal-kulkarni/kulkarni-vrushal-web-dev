(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function  EditPageController($routeParams, $location, PageService) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.linkToPageList = linkToPageList;

        function init() {
            PageService
                .findPageById( vm.pageId)
                .then(function (response) {
                    vm.page = angular.copy(response.data);
                });
        }

        init();

        function deletePage(){
            PageService
                .deletePage(vm.pageId)
                .then(function(response)
                {
                    var page = response.data;
                    if(page) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }
                    else {
                        vm.error="Unable to delete page";
                    }
                });
        }

        function updatePage() {
            if (vm.page.name) {
                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        vm.error = "Unable to update page";
                    });
            }
            else{
                vm.error="Page Name is required";
            }
        }
        
        function linkToPageList() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }

})();
