(function(){
    angular
        .module("GreAppMaker")
        .controller("PearsonSearchController", PearsonSearchController);

    function PearsonSearchController($routeParams,$location,PearsonService, PageService, $rootScope, UserService) {
        var vm = this;

        vm.searchWords = searchWords;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;


        // vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        vm.createPage = createPage;

        function createPage(name) {
            if (name) {
                var newPage = {
                    //_id: (new Date()).getTime()+"",
                    name: name,
                    _website: vm.websiteId
                };
                PageService
                    .createPage(vm.websiteId, newPage)
                    .then(function (response) {
                        var page = response.data;
                        if (page) {
                            $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word");
                        }
                        else {
                            vm.error = "Unable to create page";
                        }
                    });
            }
            else {
                vm.error = "Page Name is Required";
            }
        }


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