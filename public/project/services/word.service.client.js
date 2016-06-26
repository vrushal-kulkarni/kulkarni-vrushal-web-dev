(function () {
    angular
        .module("GreAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            // findPageByName:findPageByName
        };
        return api;


        // function findPageByName(name) {
        //     var url="/project/word/" + name;
        //     return $http.get(url);
        // }

        function createPage(websiteId, page) {
            var url = "/project/wordlist/:websiteId/word" ;
            return $http.post(url , page);

        }

        function findPageByWebsiteId(websiteId) {
            var url = "/project/wordlist/" + websiteId + "/word";
            return $http.get(url);
        }

        function findPageById(pageId) {
            var url = "/project/word/" + pageId;
            return $http.get(url);
        }

        function deletePage(pageId) {
            var url = "/project/word/" + pageId;
            return $http.delete(url);
        }

        function updatePage(pageId, page) {
            var url = "/project/word/" + pageId;
            return $http.put(url, page);
        }
    }

})();
