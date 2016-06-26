(function(){
    angular
        .module("GreAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService,  $rootScope, UserService) {
        var vm = this;

        // vm.userId = $routeParams.userId;
        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(name) {
                var website = {
                    //_id: (new Date()).getTime()+"",
                    name: name,
                    desc: description,
                    _user: vm.userId
                };

                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        var newWebsite = response.data;

                        if (newWebsite) {
                            $location.url("/user/" + vm.userId + "/wordlist");
                        }
                        else {
                            vm.error = "Unable to create website";
                        }
                    });
            }
            else {
                vm.error = "Please enter wordlist name";
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