
module.exports = function(){

    var models = {
        projUserModel: require("./user/user.model.server.js")(),
        // usersModel: require("./user/user.model.server.js")(),
        wordlistModel: require("./wordlist/wordlist.model.server.js")(),
        wordModel: require("./word/word.model.server.js")(),
        // questionModel : require("./question/question.model.server.js")()
       // widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};