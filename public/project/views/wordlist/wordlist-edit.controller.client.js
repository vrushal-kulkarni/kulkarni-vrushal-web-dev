(function () {
    angular
        .module("GreAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService, $rootScope, UserService) {
        var vm = this;
        // vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = angular.copy(response.data);
                });
        }

        init();

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function () {
                    $location.url("/user/" + vm.userId + "/wordlist");
                }, function () {
                    vm.error = "Unable to delete website";
                });
        }

        function updateWebsite() {
            if (vm.website.name) {
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/wordlist");
                    }, function (error) {
                        vm.error = "Unable to update website";
                    });
            }
            else {
                vm.error = "Website Name is required"
            }
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

    }
})();