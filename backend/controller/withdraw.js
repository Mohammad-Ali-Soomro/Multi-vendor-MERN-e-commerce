const express = require("express");
const Withdraw = require("../model/withdraw");
const Shop = require("../model/shop");
const sendMail = require("../utils/sendMail");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

// POST /create-withdraw-request
router.post(
  "/create-withdraw-request",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Shop not found", 400));
      }

      if (shop.availableBalance < amount) {
        return next(new ErrorHandler("Insufficient balance!", 400));
      }

      // Send email
      await sendMail({
        email: req.seller.email,
        subject: "Withdraw Request Confirmation",
        message: `Hello ${req.seller.name}, you have requested a withdrawal of $${amount}. It is currently under process.`,
      });

      const withdraw = await Withdraw.create({
        seller: req.seller,
        amount,
      });

      shop.availableBalance = shop.availableBalance - amount;
      await shop.save();

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// GET /get-all-withdraw-request
router.get(
  "/get-all-withdraw-request",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// PUT /update-withdraw-request/:id
router.put(
  "/update-withdraw-request/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        {
          status: "succeed",
          updatedAt: Date.now(),
        },
        { new: true }
      );

      if (!withdraw) {
        return next(new ErrorHandler("Withdraw request not found", 400));
      }

      const seller = await Shop.findById(req.body.sellerId);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 400));
      }

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transections = [...seller.transections, transaction];

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Withdraw Request Approved",
          message: `Hello ${seller.name}, your withdrawal request of $${withdraw.amount} has been approved and processed successfully.`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }

      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

module.exports = router;
