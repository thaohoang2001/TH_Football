import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    matchingId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    star: {
        type: Number,
        required: true,
    },

});

export default mongoose.model('Comment', CommentSchema);