(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        
        vm.login = function(username, password) {
            if (username === undefined && password === undefined)
                vm.error = "Please enter your Username and Password";
            else {
                UserService
                    .login(username, password)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $location.url("/user/" + user._id);
                        }
                        else {
                            vm.error = "User not found";
                        }
                    });
            }

        }

    }
})();