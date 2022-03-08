const Order = require("../../models/Order");

exports.checkout = async (req, res, next) => {
  try {
    console.log(req.body);
    const checoutRec = await Order.create(req.body);
    res.json(req.body);
  } catch (err) {
    next(err);
  }
};
