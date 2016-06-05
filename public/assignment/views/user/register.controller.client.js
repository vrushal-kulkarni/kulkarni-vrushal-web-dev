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
                var user = {
                    _id: (new Date()).getTime()+"",
                    username: username,
                    password: password1
                };
                UserService
                    .createUser(user)
                    .then(function(response){
                        if(response.data)
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
