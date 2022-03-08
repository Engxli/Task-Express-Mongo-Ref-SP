const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const ShopSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true }
);

ShopSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Shop", ShopSchema);
