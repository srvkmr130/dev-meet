import { gql } from "@apollo/client";
export const GET_ALL_MEETUPS = gql`
  query getAllMeetups {
    meetups {
      title
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
      meetups {
        title
      }
    }
  }
`;
