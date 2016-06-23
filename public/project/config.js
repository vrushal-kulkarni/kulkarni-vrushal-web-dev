(function () {
    angular
        .module("GreAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage.view.client.html",
                controller: "PearsonWordSearchController",
                controllerAs: "model"
            })
            .when("/homepage", {
                templateUrl: "views/homepage.view.client.html",
                controller: "PearsonWordSearchController",
                controllerAs: "model"
            })
            .when("/pearson", {
                templateUrl: "views/pearson/pearson-api.search.view.client.html",
                controller: "PearsonWordSearchController",
                controllerAs: "model"
            })
            .when("/testimonials", {
                templateUrl: "views/general/testimonials.view.client.html",
            })
            .when("/about", {
                templateUrl: "views/general/about.view.client.html",
            })
            .when("/contact", {
                templateUrl: "views/general/contact.view.client.html",
            })
            .when("/verbal", {
                templateUrl: "views/verbal/verbal.view.client.html",
            })
            .when("/quant", {
                templateUrl: "views/quant/quant.view.client.html",
            })
            .when("/awa", {
                templateUrl: "views/awa/awa.view.client.html",
            })
            .when("/practicetest", {
                templateUrl: "views/general/practicetest.view.client.html",
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            // .when("/user/:userId/profile" , {
            //     templateUrl:"views/user/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model",
            // })
            .when("/user/:userId", {
                templateUrl: "views/user/new-user-homepage.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: { loggedin: checkLoggedin }
            })
            // .when("/profile-homepage" , {
            //     templateUrl: "views/user/new-user-homepage.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model",
            //     resolve: {
            //         loggedIn: checkLoggedIn
            //     }
            // })
            .when("/user/:userId/wordlist", {
                templateUrl: "views/wordlist/wordlist.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/new", {
                templateUrl: "views/wordlist/wordlist-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/:websiteId", {
                templateUrl: "views/wordlist/wordlist-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/:websiteId/word", {
                templateUrl: "views/word/word.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/:websiteId/word/new", {
                templateUrl: "views/word/pearson-api-user.search.view.client.html",
                controller: "PearsonSearchController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/:websiteId/word/:definition/:word/:example", {
                templateUrl: "views/word/flashcard.view.client.html",
                controller: "FlashCardController",
                controllerAs: "model"
            })
            .when("/user/:userId/wordlist/:websiteId/word/:pageId", {
                templateUrl: "views/word/word-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/ps", {
                templateUrl: "views/quant/ps.view.client.html",
            })
            .when("/ne", {
                templateUrl: "views/quant/ne.view.client.html",
            })
            .when("/qc", {
                templateUrl: "views/quant/qc.view.client.html",
            })
            .when("/se", {
                templateUrl: "views/verbal/se.view.client.html",
            })
            .when("/tc", {
                templateUrl: "views/verbal/tc.view.client.html",
            })
            .when("/rc", {
                templateUrl: "views/verbal/rc.view.client.html",
            })
            .when("/issue", {
                templateUrl: "views/awa/issue.view.client.html",
            })
            .when("/argument", {
                templateUrl: "views/awa/argument.view.client.html",
            })
            .when("/psp", {
                templateUrl: "views/quant/psp.view.client.html",
                controller: "PSPController",
                controllerAs: "model"
            })
            .when("/rcp", {
                templateUrl: "views/verbal/rcp.view.client.html",
                controller: "RCPController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/homepage"
            });

        // function checkLoggedIn(UserService, $location, $q, $rootScope) {
        //
        //     var deferred = $q.defer();
        //
        //     UserService
        //         .loggedIn()
        //         .then(
        //             function(response) {
        //                 var user = response.data;
        //                 console.log("Hello"+user);
        //                 if(user == '0') {
        //                     $rootScope.currentUser = null;
        //                     deferred.reject();
        //                     $location.url("/login");
        //                 } else {
        //                     $rootScope.currentUser = user;
        //                     deferred.resolve();
        //                 }
        //             },
        //             function(err) {
        //                 $location.url("/login");
        //             }
        //         );
        //
        //     return deferred.promise;
        // }

        function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/proj/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    $rootScope.currentUser=null;
                    deferred.reject();
                    $location.url('/');
                }
            });
            return deferred.promise;
        }

    }
})();