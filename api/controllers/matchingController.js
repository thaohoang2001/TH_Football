import OrderMatch from "../models/OrderMatch.js";

export const createOrderMatch = async (req, res, next) => {

    const orderMatch = new OrderMatch(req.body)

    try {
        const saveOrderMatch = await orderMatch.save();
        res.status(200).json(saveOrderMatch);
    } catch (err) {
        next(err);
    }
}

export const updateOrderMatch = async (req, res, next) => {

    try {
        const updatedOrderMatch = await OrderMatch.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updatedOrderMatch);
    } catch (err) {
        next(err);
    }
}

export const deleteOrderMatch = async (req, res, next) => {
    try {
        await OrderMatch.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("OrderMatch has been deleted");
    } catch (err) {
        next(err);
    }
}

export const getOrderMatch = async (req, res, next) => {
    try {
        const orderMatch = await OrderMatch.findById(
            req.params.id
        );
        res.status(200).json(orderMatch);
    } catch (err) {
        next(err);
    }
}

export const getOrderMatchs = async (req, res, next) => {
    try {
        const orderMatchs = await OrderMatch.find();
        res.status(200).json(orderMatchs);
    } catch (err) {
        next(err);
    }
};

export const getOrderFindMatchs = async (req, res, next) => {
    let findMatch = req.body.findMatch

    try {
        const orderMatchs = await OrderMatch.find({ findMatch: findMatch, userIdMatch: null });
        res.status(200).json(orderMatchs);
    } catch (err) {
        next(err);
    }
};


