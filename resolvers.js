import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const User = mongoose.model("User");
const Meetup = mongoose.model("Meetup");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }) => await User.findOne({ _id }),
    meetups: async () =>
      await Meetup.find({}).populate("userId", "_id firstName"),
    getMeetupById: async (_, { userId }) => await Meetup.find({ userId }),
  },
  // we need to resolve for User also , because in User type (gql schema) we see it refers to meetup type.
  User: {
    meetups: async (currentUser) =>
      await Meetup.find({ userId: currentUser._id }),
  },
  Mutation: {
    signupUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 8);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },
    signinUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("User doesn't exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createMeetup: async (_, { meetupInfo }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      const newMeetup = new Meetup({
        ...meetupInfo,
        userId,
      });
      return await newMeetup.save();
    },
  },
};

export default resolvers;
