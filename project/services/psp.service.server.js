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
