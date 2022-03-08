const Shop = require("../../models/Shop");
const Product = require("../../models/Product");

exports.fetchShop = async (shopId, next) => {
  try {
    const shop = await Shop.findById(shopId);

    if (shop) return shop;
    else {
      const error = new Error("Shop ID was not found!");
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.getShops = async (req, res, next) => {
  try {
    const shops = await Shop.find().populate("products");
    return res.json(shops);
  } catch (error) {
    next(error);
  }
};

exports.getShopById = (req, res, next) => {
  try {
    res.status(200).json(req.shop);
  } catch (error) {
    next(error);
  }
};

exports.shopCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }
    req.body.owner = req.user.id;

    const newShop = await Shop.create(req.body);
    res.status(201).json(newShop);
  } catch (error) {
    next(error);
  }
};

exports.shopDeleteById = async (req, res, next) => {
  try {
    req.shop.products.forEach(
      async (product) => await Product.findByIdAndDelete(product._id)
    );
    await Shop.findByIdAndDelete(req.params.shopId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.productCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
    }

    console.log(
      "🚀 ~ file: controllers.js ~ line 73 ~ exports.productCreate= ~ req.user.id === req.shop.owner",
      req.user.id,
      req.shop.owner
    );
    if (req.user.id == req.shop.owner) {
      req.body.shop = req.params.shopId;
      const newProduct = await Product.create(req.body);
      await Shop.findByIdAndUpdate(req.params.shopId, {
        $push: { products: newProduct._id },
      });
      return res.status(201).json(newProduct);
    } else {
      const error = new Error("you are not the owner of the shop!");
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
