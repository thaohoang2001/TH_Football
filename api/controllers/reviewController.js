import { createError } from "../ultis/error.js"
import Review from "../models/Review.js";
import Pitch from "../models/Pitch.js";

export const createReview = async (req, res, next) => {
  if (req.isAdmin)
    return next(createError(403, "Staff can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    pitchId: req.body.pitchId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      pitchId: req.body.pitchId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this Pitch!")
      );

    //TODO: check if the user purchased the pitch.

    const savedReview = await newReview.save();

    await Pitch.findByIdAndUpdate(req.body.pitchId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ pitchId: req.params.pitchId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};