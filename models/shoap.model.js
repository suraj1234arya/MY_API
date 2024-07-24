const mongoose = require("mongoose");
const schema = mongoose.Schema;

const warehouseSchema = schema(
  {
    warehouseName: { type: String, required: true },
    locationName: { type: String, required: true },
    location: {
      type: {type:String,enum:["Point"],required:true},
       coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

warehouseSchema.index({ location: "2dsphere" });

const model = mongoose.model("warehouse", warehouseSchema);

module.exports = model;