const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thoughtsSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    content: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Thoughts = mongoose.model("Thought", thoughtsSchema);

module.exports = Thoughts;