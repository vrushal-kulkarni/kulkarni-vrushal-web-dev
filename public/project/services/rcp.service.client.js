(function(){
    angular
        .module("GreAppMaker")
        .factory("RCPService", RCPService);

    function RCPService() {
        var questions = [
            {
                question: "1. With his sub-four minute mile Bannister broke a psychological barrier, and inspired thousands of others to attempt to overcome seemingly ____ hurdles.",
                options: ["insurmountable ", "inane ", "trivial ", "traumatic ", "ineffable"],
                answer: 0
            },
            {
                question: "2. The game of chess is an example of a ___ information system: the pieces sit inertly on the board until the players move them according to known rules.",
                options: ["interactive ", "passive ", "cybernetic ", "disruptive ", "logistic"],
                answer: 1
            },
            {
                question: "3.  An artist’s preliminary sketches are often a ____of a subject; on the basis of these sketches the artist makes a decision on his or her approach to the final painting.",
                options: ["reconnaissance ", "caricature ", "vignette ", "pastiche ", "cameo"],
                answer: 0
            },
            {
                question: "4. Taking antibiotics for a viral infection may, it is true, be ____ ; however, in certain cases a course of these drugs can actually ward off opportunistic bacterial infections.",
                options: ["justified ", "enough ", "recommended ", "ineffective ", "curative"],
                answer: 3
            },
            {
                question: "5. The revolution in art has not lost its steam; it ____ on as fiercely as ever.",
                options: ["trudges ", "meanders ", "edges ", "ambles ", "rages"],
                answer: 4
            },
            {
                question: "6. Each occupation has its own ____ ; bankers, lawyers and computer professionals, for example, all use among themselves language which outsiders have difficulty following.",
                options: ["merits ", "disadvantages ", "rewards ", "jargon ", "problems"],
                answer: 3
            },
            {
                question: "7. All good comic writers use humor to ____, not to side-step the problems of human behavior.",
                options: ["amuse ", "avert ", "juxtapose ", "confront ", "solve"],
                answer: 3
            },
            {
                question: "8.  ____ by nature, Jones spoke very little even to his own family members.",
                options: ["garrulous ", "equivocal ", "taciturn ", "arrogant ", "gregarious"],
                answer: 2
            },
            {
                question: "9. Many people at that time believed that spices help preserve food; however, Hall found that many marketed spices were ____ bacteria, moulds and yeasts.",
                options: ["devoid of", " teeming with ", "improved by", "destroyed by ", "active against"],
                answer: 1
            },
            {
                question: "10. In a fit of ____ she threw out the valuable statue simply because it had belonged to her ex-husband.",
                options: ["pique ", "goodwill ", "contrition ", "pedantry ", "prudence"],
                answer: 0
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