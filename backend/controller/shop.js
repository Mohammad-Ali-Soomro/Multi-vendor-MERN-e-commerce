const express = require("express");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopToken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");

const router = express.Router();

// Helper function
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// POST /create-shop
router.post(
  "/create-shop",
  catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, avatar, address, phoneNumber, zipCode } = req.body;

    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const seller = {
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
      address,
      phoneNumber,
      zipCode,
    };

    const activationToken = createActivationToken(seller);

    const activationUrl = `https://multi-vendor-mern-e-commerce-itsy.vercel.app/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email: ${seller.email} to activate your shop!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// POST /activation
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, avatar, password, zipCode, address, phoneNumber } = newSeller;

      const shopExists = await Shop.findOne({ email });
      if (shopExists) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      const seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler("Token expired or invalid", 400));
    }
  })
);

// POST /login-shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password!", 400));
    }

    const shop = await Shop.findOne({ email }).select("+password");

    if (!shop) {
      return next(new ErrorHandler("Shop doesn't exists!", 400));
    }

    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendShopToken(shop, 201, res);
  })
);

// GET /getSeller
router.get(
  "/getSeller",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Shop doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  })
);

// GET /logout
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    res
      .status(201)
      .cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .json({
        success: true,
        message: "Log out successful!",
      });
  })
);

// GET /get-shop-info/:id
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 400));
    }

    res.status(201).json({
      success: true,
      shop,
    });
  })
);

// PUT /update-shop-avatar
router.put(
  "/update-shop-avatar",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const existsSeller = await Shop.findById(req.seller._id);

    if (req.body.avatar) {
      if (existsSeller.avatar && existsSeller.avatar.public_id) {
        await cloudinary.v2.uploader.destroy(existsSeller.avatar.public_id);
      }

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
      });

      existsSeller.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await existsSeller.save();

    res.status(200).json({
      success: true,
      seller: existsSeller,
    });
  })
);

// PUT /update-seller-info
router.put(
  "/update-seller-info",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { name, description, address, phoneNumber, zipCode } = req.body;

    const shop = await Shop.findOne({ _id: req.seller._id });

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 400));
    }

    shop.name = name || shop.name;
    shop.description = description || shop.description;
    shop.address = address || shop.address;
    shop.phoneNumber = phoneNumber || shop.phoneNumber;
    shop.zipCode = zipCode || shop.zipCode;

    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  })
);

// GET /admin-all-sellers
router.get(
  "/admin-all-sellers",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    const sellers = await Shop.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      sellers,
    });
  })
);

// DELETE /delete-seller/:id
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    const seller = await Shop.findById(req.params.id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    if (seller.avatar && seller.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(seller.avatar.public_id);
    }

    await Shop.findByIdAndDelete(req.params.id);

    res.status(201).json({
      success: true,
      message: "Seller deleted successfully!",
    });
  })
);

// PUT /update-payment-methods
router.put(
  "/update-payment-methods",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const { withdrawMethod } = req.body;

    const seller = await Shop.findByIdAndUpdate(
      req.seller._id,
      { withdrawMethod },
      { new: true }
    );

    res.status(201).json({
      success: true,
      seller,
    });
  })
);

// DELETE /delete-withdraw-method
router.delete(
  "/delete-withdraw-method",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("Seller not found", 400));
    }

    seller.withdrawMethod = null;

    await seller.save();

    res.status(201).json({
      success: true,
      seller,
    });
  })
);

module.exports = router;
