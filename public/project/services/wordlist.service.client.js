(function(){
    angular
        .module("GreAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite,
        };
        return api;

        function deleteWebsite(websiteId) {
            var url = "/project/wordlist/" + websiteId;
            return $http.delete(url);
        }

        function createWebsite(userId, newWebsite) {
            var url = "/project/user/" + userId + "/wordlist";
            return $http.post(url,newWebsite);
        }

        function  findWebsitesByUser(userId) {
            console.log("Inside client");
            var url = "/project/user/" + userId + "/wordlist";
            return $http.get(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/project/wordlist/" + websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website) {
            var url = "/project/wordlist/" + websiteId;
            return $http.put(url, website);
        }
    }
})();