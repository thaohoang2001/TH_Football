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
    payment_intent: {
      type: String,
      // required: true,
    },
  },
);

export default mongoose.model("Order", OrderSchema);