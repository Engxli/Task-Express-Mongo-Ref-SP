const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");
const OrderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

// OrderSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });
module.exports = mongoose.model("Order", OrderSchema);
