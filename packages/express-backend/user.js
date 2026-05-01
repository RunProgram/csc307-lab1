import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  job: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;