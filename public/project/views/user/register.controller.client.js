// (function(){
//     angular
//         .module("GreAppMaker")
//         .controller("RegisterController", RegisterController);
//
//     function RegisterController($location, UserService, $rootScope) {
//
//         var vm = this;
//         vm.register  = register ;
//
//         function register(username, password1, password2) {
//             if (username && password1 && password2) {
//                 if (password1 === password2) {
//                     var newUser = {
//                         //_id: (new Date()).getTime()+"",
//                         username: username,
//                         password: password1
//                     };
//                     UserService
//                         .register(username,password1)
//                         .then(function (response) {
//                             var user = response.data;
//                             if (user && user._id){
//                                 $location.url("/user/" + user._id);
//                                 $rootScope.currentUser = user;
//
//                             }
//                             else
//                                 vm.error = "Error while creating user";
//                         });
//                 }
//                 else {
//                     vm.error = "Password does not match"
//                 }
//             }
//             else
//             {
//                 vm.error = "All the fields are required";
//             }
//
//         }
//     }
// })();





(function () {
    angular
        .module("GreAppMaker")
        .controller("RegisterController",RegisterController);


    function RegisterController($routeParams,UserService,$location, $rootScope) {
        var vm =this;
        vm.register = register;


        function register(username,password,verifyPassword) {
            vm.userError = false;
            vm.passError = false;
            vm.verifyError = false;
            if(!username){
                vm.error="Username is required";
                vm.userError = true;
            }else if(!password){
                vm.error="Password is required";
                vm.passError = true;
            }
            else if(!verifyPassword){
                vm.error="Verify Password is required";
                vm.verifyError = true;
            }
            else {
                if (password === verifyPassword) {
                    UserService
                        .register(username, password)
                        .then(function (response) {
                                var user = response.data;
                                $rootScope.currentUser = user;
                                $location.url("/user/" + user._id);
                            },
                            function (err) {
                                vm.error=err.data;
                            });
                }
                else {
                    vm.passError = true;
                    vm.verifyError = true;
                    vm.error = "Both typed passwords should match";
                }
            }
        }
    }


})();