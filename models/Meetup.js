import mongoose from "mongoose";
const meetupSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  meetupDate: {
    type: Date,
    default: Date.now,
    // required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Meetup", meetupSchema);
