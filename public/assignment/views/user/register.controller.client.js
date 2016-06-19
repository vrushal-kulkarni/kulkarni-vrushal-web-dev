(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.register  = register ;

        function register(username, password1, password2) {
            if (username && password1 && password2) {
                if (password1 === password2) {
                    var newUser = {
                        //_id: (new Date()).getTime()+"",
                        username: username,
                        password: password1
                    };
                    UserService
                        .register(username,password1)
                        .then(function (response) {
                            var user = response.data;
                            if (user)
                                $location.url("/user/" + user._id);
                            else
                                vm.error = "Error while creating user";
                        });
                }
                else {
                    vm.error = "Password does not match"
                }
            }
            else
            {
                vm.error = "All the fields are required";
            }

        }
    }
})();
