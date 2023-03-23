import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    staffId: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    readByStaff: {
        type: Boolean,
        // required: true,
    },
    readByCustomer: {
        type: Boolean,
        required: true,
    },
    lastMessage: {
        type: String,
        required: false,
    },

},
    { timestamps: true }
);

export default mongoose.model('Conversation', ConversationSchema);