(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {

        var vm = this;
        vm.registerUser = registerUser;
        function registerUser (username, password1, password2) {
            var user =  UserService.findUserByUsername(username);
            if(user) {
                vm.error = "Username already Exist.";
            }
            else if(password1 !==password2) {
                vm.error = "Password does not match";
            }
            else{
                var user = UserService.createUser({username: username, password: password1});
                var id = user._id;
                $location.url("/user/" + id);
            }
        }
    }
})();
