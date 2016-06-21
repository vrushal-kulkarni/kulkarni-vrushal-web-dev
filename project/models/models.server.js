
module.exports = function(){

    var models = {
        usersModel: require("./user/user.model.server.js")(),
        wordlistModel: require("./wordlist/wordlist.model.server.js")(),
        wordModel: require("./word/word.model.server.js")()
       // widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};