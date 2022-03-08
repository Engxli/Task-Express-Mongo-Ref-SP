const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: {
      type: Number,
      default: 5,
      min: 1,
    },
    image: String,
    quantity: Number,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  },
  { timestamps: true }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Product", ProductSchema);
