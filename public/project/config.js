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
            .when("/user/:userId/verbal", {
                templateUrl: "views/verbal/verbal.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/quant", {
                templateUrl: "views/quant/quant.view.client.html",
            })
            .when("/user/:userId/quant", {
                templateUrl: "views/quant/quant.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/awa", {
                templateUrl: "views/awa/awa.view.client.html",
            })
            .when("/user/:userId/awa", {
                templateUrl: "views/awa/awa.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
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
            .when('/admin', {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .when("/user/:userId/profile" , {
                templateUrl:"views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })

            .when("/user/:userId", {
                templateUrl: "views/user/new-user-homepage.view.client.html",
                controller:"ProfileController",
                controllerAs: "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })

            .when("/user/:userId/social", {
                templateUrl: "views/user/followers.view.client.html",
                controller: "FindController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/users/profile/:username",{
                templateUrl:"views/user/profile-read-only.view.client.html",
                controller:"StaticProfileController",
                controllerAs:"model",
                resolve:{
                    checkLoggedIn : checkLoggedin
                }
            })
            .when("/user/:userId/wordlist", {
                templateUrl: "views/wordlist/wordlist.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/new", {
                templateUrl: "views/wordlist/wordlist-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/:websiteId", {
                templateUrl: "views/wordlist/wordlist-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/:websiteId/word", {
                templateUrl: "views/word/word.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/:websiteId/word/new", {
                templateUrl: "views/word/pearson-api-user.search.view.client.html",
                controller: "PearsonSearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/:websiteId/word/:definition/:word/:example", {
                templateUrl: "views/word/flashcard.view.client.html",
                controller: "FlashCardController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/wordlist/:websiteId/word/:pageId", {
                templateUrl: "views/word/word-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/ps", {
                templateUrl: "views/quant/ps.view.client.html",
            })
            .when("/user/:userId/quant/ps", {
                templateUrl: "views/quant/ps.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/ne", {
                templateUrl: "views/quant/ne.view.client.html",
            })
            .when("/user/:userId/quant/ne", {
                templateUrl: "views/quant/ne.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/qc", {
                templateUrl: "views/quant/qc.view.client.html",
            })
            .when("/user/:userId/quant/qc", {
                templateUrl: "views/quant/qc.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/se", {
                templateUrl: "views/verbal/se.view.client.html",
            })
            .when("/user/:userId/verbal/se", {
                templateUrl: "views/verbal/se.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/tc", {
                templateUrl: "views/verbal/tc.view.client.html",
            })
            .when("/user/:userId/verbal/tc", {
                templateUrl: "views/verbal/tc.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/rc", {
                templateUrl: "views/verbal/rc.view.client.html",
            })
            .when("/user/:userId/verbal/rc", {
                templateUrl: "views/verbal/rc.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: { checkLoggedIn: checkLoggedin }
            })
            .when("/issue", {
                templateUrl: "views/awa/issue.view.client.html",
            })
            .when("/user/:userId/awa/issue", {
                templateUrl: "views/awa/issue.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/awa/argument", {
                templateUrl: "views/awa/argument.user.view.client.html",
                controller: "ProfileController",
                controllerAs : "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/psp", {
                templateUrl: "views/quant/psp.user.view.client.html",
                controller: "PSPController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
            })
            .when("/user/:userId/rcp", {
                templateUrl: "views/verbal/rcp.user.view.client.html",
                controller: "RCPController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedin
                }
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


        function checkAdmin($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/proj/loggedin').success(function(user)
            {
                // console.log(user[0]);
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            });

            return deferred.promise;
        }

        var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
        {
            var deferred = $q.defer();

            $http.get('/proj/loggedin').success(function(user)
            {
                $rootScope.errorMessage = null;
                // User is Authenticated
                if (user !== '0')
                {
                    $rootScope.currentUser = user[0];
                }
                deferred.resolve();
            });

            return deferred.promise;
        };


    }
})();