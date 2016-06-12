module.exports = function(){
    var mongoose = require("mongoose");

    var PageSchema = require("./page.schema.server.js")();
    var Page= mongoose.model("Page", PageSchema);

    var api = {
        findPageByID: findPageByID,
        findAllPagesForWebsite: findAllPagesForWebsite,
        createPage: createPage,
        deletePage: deletePage,
        updatePage: updatePage
    };
    return api;

    function findPageByID(pageId){
        return Page.findById(pageId);
    }

    function findAllPagesForWebsite(websiteId){
        return Page.find({"_website": websiteId});
    }

    function createPage(newPage){
        delete newPage._id;

        return Page.create(newPage);
    }

    function deletePage(pageId){
        return Page.remove({_id: pageId});
    }

    function updatePage(pageId , newPage){
        delete newPage._id;

        return Page
            .update({_id: pageId},{
                $set: newPage
            });
    }
}