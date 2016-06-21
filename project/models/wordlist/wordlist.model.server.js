module.exports = function(){
    var mongoose = require("mongoose");

    var WebsiteSchema = require("./wordlist.schema.server.js")();
    var Website= mongoose.model("Wordlist", WebsiteSchema);

    var api = {
        findWebsiteByID: findWebsiteByID,
        findAllWebsitesForUser: findAllWebsitesForUser,
        createWebsite: createWebsite,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite
    };
    return api;

    function findAllWebsitesForUser(userId){
        return Website.find({"_user": userId});
    }

    function findWebsiteByID(websiteId){
        return Website.findById(websiteId);
    }

    function createWebsite(newWebsite){
        delete newWebsite._id;

        return Website.create(newWebsite);
    }

    function deleteWebsite(websiteId){
        return Website.remove({_id: websiteId});
    }

    function updateWebsite(websiteId , newWebsite){
        delete newWebsite._id;

        return Website
            .update({_id: websiteId},{
                $set: newWebsite
            });
    }
}