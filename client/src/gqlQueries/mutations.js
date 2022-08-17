import { gql } from "@apollo/client";
export const SIGNUP_USER = gql`
  mutation createUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SignInUser($userSignin: UserSigninInput!) {
    user: signinUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_MEETUP = gql`
  mutation MeetupCreate($meetupInfo: MeetupInput!) {
    meetup: createMeetup(meetupInfo: $meetupInfo) {
      title
      meetupDate
      location
    }
  }
`;
