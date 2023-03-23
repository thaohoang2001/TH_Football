import mongoose from 'mongoose';

const MatchingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    pitchId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

});

export default mongoose.model('Matching', MatchingSchema);