// the moment that this mounts we need dotenv lib
// .config() will attach all those secret vars present in .env file onto our process envt
require("dotenv").config();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

exports.handler = async (event) => {
  try {
    // 1. receive amount value
    const { amount } = JSON.parse(event.body); // amount is passed in cents; amount * 100

    // 2. passing amount into stripe to make a payment intent; intent to make payment that stripe registers
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // 3. we return the intent back to the front end if successfull
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
