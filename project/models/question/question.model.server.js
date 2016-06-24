// module.exports = function(){
//     var mongoose = require("mongoose");
//
//     var QuestionSchema = require("./question.schema.server")();
//     var Question= mongoose.model("Question", QuestionSchema);
//
//     var api = {
//         createScore:createScore
//     };
//     return api;
//
//
//     function createScore(score){
//         return Question.create(score);
//     }
//
// }