import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isCurrentUser: Boolean
    meetups: [Meetup]
  }
  type Meetup {
    _id: ID!
    title: String!
    description: String
    meetupDate: Date
    location: String
    image: String
    userId: ID
  }
  type Token {
    token: String
  }
  type MeetupWithName {
    _id: ID!
    title: String!
    description: String
    meetupDate: Date
    location: String
    userId: IDWithName
    image: String
  }
  type IDWithName {
    _id: ID
    firstName: String
    email: String
  }
  type Query {
    users: [User]
    user(_id: ID!): User
    meetups: [MeetupWithName]
    getMeetupById(_id: ID!): MeetupWithName
    getMeetupsByUserId(userId: ID!): [Meetup]
    myprofile: User
    isLoggedIn: Boolean
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createMeetup(meetupInfo: MeetupInput): Meetup
    deleteMeetup(id: ID!): Meetup
    updateMeetup(id: ID!, meetup: MeetupUpdateInput): Meetup
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
    description: String!
    meetupDate: Date!
    location: String!
  }

  input MeetupUpdateInput {
    title: String
    description: String
  }
`;

export default typeDefs;
