// (function () {
//     angular
//         .module("GreAppMaker")
//         .factory("UserService", UserService );
//
//     function UserService($http) {
//
//         var api = {
//
//             login: login,
//             logout: logout,
//             loggedIn : loggedIn,
//             register: register,
//             createUser: createUser,
//             findUserById: findUserById,
//             findUserByUsername: findUserByUsername,
//             findUserByCredentials: findUserByCredentials,
//             updateUser: updateUser,
//             deleteUser: deleteUser
//
//         };
//         return api;
//
//         function loggedIn() {
//             return $http.get("/project/loggedIn");
//         }
//
//         function login(username, password) {
//             var user = {
//                 username: username,
//                 password: password
//             };
//             return $http.post("/project/login", user);
//         }
//
//         function register(username, password) {
//             var user = {
//                 username: username,
//                 password: password
//             };
//             return $http.post("/project/register", user);
//         }
//
//         function logout() {
//             return $http.post("/project/logout");
//         }
//
//         function createUser(newUser) {
//             var newuser = {
//                 //_id: (new Date()).getTime()+"",
//                 username: newUser.username,
//                 password: newUser.password,
//                 firstName:"",
//                 lastName:""
//             };
//             return $http.post("/project/user", newuser);
//         }
//
//         function findUserById(id) {
//             var url = "/project/user/" + id;
//             return $http.get(url);
//         }
//
//         function findUserByUsername(username){
//             var url = "/project/user?username=" + username;
//             return $http.get(url);
//         }
//
//         function findUserByCredentials(username, password) {
//             var url = "/project/user?username=" + username + "&password=" + password ;
//             return $http.get(url);
//         }
//
//         function deleteUser(userId) {
//             var url = "/project/user/" + userId;
//             return $http.delete(url);
//         }
//
//         function updateUser(id, newUser) {
//             var url = "/project/user/" + id;
//             return $http.put(url, newUser);
//         }
//
//     }
// })();
//



(function(){
    angular
        .module("GreAppMaker")
        .factory("UserService", UserService);


    function UserService($http, $rootScope) {
        var api = {
            createUser: createUser,
            findUserByCredentials:findUserByCredentials,
            findUserById:findUserById,
            findUserByUsername : findUserByUsername,
            updateUser:updateUser,
            login:login,
            logout:logout,
            register: register,


            //follow
            addFriend: addFriend,
            findFriends:findFriends,
            findFollowers:findFollowers,
            removeFriend: removeFriend,
            undoNotify:undoNotify,
            findAllUsers: findAllUsers,
            setUser: setUser


        };
        return api;




        // Follow Functions
        // 1.addFriend
        function addFriend(userId,userName,friend){
            return $http.post("/api/project/"+userId+"/follow/"+userName,friend,{headers: {'Content-Type': 'application/json'} });
        }

        // 2.findFriends
        function findFriends(userId){

            return $http.get("/api/project/find/friends/"+userId);
        }

        // 3.findFollowers
        function findFollowers(userId){
            return $http.get("/api/project/find/followers/"+userId);
        }

        // 4.removeFriend
        function removeFriend(userId,fId){
            return $http.delete("/api/project/"+userId+"/friend/"+fId);
        }

        // 5.undoNotify
        function undoNotify(friend){
            return $http.put("/api/project/notify", friend);
        }

        //6. findAllUsers
        function findAllUsers() {
            return $http.get("/api/project/userAll");
        }

        //7. setUser
        function setUser(user){
            $rootScope.currentUser = user;

        }





        function createUser(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/proj/user", user);
        }
        function findUserByCredentials(username, password) {
            var url = "/proj/user?username="+username+"&password="+password;
            return $http.get(url);

        }

        function findUserByUsername(username)
        {
            console.log("Inside findUserByUsername "+username);
            return $http.get("/api/project/user?username="+username);
        }

        function updateUser(id, newUser) {
            var url = "/proj/user/" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/proj/user/" + id;
            return $http.get(url);
        }

        function login(username,password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/proj/login", user);
        }
        function logout() {
            return $http.post("/proj/logout");
        }

        function register(username, password) {
            var user = {
                username: username,
                password: password
            };
            return $http.post("/proj/register", user);
        }
    }
})();