(function(){
    angular
        .module("GreAppMaker")
        .factory("PearsonService", PearsonService);

    // var key = "88fa5b9bda22484c150501fd5ef08bc8";
    // var secret = "899f387ddf967816";
    // var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


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