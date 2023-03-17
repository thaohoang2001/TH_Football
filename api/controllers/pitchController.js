import Pitch from "../models/Pitch.js";

export const createPitch = async (req, res, next) => {
    const newPitch = new Pitch(req.body)

    try {
        const savePitch = await newPitch.save();
        res.status(200).json(savePitch);
    } catch (err) {
        next(err);
    }
}

export const updatePitch = async (req, res, next) => {
    try {
        const updatedPitch = await Pitch.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedPitch);
    } catch (err) {
        next(err);
    }
}

export const deletePitch = async (req, res, next) => {
    try {
        await Pitch.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Pitch has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getPitch = async (req, res, next) => {
    try {
        const pitch = await Pitch.findById(
            req.params.id
        );
        res.status(200).json(pitch);
    } catch (err) {
        next(err);
    }
}

export const getAllPitch = async (req, res, next) => {
    const { min, max, ...others } = req.query
    try {
        const pitchs = await Pitch.find({...others, cheapestPrice: { $gt: min | 1, $lt: max ||999 }}).limit(req.query.limit);
        res.status(200).json(pitchs);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Pitch.countDocuments({ city: city })
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}

export const countByType = async (req, res, next) => {
    try {
        const pitch5Count = await Pitch.countDocuments({ type: "pitch5" })
        const pitch7Count = await Pitch.countDocuments({ type: "pitch7" })
        const pitch11Count = await Pitch.countDocuments({ type: "pitch11" })

        res.status(200).json([
            { type: "pitch5", count: pitch5Count },
            { type: "pitch7", count: pitch7Count },
            { type: "pitch11", count: pitch11Count },
        ]);
    } catch (err) {
        next(err);
    }
}