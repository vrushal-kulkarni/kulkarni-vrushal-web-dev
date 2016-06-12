(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.registerUser = registerUser;

        function registerUser (username, password1, password2) {
            if(password1 === password2)
            {
                var newUser = {
                    //_id: (new Date()).getTime()+"",
                    username: username,
                    password: password1
                };
                UserService
                    .createUser(newUser)
                    .then(function(response){
                        var user = response.data;
                        if(user)
                            $location.url("/user/"+user._id);
                        else
                            vm.error = "Error while creating user";
                    });
            }
            else
            {
                vm.error = "Password does not match"
            }

        }
    }
})();
