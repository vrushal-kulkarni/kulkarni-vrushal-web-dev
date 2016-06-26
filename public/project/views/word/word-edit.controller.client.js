(function () {
    angular
        .module("GreAppMaker")
        .controller("EditPageController", EditPageController);

    function  EditPageController($routeParams, $location, PageService, $rootScope, UserService) {

        var vm = this;
        // vm.userId = $routeParams.userId;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

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
                        $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word");
                    }
                    else {
                        vm.error="Unable to delete page";
                    }
                });
        }

        function logout() {
            UserService.logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                    ,function () {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    }
                )
        }

        function updatePage() {

                PageService
                    .updatePage(vm.pageId, vm.page)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word");
                    }, function (error) {
                        vm.error = "Unable to update page";
                    });
            
        }
        
        function linkToPageList() {
            $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word");
        }
    }

})();
