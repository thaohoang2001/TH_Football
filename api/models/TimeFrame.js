import mongoose from 'mongoose';

const timeFrameSchema = new mongoose.Schema({
    TimeFrame: {
        type: String,
    },
});

export default mongoose.model('TimeFrame', timeFrameSchema);