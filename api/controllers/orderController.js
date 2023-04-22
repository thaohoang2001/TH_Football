import ChildPitch from "../models/ChildPitch.js";
import Order from "../models/Order.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(
    process.env.STRIPE
  );

  const childPitch = await ChildPitch.findById(req.params.id);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: childPitch?.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    childPitchId: childPitch._id,
    nameChildPitchOrder: childPitch.title,
    title: childPitch.desc,
    price: childPitch.price,
    DateOrder: childPitch.DateChildPitch,
    payment_intent: paymentIntent.id,
  })
  await newOrder.save();
  console.log("newOrder: ", newOrder);

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}


// export const createOrder = async (req, res, next) => {

//   const pitch = await Pitch.findById(req.params.id);
  
//   const newOrder = new Order({
//     pitchId: pitch._id,
//     namePitchOrder: pitch.name,
//     title: pitch.title,
//     price: pitch.cheapestPrice,
//     payment_intent: paymentIntent.id,
//   })
//   await newOrder.save();
//   console.log("newOrder: ", newOrder);

//   res.status(200).send(newOrder);
// }

export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      isCompleted: true,
    })

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
}

export const deleteOrder = async (req, res, next) => {
  try {
      await Order.findByIdAndDelete(
          req.params.id
      );
      res.status(200).json("Order has been deleted");
  } catch (err) {
      next(err);
  }
}