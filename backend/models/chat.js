const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    message: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("Chat", ChatSchema);