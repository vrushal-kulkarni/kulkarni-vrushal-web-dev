(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams.userId;

        function init() {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(id, vm.user)
                .then(function (response) {
                        vm.success = "Your profile was saved";
                    },
                    function (error) {
                        vm.error = "Failed to update profile";
                    });
        }

    }
})();