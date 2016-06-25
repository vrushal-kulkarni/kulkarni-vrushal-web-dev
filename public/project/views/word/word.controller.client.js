
(function () {
    angular
        .module("GreAppMaker")
        .controller("PageListController",PageListController);

    function PageListController($routeParams,PageService, $location, PearsonService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.linkToPageNew = linkToPageNew;

        vm.searchWords = searchWords;
        vm.searchComments =searchComments;

        function  init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .then(function (response) {
                    vm.pages = angular.copy(response.data);
                });
        }
        init();

        function linkToPageNew() {
             $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word/new");
         }


        function searchComments(name) {
            PageService
                .findPageByName(name)
                .then(function (response) {
                   vm.pageList=response.data;

                    // for(var i in vm.pageList){
                    //     console.log(vm.pageList.title);
                    //     if(vm.pageList.title !=null)
                    //         vm.comments=vm.pageList.title;
                    // }
                })
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

                    $location.url("/user/" + vm.userId + "/wordlist/" + vm.websiteId + "/word/" + vm.definition + "/" + vm.word + "/" + vm.example);


                });


        }

    }
})();
