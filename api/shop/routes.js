const express = require("express");
const passport = require("passport");

const upload = require("../../middleware/multer");
const {
  getShops,
  shopCreate,
  productCreate,
  getShopById,
  fetchShop,
  shopDeleteById,
} = require("./controllers");

const router = express.Router();

router.param("shopId", async (req, res, next, shopId) => {
  const shop = await fetchShop(shopId, next);
  if (shop) {
    req.shop = shop;
    next();
  } else {
    const err = new Error("Product Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", getShops);
router.get("/:shopId", getShopById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  shopCreate
);
router.post(
  "/:shopId/products",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  productCreate
); // product creat
router.delete("/:shopId", shopDeleteById);

module.exports = router;
