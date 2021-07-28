/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMystate = /* GraphQL */ `
  query GetMystate($id: ID!) {
    getMystate(id: $id) {
      id
      rating
      comment
      sleepTime
      wakeTime
      foodType
      foodRating
      trainType
      trainTime
      createdAt
      updatedAt
    }
  }
`;
export const listMystates = /* GraphQL */ `
  query ListMystates(
    $filter: ModelmystateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMystates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        rating
        comment
        sleepTime
        wakeTime
        foodType
        foodRating
        trainType
        trainTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
