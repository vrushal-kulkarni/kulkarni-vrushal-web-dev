(function(){
    angular
        .module("GreAppMaker")
        .factory("PearsonService", PearsonService);
    

    var key= "41qHzuGLY9YEr8F6zmvN7FWQOanqUQzV";
    var urlBase= "http://api.pearson.com/v2/dictionaries/entries?headword=TEXT&format=json&apikey=API_KEY";

    function PearsonService($http) {
        var api = {
            searchWords: searchWords
        };
        return api;

        function searchWords(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();