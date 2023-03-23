import mongoose from 'mongoose';

const orderTimeSchema = new mongoose.Schema({
    startOrderTime: {
        type: Date,
    },
    endOrderTime: {
        type: Date,
    },
    
},
    {timestamps: true}
);

export default mongoose.model('OrderTime', orderTimeSchema);