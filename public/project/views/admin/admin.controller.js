(function() {
    angular
        .module("GreAppMaker")
        .controller("AdminController", adminController);

    function adminController(UserService, $rootScope, $location) {

        var vm = this;
        var selectedUserId;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

        function init() {
            vm.remove = remove;
            vm.update = update;
            vm.select = select;
            vm.add    = add;
            vm.sortType = 'username';
            vm.sortReverse = false;
            UserService
                .findAllUsers()
                .then(handleSuccess, handleError);
        }
        init();

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

        function remove(user, index)
        {
            if(user._id !== $rootScope.currentUser._id) {
                UserService
                    .deleteUserById(user._id)
                    .then(function (response) {
                        vm.users.splice(index, 1);
                        vm.error = null;
                    });
            }
            else {
                vm.error = "You cannot delete your current admin account while you are logged in";
            }
        }

        function add(user)
        {
            UserService
                .createUser(user)
                .then(function(response) {
                    vm.users.push(response.data);
                });
        }

        function update(user)
        {
            console.log("user check"+user);
            if(user.roles) {
                user.roles = user.roles.split(",");
            }
            UserService
                .updateUser(selectedUserId, user)
                .then(function(response) {
                    for(var i in vm.users) {
                        if(vm.users[i]._id === selectedUserId) {
                            console.log(response.data);
                            var usr = response.data;
                            usr.roles = usr.roles.toString();
                            vm.users[i] = usr;
                        }
                    }
                });
        }
        

        function select(user)
        {
            selectedUserId = user._id;
            vm.roles = user.roles.toString();
            vm.username = user.username;
            vm.password = user.password;
            vm.firstName = user.firstName;
            vm.lastName = user.lastName;
            vm._id = user._id;
        }

        function handleSuccess(response) {
            for(var i in response.data) {
                response.data[i].roles = response.data[i].roles.toString();
            }
            vm.users = response.data;
        }

        function handleError(error) {
            vm.error = error;
        }

    }
})();