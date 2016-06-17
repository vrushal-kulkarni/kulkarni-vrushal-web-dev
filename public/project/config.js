(function () {
    angular
        .module("GreAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/homepage.view.client.html",
            })
            .when("/homepage", {
                templateUrl: "views/homepage.view.client.html",
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
            .when("/greinfo", {
                templateUrl: "views/general/greinfo.view.client.html",
            })
            .when("/practicetest", {
                templateUrl: "views/general/practicetest.view.client.html",
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
            })
            .when("/profile", {
                templateUrl: "views/user/profile.view.client.html",
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
            .when("/nep", {
                templateUrl: "views/quant/nep.view.client.html",
            })
            .when("/psp", {
                templateUrl: "views/quant/psp.view.client.html",
            })
            .when("/qcp", {
                templateUrl: "views/quant/qcp.view.client.html",
            })
            .when("/rcp", {
                templateUrl: "views/verbal/rcp.view.client.html",
            })
            .when("/sep", {
                templateUrl: "views/verbal/sep.view.client.html",
            })
            .when("/tcp", {
                templateUrl: "views/verbal/tcp.view.client.html",
            })
            .otherwise({
                redirectTo: "/homepage"
            });

    }
})();