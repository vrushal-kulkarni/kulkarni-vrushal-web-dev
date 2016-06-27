

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
            updateUserByUserId:updateUserByUserId,
            deleteUserById: deleteUserById,
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

        function updateUserByUserId(id, newUser) {
            var url = "/proj/user/update" + id;
            return $http.put(url, newUser);
        }

        function findUserById(id) {
            var url = "/proj/user/" + id;
            return $http.get(url);
        }


        function deleteUserById(userId) {
            return $http.delete('/api/project/user/' + userId);
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

        function register(username, password, firstName, lastName, email) {
            var user = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            };
            return $http.post("/proj/register", user);
        }
    }
})();