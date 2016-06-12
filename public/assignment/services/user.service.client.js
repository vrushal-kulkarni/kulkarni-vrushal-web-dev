(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService );

    function UserService($http) {

        var api = {

            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,

        };
        return api;


        function createUser(newUser) {
            var newuser = {
                //_id: (new Date()).getTime()+"",
                username: newUser.username,
                password: newUser.password,
                firstName:"",
                lastName:""
            };
            return $http.post("/api/user", newuser);
        }

        function findUserById(id) {
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password ;
            return $http.get(url);
        }



        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
        }

        function updateUser(id, newUser) {
            var url = "/api/user/" + id;
            return $http.put(url, newUser);
        }

    }
})();

