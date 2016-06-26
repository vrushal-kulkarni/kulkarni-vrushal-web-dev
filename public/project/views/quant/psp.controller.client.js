(function(){
    angular
        .module("GreAppMaker")
        .controller("PSPController", PSPController);

    function PSPController(PSPService, $routeParams) {
        var vm = this;

        vm.userId = $routeParams.userId;

        vm.start=start;
        vm.reset=reset;
        vm.getQuestion=getQuestion;
        vm.checkAnswer=checkAnswer;
        vm.nextQuestion=nextQuestion;

        // vm.submit=submit;
        //
        // function  submit(score) {
        //     PSPService
        //         .submit(score)
        //         .then(function (response) {
        //                 var score = response.data;
        //
        //                 console.log("Score sumbitted"+score);  ///
        //
        //         },
        //         function (err) {
        //             vm.error=err.data;
        //         })
        // }

            function start() {
                vm.id = 0;
                vm.quizOver = false;
                vm.inProgress = true;
                vm.getQuestion();
            };

            function reset() {
                vm.inProgress = false;
                vm.score = 0;
            }

            function getQuestion() {
                var q = PSPService.getQuestion(vm.id);
                if(q) {
                    vm.question = q.question;
                    vm.options = q.options;
                    vm.answer = q.answer;
                    vm.answerMode = true;
                } else {
                    vm.quizOver = true;
                }
            };

            function checkAnswer() {
                if(!$('input[name=answer]:checked').length) return;

                var ans = $('input[name=answer]:checked').val();

                if(ans == vm.options[vm.answer]) {
                    vm.score++;
                    vm.correctAns = true;
                } else {
                    vm.correctAns = false;
                }

                vm.answerMode = false;
            };

            function nextQuestion() {
                vm.id++;
                vm.getQuestion();
            }

            vm.reset();


    }
})();