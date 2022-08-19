import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { faker } from "@faker-js/faker";
import { GraphQLScalarType, Kind } from "graphql";

const User = mongoose.model("User");
const Meetup = mongoose.model("Meetup");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { _id }, { userId }) => {
      const { _doc: fetchedUser } = await User.findOne({ _id });
      const isCurrentUser = _id === userId;
      return {
        ...fetchedUser,
        isCurrentUser,
      };
    },
    meetups: async () =>
      await Meetup.find({}).populate("userId", "_id firstName"),
    getMeetupsByUserId: async (_, { userId }) => await Meetup.find({ userId }),
    getMeetupById: async (_, { _id }) =>
      await Meetup.findOne({ _id }).populate("userId", "_id firstName email"),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await User.findOne({ _id: userId });
    },
    isLoggedIn: async (_, args, { userId }) => {
      if (!userId) return false;
      else return true;
    },
  },
  // we need to resolve for User also , because in User type (gql schema) we see it refers to meetup type.
  User: {
    meetups: async (currentUser) =>
      await Meetup.find({ userId: currentUser._id }),
  },
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
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
      const image = faker.image.city(480, 480, false);
      const newMeetup = new Meetup({
        ...meetupInfo,
        userId,
        image,
      });
      return await newMeetup.save();
    },
    deleteMeetup: async (_, { id }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return Meetup.findByIdAndDelete(id);
    },
    updateMeetup: async (_, { id, meetup }, { userId }) => {
      if (!userId) throw new Error("You must be logged in");
      return await Meetup.findByIdAndUpdate(id, meetup);
    },
  },
};

export default resolvers;
