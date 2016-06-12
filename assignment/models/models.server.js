
module.exports = function(){

    var mongoose = require("mongoose");

    mongoose.connect('mongodb://localhost/cs5610summer1');

    var models = {
        userModel: require("./user/user.model.server.js")(),
        websiteModel: require("./website/website.model.server.js")(),
        pageModel: require("./page/page.model.server.js")(),
        widgetModel: require("./widget/widget.model.server.js")()
    };
    return models;
};