(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            var website = {
                //_id: (new Date()).getTime()+"",
                name: name,
                desc: description,
                _user: vm.userId
            };

            WebsiteService
                .createWebsite(vm.userId, website)
                .then(function(response){
                    var newWebsite = response.data;

                    if(newWebsite) {
                        $location.url("/user/" + vm.userId + "/website");
                    }
                    else {
                        vm.error="Unable to create website";
                    }
                });
        }
    }
})();