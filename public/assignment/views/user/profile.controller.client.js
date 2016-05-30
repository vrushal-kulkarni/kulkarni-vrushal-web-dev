(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        var id = $routeParams.userId;

        function init() {
            vm.user =angular.copy(UserService.findUserById(id));
        }
        init();

        function updateUser(newUser) {
            var result = UserService.updateUser(id, newUser);
            if(result){
                vm.success = "Your profile was saved";
            }else{
                vm.error ="Failed to update profile";
            }
        }

    }
})();