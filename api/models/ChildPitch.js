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
    DateChildPitch: {
      type: Date,
    },
    // timeFrame: {
    //   type: [String
    //     {
    //       khung time,
    //       slot: [
    //         doi 1, doi 2 
    //       ]
    //       status: 1
    //     }
    //     khugng time, 
    //     slot: [
    //       doi 1
    //     ]
    //     khugng time, 
    //     slot: [
    //     ]
    //   ],
    // },
    pitchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'pitch',
    },
    status: {
      type: Number,
    },


  },
  { timestamps: true }
);

export default mongoose.model("childPitch", ChildPitchSchema);