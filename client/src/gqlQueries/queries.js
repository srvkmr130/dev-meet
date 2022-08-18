import { gql } from "@apollo/client";
export const GET_ALL_MEETUPS = gql`
  query getAllMeetups {
    meetups {
      title
      meetupDate
      location
      image
      userId {
        _id
        firstName
      }
    }
  }
`;
export const GET_MY_PROFILE = gql`
  query getMyProfile {
    user: myprofile {
      firstName
      lastName
      email
      isCurrentUser
      meetups {
        title
      }
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      isCurrentUser
      meetups {
        title
      }
    }
  }
`;
export const VALIDATE_LOGIN = gql`
  query validateLogin {
    isLoggedIn
  }
`;
