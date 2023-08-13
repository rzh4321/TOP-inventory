const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  netWorth: { type: String, required: true },
});

// Virtual for bookinstance's URL
ownerSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/owners/${this._id}`;
});

ownerSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});


// Export model
module.exports = mongoose.model("Owner", ownerSchema);
