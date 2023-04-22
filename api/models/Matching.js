import mongoose from 'mongoose';

const MatchingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userIdMatch: {
        type: String,
        required: true,
    },
    pitchId: {
        type: String,
        required: true,
    },
    createDateAt: {
        type: String,
        required: true,
    },
    timeFR: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    
});

export default mongoose.model('Matching', MatchingSchema);