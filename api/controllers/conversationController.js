import Conversation from "../models/Conversation.js";

export const createConversation = async (req, res, next) => {
  console.log("Staff: ", req.role);
  console.log("userId: ", req.userId);
    const newConversation = new Conversation({
        id: req.role == 'staff' ? req.userId + req.body.to : req.body.to + req.userId,
        staffId: req.role == 'staff' ? req.userId : req.body.to,
        customerId: req.role == 'staff' ?  req.body.to : req.userId,
        readByStaff: req.role == 'staff',
        readByCustomer: !req.role == 'staff',
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(201).send(savedConversation);
    } catch (err) {
        next(err);
    }
};

export const updateConversation = async (req, res, next) => {
    try {
      const updatedConversation = await Conversation.findOneAndUpdate(
        { id: req.params.id },
        {
          $set: {
            ...(req.role == 'staff' ? { readByStaff: true } : { readByCustomer: true }),
          },
        },
        { new: true }
      );
  
      res.status(200).send(updatedConversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getSingleConversation = async (req, res, next) => {
    try {
      const conversation = await Conversation.findOne({ id: req.params.id });
      if (!conversation) return next(createError(404, "Not found!"));
      res.status(200).send(conversation);
    } catch (err) {
      next(err);
    }
  };
  
  export const getConversations = async (req, res, next) => {
    try {
      const conversations = await Conversation.find(
        req.role ? { staffId: req.userId } : { customerId: req.userId }
      ).sort({ updatedAt: -1 });
      res.status(200).send(conversations);
    } catch (err) {
      next(err);
    }
  };