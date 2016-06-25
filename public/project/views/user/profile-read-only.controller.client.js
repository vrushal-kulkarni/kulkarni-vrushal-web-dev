(function(){

    angular
        .module("GreAppMaker")
        .controller("StaticProfileController",StaticProfileController)

    function StaticProfileController($location,$routeParams,UserService)
    {
        var vm = this;

        var username = $routeParams.username;

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

    }

})();