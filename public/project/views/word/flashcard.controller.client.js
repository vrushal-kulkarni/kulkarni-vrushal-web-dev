(function () {
    angular
        .module("GreAppMaker")
        .controller("FlashCardController", FlashCardController);

    function  FlashCardController($routeParams, $location) {

        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.definition=$routeParams.definition;
        vm.word=$routeParams.word;
        vm.example=$routeParams.example;


        $(document).ready(function() {
            $('.flashcard').on('click', function() {
                $('.flashcard').toggleClass('flipped');
            });
        });

    }

})();
