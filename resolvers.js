// import { meetups, users } from "./fakedb.js";
// import { randomBytes } from "crypto";
import mongoose from "mongoose";
const User = mongoose.model("User");
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const resolvers = {
  //   Query: {
  //     users: () => users,
  //     user: (_, { _id }) => users.find((user) => user._id == _id),
  //     meetups: () => meetups,
  //     getMeetupById: (_, { userId }) =>
  //       meetups.filter((meetup) => meetup.userId == userId),
  //   },
  //   User: {
  //     meetups: (currentUser) =>
  //       meetups.filter((meetup) => meetup.userId == currentUser._id),
  //   },
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
        throw new Error("User dosent exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignin.password, user.password);
      if (!doMatch) {
        throw new Error("email or password in invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
  },
};

export default resolvers;
