const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  position: { type: Schema.Types.ObjectId, ref: "Position", required: true },
  height: { type: String, required: true },
  weight: { type: Number, required: true },
  number: { type: Number, required: true },
});

// Virtual for bookinstance's URL
playerSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/players/${this._id}`;
});

playerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});


// Export model
module.exports = mongoose.model("Player", playerSchema);
