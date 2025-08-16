import mongoose from "mongoose";

//Schemmas are created for thread Section 

// Creating Message Schemma 
const MessageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now 
    }
});


// Creating The Thread Schemma 
const ThreadSchema = new mongoose.Schema({
    threadId: {
        type:String,
        required: true,
        unique : true
    },
    title: {
        type: String,
        default: "New Chat",
    },
    messages: [MessageSchema],
    CreatedAt: {
        type: Date,
        default: Date.now
    },
    UpdatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Thread", ThreadSchema);