import ChildPitch from "../models/ChildPitch.js";
import Pitch from "../models/Pitch.js";
import { createError } from "../ultis/error.js"

//create
export const createChildPitch = async (req, res, next) => {
    const pitchId = req.params.pitchid;
    const newChildPitch = new ChildPitch(req.body)

    try{
        const savedChildPitch = await newChildPitch.save()
        try{
            await Pitch.findByIdAndUpdate(pitchId, {
                $push: { childPitchs: savedChildPitch._id},
            })
        } catch(err){
            next(err)
        }
        res.status(200).json(savedChildPitch)
    }catch (err) {
        next(err)
    }
}

//update
export const updateChildPitch = async (req, res, next) => {
    try {
        const updatedChildPitch = await ChildPitch.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true });
        res.status(200).json(updatedChildPitch);
    } catch (err) {
        next(err);
    }
}

//delete
export const deleteChildPitch = async (req, res, next) => {
    const pitchId = req.params.pitchid;
    try {
        await ChildPitch.findByIdAndDelete(
             req.params.id
         );
         try{
            await Pitch.findByIdAndUpdate(pitchId, {
                $pull: { childPitchs: req.params.id},
            })
        } catch(err){
            next(err)
        }
         res.status(200).json("ChildPitch has been deleted");
     } catch (err) {
        next(err);
     }
}

//get
export const getChildPitch = async (req, res, next) => {
    try {
        const childPitch = await ChildPitch.findById(
             req.params.id
         );
         res.status(200).json(childPitch);
     } catch (err) {
        next(err);
     }
}

//getall
export const getAllchildPitch = async (req, res, next) => {
    try {
        const childPitchs = await ChildPitch.find();
         res.status(200).json(childPitchs);
     } catch (err) {
        next(err);
     }
}