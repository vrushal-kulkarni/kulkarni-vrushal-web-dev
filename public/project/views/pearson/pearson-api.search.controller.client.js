(function(){
    angular
        .module("GreAppMaker")
        .controller("PearsonWordSearchController", PearsonWordSearchController);

    function PearsonWordSearchController($routeParams,$location,PearsonService) {
        var vm = this;

        vm.searchWords = searchWords;

        function searchWords(searchText) {
            PearsonService
                 .searchWords(searchText)
                 .then(function(response){
                     console.log(response);

                     data=response.data;
                     word=searchText;

                     for(var i=0;i<=response.data.results.length;i++)
                     {
                         definition=response.data.results[i].senses[0].definition;

                         if(definition)
                         {
                             break;
                         }
                     }
                     if(definition instanceof  Array)
                     {
                         definition=definition[0];
                     }


                     for(var i=0;i<=response.data.results.length;i++)
                     {

                         if((response.data.results[i].senses instanceof Array) && (response.data.results[i].senses[0].hasOwnProperty('examples')) )
                         {
                             example=response.data.results[i].senses[0].examples[0].text;
                             console.log(example);
                             break;
                         }
                     }


                     vm.definition=definition;
                     vm.word=word;
                     vm.example=example;


                     $(document).ready(function() {
                         $('.flashcard').on('click', function() {
                             $('.flashcard').toggleClass('flipped');
                         });
                     });

                 });
        }
        
    }
})();