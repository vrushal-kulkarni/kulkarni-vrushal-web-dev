(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams,$location,WidgetService,FlickrService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;


        //{"status":200,"offset":0,"limit":10,"count":5,"total":5,"url":"/v2/dictionaries/entries?headword=abash","results":[{"datasets":["laad3","dictionary","sandbox"],"headword":"abashed","id":"cs1s2RaDGg","part_of_speech":"adjective","senses":[{"definition":"embarrassed or ashamed because you have done something wrong or stupid","examples":[{"text":"Both girls looked down, abashed."}]}],"url":"/v2/dictionaries/entries/cs1s2RaDGg"},{"datasets":["ldec","dictionary","sandbox"],"headword":"abashed","id":"cqAHmcjENN","part_of_speech":"adjective","senses":[{"translation":"羞愧的，窘迫的，尷尬的"}],"url":"/v2/dictionaries/entries/cqAHmcjENN"},{"datasets":["ldoce5","dictionary","sandbox"],"headword":"abashed","id":"cqAEvSD9RB","part_of_speech":"adjective","pronunciations":[{"audio":[{"lang":"British English","type":"pronunciation","url":"/v2/dictionaries/assets/ldoce/gb_pron/brelasdeabashed.mp3"},{"lang":"American English","type":"pronunciation","url":"/v2/dictionaries/assets/ldoce/us_pron/abashed.mp3"}],"ipa":"əˈbæʃt"}],"senses":[{"definition":["embarrassed or ashamed because you have done something wrong or stupid"],"examples":[{"audio":[{"type":"example","url":"/v2/dictionaries/assets/ldoce/exa_pron/p008-000786254.mp3"}],"text":"She looked rather abashed."}],"synonym":"shamefaced"}],"url":"/v2/dictionaries/entries/cqAEvSD9RB"},{"datasets":["laes","dictionary","sandbox"],"headword":"abashed","id":"csTMc6kgS0","part_of_speech":"adjective","pronunciations":[{"ipa":"əˈbæʆt"}],"senses":[{"definition":["embarrassed or ashamed, especially because you have done something wrong or stupid or someone has asked you about something embarrassing"],"lexical_box":[{"lexical_unit":"be abashed","senses":[{"translations":[{"example":[{"text":"He was not abashed by her request."}],"text":["avergonzarse"]}]}]}],"translations":[{"example":[{"text":"Harriet looked slightly abashed.","translation":{"text":["Harriet parecía algo avergonzada."]}}],"text":["avergonzado -a"]}]}],"url":"/v2/dictionaries/entries/csTMc6kgS0"},{"datasets":["lasde","dictionary","sandbox"],"headword":"abashed","id":"cqAFcFz3nq","part_of_speech":"adjective","pronunciations":[{"ipa":"əˈbæʃt"}],"senses":[{"definition":["embarrassed or ashamed"],"examples":[{"text":"They both looked slightly abashed."}]}],"url":"/v2/dictionaries/entries/cqAFcFz3nq"}]}




        vm.searchPhotos = searchPhotos;
        //vm.selectPhoto = selectPhoto;

        // function searchPhotos(searchText) {
        //     FlickrService
        //         .searchPhotos(searchText)
        //         .then(function(response){
        //             data = response.data.replace("jsonFlickrApi(","");
        //             data = data.substring(0,data.length - 1);
        //             data = JSON.parse(data);
        //             vm.photos = data.photos;
        //         });
        // }

        function searchPhotos(searchText) {
            FlickrService
                 .searchPhotos(searchText)
                 .then(function(response){
                     //console.log(response);

                     data=response.data;
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

                     //definition=response.data.results[0].senses[0].definition;
                    // example=response.data.results[0].senses[0].examples[0].text;
                     // synonym=response.data.results[2].senses[0].synonym;

                     //         data = response.data.replace("jsonFlickrApi(","");
            //         data = data.substring(0,data.length - 1);
                     //data=response.results();
                     console.log(data);
                     console.log(definition);
                     vm.photos=definition;

                     //console.log(data);
                     //console.log(data);

                     // data = JSON.parse(data);
                     // vm.photos = data.photos;
                 });
        }


        // function selectPhoto(photo) {
        //     var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        //     url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        //     WidgetService
        //         .findWidgetById(vm.widgetId)
        //         .then(function(response){
        //             vm.widget = response.data;
        //             vm.widget.url = url;
        //             WidgetService
        //                 .updateWidget(vm.widgetId, vm.widget)
        //                 .then(function(){
        //                     $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
        //                 });
        //         });
        // }

    }
})();