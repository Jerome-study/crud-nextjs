import { Schema } from "mongoose";
import mongoose from "mongoose";

const topicSchema = new Schema({
    topicTitle: {
        type: String,
        required: true
    },
    topicDescription: {
        type: String,
        required: true
    }
}, { timestamps: true});



const Topic = mongoose.models.topics  ||  mongoose.model("topics", topicSchema)

export default Topic