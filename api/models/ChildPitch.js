import mongoose from 'mongoose';

const childPitchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    // orderTime: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'orderTime',
    // }],

    childPitchNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],

},
    { timestamps: true }
);



export default mongoose.model('ChildPitch', childPitchSchema);