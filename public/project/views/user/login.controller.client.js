// (function(){
//     angular
//         .module("GreAppMaker")
//         .controller("LoginController", LoginController);
//
//     function LoginController($location, UserService, $rootScope) {
//         var vm = this;
//
//         vm.login = function(username, password) {
//             if (username === undefined && password === undefined)
//                 vm.error = "Please enter your Username and Password";
//             else {
//                 UserService
//                     .login(username, password)
//                     .then(function (response) {
//                         var user = response.data;
//                         if (user && user._id) {
//                             $rootScope.currentUser = user;
//                             $location.url("/user/" + user._id);
//                         }
//                         else {
//                             vm.error = "User not found";
//                         }
//                     });
//             }
//
//         }
//
//     }
// })();

(function () {
    angular
        .module("GreAppMaker")
        .controller("LoginController",LoginController);

    function LoginController($location,UserService,$rootScope) {

        var vm = this;
        vm.userError = false;
        vm.passError = false;
        vm.login = function(username, password) {
            vm.userError = false;
            vm.passError = false;
            if(!username){
                vm.error="Username is required";
                vm.userError = true;
            }else if(!password){
                vm.error="Password is required";
                vm.passError = true;
            }
            else {
                UserService
                    .login(username, password)
                    .then(function (response) {
                        var user = response.data;
                        if(user) {
                            UserService.setUser(response.data);
                            $rootScope.data = response.data;
                            console.log(response.data);
                            if ($rootScope.currentUser.roles !== null
                                && typeof($rootScope.currentUser.roles) !== 'undefined'
                                && $rootScope.currentUser.roles.indexOf('admin') >= 0) {
                                $location.url("/admin");
                                console.log("in admin area");
                            }
                            else {
                                $location.url("/user/" + user._id);
                            }


                            // var user = response.data;
                            // if (user && user._id) {
                            //     $rootScope.currentUser = user;
                            //     $location.url("/user/" + user._id);
                            // } else {
                            //     vm.error = "User not found";
                            // }

                        }
                        else {
                            vm.message = "Invalid credentials";
                        }

                    });
            }
        }

    }
})();