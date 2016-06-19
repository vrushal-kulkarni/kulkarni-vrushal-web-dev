// module.exports = function(){
//     var mongoose = require("mongoose");
//
//     var QuestionSchema = require("./question.schema.server")();
//     var Question= mongoose.model("Question", QuestionSchema);
//
//     var api = {
//         getQuestion: getQuestion
//     };
//     return api;
//
//
//     function getQuestion(qId){
//         return Question.findById({_id: qId});
//     }
//
// }