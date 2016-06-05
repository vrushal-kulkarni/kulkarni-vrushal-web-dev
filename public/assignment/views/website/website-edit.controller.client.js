(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
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
                    $location.url("/user/" + vm.userId + "/website");
                }, function () {
                    vm.error = "Unable to delete website";
                });
        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.websiteId, vm.website)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    vm.error = "Unable to update website";
                });
        }

    }
})();