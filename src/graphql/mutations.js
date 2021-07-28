/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMystate = /* GraphQL */ `
  mutation CreateMystate(
    $input: CreateMystateInput!
    $condition: ModelmystateConditionInput
  ) {
    createMystate(input: $input, condition: $condition) {
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
export const updateMystate = /* GraphQL */ `
  mutation UpdateMystate(
    $input: UpdateMystateInput!
    $condition: ModelmystateConditionInput
  ) {
    updateMystate(input: $input, condition: $condition) {
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
export const deleteMystate = /* GraphQL */ `
  mutation DeleteMystate(
    $input: DeleteMystateInput!
    $condition: ModelmystateConditionInput
  ) {
    deleteMystate(input: $input, condition: $condition) {
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
