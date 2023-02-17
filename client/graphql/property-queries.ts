import { gql } from '@apollo/client';

export const CREATE_PROPERTY = gql`
mutation createProperty(
      $description: String!
      $numberBaths: Float!
      $name: String!
      $numberRooms: Float!
      $livingArea: Float!
      $postalCode: String!
      $address: String!
      $isActive: Boolean!
  ) {
    createProperty( createPropertyInput: {
      description: $description
      numberBaths:  $numberBaths
      name: $name
      numberRooms: $numberRooms
      livingArea:$livingArea
      postalCode: $postalCode
      address: $address
      isActive: $isActive
    }
    ){
        name
    }
  }
`;
