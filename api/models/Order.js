import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    orderMatchId: {
      type: String,
    },
    childPitchId: {
      type: String,
    },
    userId: {
      type: String,
    },
    userIdMatch: {
      type: String,
    },
    nameChildPitchOrder: {
      type: String,
    },
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    TimeFrame: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    findMatch: {
      type: Boolean,
    },
    payment_intent: {
      type: String,
    },
  },
);

export default mongoose.model("Order", OrderSchema);