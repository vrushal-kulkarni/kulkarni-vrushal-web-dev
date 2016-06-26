(function () {
    angular
        .module("GreAppMaker")
        .controller("FlashCardController", FlashCardController);

    function  FlashCardController($routeParams, $rootScope, UserService) {

        var vm = this;
        // vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.userId = $rootScope.currentUser._id;
        vm.logout=logout;
        vm.name=$rootScope.currentUser.username;

        vm.definition=$routeParams.definition;
        vm.word=$routeParams.word;
        vm.example=$routeParams.example;


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

        $(document).ready(function() {
            $('.flashcard').on('click', function() {
                $('.flashcard').toggleClass('flipped');
            });
        });

    }

})();
