const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  position: { type: Schema.Types.ObjectId, ref: "Position", required: true },
  height: { type: String, required: true },
  weight: { type: Number, required: true },
  number: { type: Number, required: true },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate(); // format 'YYYY-MM-DD'
});


// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
