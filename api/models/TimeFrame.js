import mongoose from 'mongoose';

const timeFrameSchema = new mongoose.Schema({
    TimeFrame: {
        type: Date,
    },
    
});

export default mongoose.model('TimeFrame', timeFrameSchema);