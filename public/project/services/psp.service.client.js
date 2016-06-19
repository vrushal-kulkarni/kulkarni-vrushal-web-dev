(function(){
    angular
        .module("GreAppMaker")
        .factory("PSPService", PSPService);

    function PSPService() {
        var questions = [
            {
                question: "1. Of the following, which is greater than ½ ?Indicate ALL such fractions.",
                options: ["2/5", "4/7", "4/9", "5/11", "6/13", "8/15", "9/17"],
                answer: 2
            },
            {
                question: "When did the second world war end?",
                options: ["1945", "1939", "1944", "1942"],
                answer: 0
            },
            {
                question: "Which was the first country to issue paper currency?",
                options: ["USA", "France", "Italy", "China"],
                answer: 3
            },
            {
                question: "Which city hosted the 1996 Summer Olympics?",
                options: ["Atlanta", "Sydney", "Athens", "Beijing"],
                answer: 0
            },
            {
                question: "Who invented telephone?",
                options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
                answer: 1
            }
        ];

        // var api = {
        //
        //     getQuestion:getQuestion
        // };
        // return api;
        //
        // function getQuestion(id) {
        //     var url = "/api/psp/" + id;
        //     return $http.get(url);
        // }

        return {
            getQuestion: function(id) {
                if(id < questions.length) {
                    return questions[id];
                } else {
                    return false;
                }
            }
        };

    }
})();