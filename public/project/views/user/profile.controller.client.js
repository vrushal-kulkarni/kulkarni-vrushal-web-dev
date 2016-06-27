// (function(){
//     angular
//         .module("GreAppMaker")
//         .controller("ProfileController", ProfileController);
//
//     function ProfileController($routeParams, UserService, $rootScope, $location) {
//         var vm = this;
//         vm.updateUser = updateUser;
//         var id = $rootScope.currentUser._id;
//         vm.logout = logout;
//
//         function init() {
//             if (!id && $rootScope.currentUser) {
//                 vm.user = $rootScope.currentUser;
//             }else {
//             UserService
//                 .findUserById(id)
//                 .then(function (response) {
//                     vm.user = angular.copy(response.data);
//                 });
//             }
//         }
//         init();
//
//         function logout() {
//             UserService
//                 .logout()
//                 .then(
//                     function (response) {
//                         $location.url("/login");
//                     },
//                     function () {
//                         $location.url("/login");
//                     }
//                 )
//         }
//
//         function updateUser(newUser) {
//             UserService
//                 .updateUser(id, vm.user)
//                 .then(function (response) {
//                         vm.success = "Your profile was saved";
//                     },
//                     function (error) {
//                         vm.error = "Failed to update profile";
//                     });
//         }
//
//     }
// })();



(function () {
    angular
        .module("GreAppMaker")
        .controller("ProfileController",ProfileController);

    function ProfileController($routeParams,UserService,$rootScope,$location) {
        var vm =this;
        var index=-1;
        // var id = $rootScope.currentUser._id;
        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;
        vm.updateUser = updateUser;


        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response){
                    vm.user = response.data;
                    vm.user.dob=new Date(vm.user.dob);
                });

        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(vm.userId, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
                    }
                );
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