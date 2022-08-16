import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    meetups: [Meetup]
  }
  type Meetup {
    title: String!
    description: String
    meetupDate: String
    location: String
    userId: ID
  }
  type Token {
    token: String
  }
  type MeetupWithName {
    title: String!
    description: String
    meetupDate: String
    location: String
    userId: IDWithName
  }
  type IDWithName {
    _id: ID
    firstName: String
  }
  type Query {
    users: [User]
    user(_id: ID!): User
    meetups: [MeetupWithName]
    getMeetupById(userId: ID!): [Meetup]
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createMeetup(meetupInfo: MeetupInput): Meetup
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
  input MeetupInput {
    title: String!
    description: String
    meetupDate: String
    location: String
  }
`;

export default typeDefs;
