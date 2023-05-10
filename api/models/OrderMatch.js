import mongoose, { Schema } from 'mongoose';

const OrderMatchSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true,
    },
    userName: {
        type: String,
        ref: 'user',
    },
    userImage: {
        type: String,
        ref: 'user',
    },
    userIdMatch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    userNameMatch: {
        type: String,
        ref: 'user',
    },
    userMatchImage: {
        type: String,
        ref: 'user',
    },
    childPitchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'childPitch',
    },
    childPitchName: {
        type: String,
        ref: 'childPitch',
    },
    dateChildPitch: {
        type: Date,
    },
    priceChildPitch: {
        type: Number,
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