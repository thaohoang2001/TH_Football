import mongoose from "mongoose";
const ChildPitchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
     
    },
    price: {
      type: Number,
     
    },
    maxPeople: {
      type: Number,
      
    },
    desc: {
      type: String,
     
    },
    pitchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pitch',
    },
    childPitchNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("childPitch", ChildPitchSchema);