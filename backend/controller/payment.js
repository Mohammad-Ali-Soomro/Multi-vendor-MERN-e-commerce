const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const router = express.Router();

// POST /process
router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        metadata: {
          company: "EShop",
        },
      });

      res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  })
);

// GET /stripeapikey
router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApikey: process.env.STRIPE_API_KEY,
    });
  })
);

module.exports = router;
