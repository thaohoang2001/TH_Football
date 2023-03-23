import Order from "../models/Order.js";
import Pitch from "../models/Pitch.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(
    process.env.STRIPE
  );

  const pitch = await Pitch.findById(req.params.id);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: pitch?.cheapestPrice * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    pitchId: pitch._id,
    namePitchOrder: pitch.name,
    title: pitch.title,
    price: pitch.cheapestPrice,
    payment_intent: paymentIntent.id,
  })
  await newOrder.save();
  console.log("newOrder: ", newOrder);

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
}


export const createOrder = async (req, res, next) => {

  const pitch = await Pitch.findById(req.params.id);
  
  const newOrder = new Order({
    pitchId: pitch._id,
    namePitchOrder: pitch.name,
    title: pitch.title,
    price: pitch.cheapestPrice,
    payment_intent: paymentIntent.id,
  })
  await newOrder.save();
  console.log("newOrder: ", newOrder);

  res.status(200).send(newOrder);
}

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
      // ...(req.isAdmin),
      isCompleted: true,
    })

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
}