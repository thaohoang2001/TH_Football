import mongoose, { Schema } from 'mongoose';

const OrderMatchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    userIdMatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    childPitchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'childPitch',
    },
    timeFrame: {
        type: String,
        required: true,
    },
    findMatch: {
        type: Boolean,
        default:false,
    },
});

export default mongoose.model('OrderMatch', OrderMatchSchema);