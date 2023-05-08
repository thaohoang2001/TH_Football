import ChildPitch from "../models/ChildPitch.js";
import OrderMatch from "../models/OrderMatch.js";
import Pitch from "../models/Pitch.js";

export const createChildPitch = async (req, res, next) => {
  const newChildPitch = new ChildPitch(req.body);

  try {
    const savedChildPitch = await newChildPitch.save();

    res.status(200).json(savedChildPitch);
  } catch (err) {
    next(err);
  }
};

export const updateChildPitch = async (req, res, next) => {
  try {
    const updatedChildPitchs = await ChildPitch.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedChildPitchs);
  } catch (err) {
    next(err);
  }
};

export const updateChildPitchAvailability = async (req, res, next) => {
  try {
    await ChildPitch.updateOne(
      { "childPitchNumbers._id": req.params.id },
      {
        $push: {
          "childPitchNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("childPitchs status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteChildPitch = async (req, res, next) => {
  // const pitchId = req.params.pitchid;
  try {
    await ChildPitch.findByIdAndDelete(req.params.id);
    // try {
    //   await Pitch.findByIdAndUpdate(pitchId, {
    //     $pull: { childPitchs: req.params.id },
    //   });
    // } catch (err) {
    //   next(err);
    // }
    res.status(200).json("ChildPitch has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getChildPitch = async (req, res, next) => {
  try {
    const childPitch = await ChildPitch.findById(req.params.id);
    res.status(200).json(childPitch);
  } catch (err) {
    next(err);
  }
};

export const getChildPitchs = async (req, res, next) => {
  const pitchId = req.params.id;
  try {
    const childPitchs = await ChildPitch.find({ pitchId: pitchId });
    res.status(200).json(childPitchs);
  } catch (err) {
    next(err);
  }
};


// ------------------------Matching------------------------

export const postChildPitchFilter = async (req, res, next) => {
  // sẽ làm theo khoảng thời gian sau
  try {
    let pitchId = req.body.pitchId
    let findMatch = req.body.findMatch
    let timeFrame = req.body.timeFrame
    let orderMatch

    //check tìm sân đã có đối
    if (findMatch.toString() == 'true') {
      orderMatch = await OrderMatch.find({ findMatch: findMatch, timeFrame: timeFrame }).populate('childPitchId')
    }

    //check tìm sân không cần bắt đối tự đá và tìm sân đợi đối
    else {
      orderMatch = await OrderMatch.find({ timeFrame: timeFrame }).populate('childPitchId')
    }

    let childPitchOrderArr = []
    let childPitch
    for (let element of orderMatch) {
      if (element.userIdMatch == null) {
        await childPitchOrderArr.push(element.childPitchId._id)
      }

    }
    // orderMatch.forEach(element => {
    //   console.log("Element: ",element);
    //   childPitchOrderArr.push(element.childPitchId._id)
    // });
    if (findMatch.toString() == 'true') {
      // nếu tìm sân bắt đối thì findMatch = true
      if (pitchId != null) {
        childPitch = await ChildPitch.find({ _id: { $in: childPitchOrderArr }, pitchId: pitchId });
      }
      else {
        childPitch = await ChildPitch.find({ _id: { $in: childPitchOrderArr } });
      }
      //console.log(childPitch)
    }
    // nếu tìm sân không bắt đối thì findMatch = false
    else if (findMatch.toString() == 'false') {
      if (pitchId != null) {
        childPitch = await ChildPitch.find({ _id: { $nin: childPitchOrderArr }, pitchId: pitchId });
      }
      else {
        childPitch = await ChildPitch.find({ _id: { $nin: childPitchOrderArr }, pitchId: pitchId });
      }
    }
    console.log(childPitch);
    res.status(200).json(childPitch);
  } catch (err) {
    next(err);
  }
};

