import { mongoose, Schema } from "mongoose";

const AccountSchema = new Schema({
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

export default Account;
