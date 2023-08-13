const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const positionSchema = new Schema({
  position: { type: String, required: true },
});

// Virtual for bookinstance's URL
positionSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/positions/${this._id}`;
});

// Export model
module.exports = mongoose.model("Position", positionSchema);
