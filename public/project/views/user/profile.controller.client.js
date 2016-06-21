(function(){
    angular
        .module("GreAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService, $rootScope, $location) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams.userId;
        vm.logout = logout;

        function init() {
            if (!id && $rootScope.currentUser) {
                vm.user = $rootScope.currentUser;
            }else {
            UserService
                .findUserById(id)
                .then(function (response) {
                    vm.user = angular.copy(response.data);
                });
            }
        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                )
        }

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