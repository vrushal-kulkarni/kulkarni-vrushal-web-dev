(function(){
    angular
        .module("GreAppMaker")
        .factory("PSPService", PSPService);

    function PSPService($http) {
        var questions = [
            {
                question: "1. If an object travels at five feet per second, how many feet does it travel in one hour?",
                options: ["30", "300", "720", "1800", "18000"],
                answer: 5
            },
            {
                question: "2. What is the average (arithmetic mean) of all the multiples of ten from 10 to 190 inclusive?",
                options: ["90", "95", "100", "105", "110"],
                answer: 2
            },
            {
                question: "3. A cubical block of metal weighs 6 pounds. How much will another cube of the same metal weigh if its sides are twice as long?",
                options: ["48", "32", "24", "18","12"],
                answer: 0
            },
            {
                question: "4. In a class of 78 students 41 are taking French, 22 are taking German. Of the students taking French or German, 9 are taking both courses. How many students are not enrolled in either course?",
                options: ["6", "15", "24", "33", "54"],
                answer: 2
            },
            {
                question: "5. ( √2 - √3 )² =",
                options: ["5 - 2√6", "5 - √6", "1 - 2√6", "1 - √2", "1"],
                answer: 0
            },
            {
                question: "6. Helpers are needed to prepare for the fete. Each helper can make either 2 large cakes or 35 small cakes per hour. The kitchen is available for 3 hours and 20 large cakes and 700 small cakes are needed. How many helpers are required?",
                options: ["10", "15", "20", "25", "30"],
                answer: 0
            },
            {
                question: "7. Jo's collection contains US, Indian and British stamps. If the ratio of US to Indian stamps is 5 to 2 and the ratio of Indian to British stamps is 5 to 1, what is the ratio of US to British stamps?",
                options: ["5 : 1", "10 : 5 ", "15 : 2 ", "20 : 2 ", "25 : 2"],
                answer: 4
            },
            {
                question: "8.  A 3 by 4 rectangle is inscribed in circle. What is the circumference of the circle?",
                options: ["2.5π", "3π", "5π", "4π", "10π"],
                answer: 2
            },
            {
                question: "9. Two sets of 4 consecutive positive integers have exactly one integer in common. The sum of the integers in the set with greater numbers is how much greater than the sum of the integers in the other set?",
                options: ["4", "7", "8", "12", "it cannot be determined from the information given."],
                answer: 3
            },
            {
                question: "10. A circular logo is enlarged to fit the lid of a jar. The new diameter is 50 per cent larger than the original. By what percentage has the area of the logo increased?",
                options: ["50", "80", "100", "125", "250"],
                answer: 3
            }
        ];

        var api = {

            getQuestion:getQuestion,
            // submit:submit
        };
        return api;

        // function getQuestion(id) {
        //     var url = "/api/psp/" + id;
        //     return $http.get(url);
        // }

        // function submit(score) {
        //     return $http.post("/vru",score);
        // }
        //
        function getQuestion(id) {
            if(id < questions.length) {
                return questions[id];
            } else {
                return false;
            }
        }

        // return {
        //     getQuestion: function(id) {
        //         if(id < questions.length) {
        //             return questions[id];
        //         } else {
        //             return false;
        //         }
        //     }
        // };

    }
})();