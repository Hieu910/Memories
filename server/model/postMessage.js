import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    
},{timestamps: true}) 

export const PostMessage = mongoose.model("postmessages",schema)