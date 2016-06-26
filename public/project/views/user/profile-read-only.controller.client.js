(function(){

    angular
        .module("GreAppMaker")
        .controller("StaticProfileController",StaticProfileController)

    function StaticProfileController($location,$routeParams,UserService, $rootScope)
    {
        var vm = this;

        var username = $routeParams.username;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;



        $location.url("users/profile/"+username);

        UserService
            .findUserByUsername(username)
            .then(
                function(user)
                {
                    console.log(user);
                    vm.userdata = user;

                },
                function(err)
                {
                    console.log("err in static view");
                }

            );

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