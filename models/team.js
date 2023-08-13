const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    location: { type: String, required: true },
    name: { type: String, required: true },
    championships: { type: [Number] },
});

// Virtual for bookinstance's URL
teamSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/teams/${this._id}`;
});

teamSchema.virtual("teamName").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `${this.location} ${this.name}`;
  });


// Export model
module.exports = mongoose.model("Team", teamSchema);
