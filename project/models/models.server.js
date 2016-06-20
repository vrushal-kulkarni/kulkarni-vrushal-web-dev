
module.exports = function(){

    var models = {
        usersModel: require("./user/user.model.server.js")(),
        //websiteModel: require("./website/website.model.server.js")(),
        //pageModel: require("./page/page.model.server.js")(),
       // widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};