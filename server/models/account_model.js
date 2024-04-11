const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectID,
    ref: "User",
    required: true,
  },

  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", AccountSchema);
module.exports = {
  Account,
};
