(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService );

    function UserService($http) {

        var api = {

            login: login,
            logout: logout,
            loggedIn : loggedIn,
            register: register,
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,

        };
        return api;

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function login(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/login", user);
        }

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/api/register", user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

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

