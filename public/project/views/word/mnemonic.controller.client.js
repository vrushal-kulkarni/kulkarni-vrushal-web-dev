
(function () {
    angular
        .module("GreAppMaker")
        .controller("MnemonicController",MnemonicController);

    function MnemonicController($routeParams,PageService, $location, $rootScope, UserService) {
        var vm = this;
        // vm.userId = $routeParams.userId;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.linkToPageList = linkToPageList;
        vm.searchComments=searchComments;

        function init() {
            PageService
                .findPageById( vm.pageId)
                .then(function (response) {
                    vm.page = angular.copy(response.data);
                });
        }

        init();

        function searchComments(name) {
            PageService
                .findPageByName(name)
                .then(function (response) {
                    vm.pageList=response.data;

                    // for(var i in vm.pageList){
                    //     console.log(vm.pageList.title);
                    //     if(vm.pageList.title !=null)
                    //         vm.comments=vm.pageList.title;
                    // }
                })
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

        function linkToPageList() {
            $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word");
        }

    }
})();
