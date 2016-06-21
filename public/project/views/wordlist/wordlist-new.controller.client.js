(function(){
    angular
        .module("GreAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams.userId;
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
                vm.error = "Please enter website name";
            }

        }
    }
})();