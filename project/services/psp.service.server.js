// module.exports = function (app, models) {
//
//     var questionModel = models.questionModel;
//
//
//     app.get("/api/psp/:qId", getQuestion);
//
//
//     function getQuestion(req,res) {
//         var qId=req.params.qId;
//         questionModel
//             .getQuestion(qId)
//             .then(function (question) {
//                 res.send(question);
//             },function (error) {
//                 res.status(400).send(error);
//             });
//
//     }
//
//
//     // function findUserById(req, res) {
//     //     var userId = req.params.userId;
//     //     userModel
//     //         .findUserByID(userId)
//     //         .then(function(user) {
//     //             res.send(user);
//     //         },function(error) {
//     //             res.status(400).send(error);
//     //         });
//     //
//     // }
//
// }
//
//
//
//

// module.exports=function (app,models ) {
//     var qModel=models.questionModel;
//
//     app.post("/vru", createScore);
//
//     function createScore(req, res) {
//         var score=req.body.score;
//
//         qModel
//             .createScore(score)
//             .then(
//             function(score) {
//                 console.log("Score is:"+score);
//                 res.json(score);
//             },
//             function(error) {
//                 console.log("in error boy");
//                 res.statusCode(400).send(error);
//             }
//         )
//     }
//
// }