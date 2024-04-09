import { mongoose, Schema } from "mongoose";

const UserSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
