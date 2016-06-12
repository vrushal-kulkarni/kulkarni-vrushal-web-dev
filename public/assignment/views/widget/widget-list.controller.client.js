(function (){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $location, WidgetService, $sce) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.pageId = $routeParams.pageId;
        vm.websiteId = $routeParams.websiteId;

        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;
        vm.linkToPageList = linkToPageList;
        vm.linktoWidgetChooser = linktoWidgetChooser;

        vm.dragWidget = dragWidget;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function(response){
                        vm.widgets = angular.copy(response.data);
                    },
                    function(response){
                        vm.error = "Unable to find widgets";
                    });
        }
        init();

        function dragWidget(start,end){
            console.log(start+" "+end);
            WidgetService
                .dragWidget(vm.pageId,start,end)
                .then(
                    function(response){
                        init();
                    },
                    function(response){
                        vm.error = "Unable to sort widgets";
                    });
        }


        function  getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function  getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function linkToPageList(){
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function linktoWidgetChooser() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
        }
    }

})();