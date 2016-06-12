module.exports = function () {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        name: {type: String, required: true},
        type: {type: String, enum: ['HEADING','IMAGE','YOUTUBE','HTML','INPUT']},
        _page: {type: mongoose.Schema.ObjectId, ref:"Page"},
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    },{collection: "assignment.widget"});

    return WidgetSchema;
};