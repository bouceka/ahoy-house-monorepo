import { gql } from '@apollo/client';

import { apolloClient } from '../utils/apollo-client';

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
    createProperty(
      createPropertyInput: {
        description: $description
        numberBaths: $numberBaths
        name: $name
        numberRooms: $numberRooms
        livingArea: $livingArea
        postalCode: $postalCode
        address: $address
        isActive: $isActive
      }
    ) {
      name
    }
  }
`;

export const GET_ACTIVE_PROPERTIES = gql`
  query getAllActiveProperties {
    getAllActiveProperties {
      id
      description
      numberRooms
      numberBaths
      livingArea
      address
      postalCode
      name
      isActive
      rating
      rooms {
        id
        description
        name
        livingArea
        pricePerNight
        capacity
      }
      images {
        propertyId
        publicId
        url
        id
        createdAt
      }
    }
  }
`;
export const GET_ALL_PROPERTIES = gql`
  query getAllProperties {
    getAllProperties {
      id
      description
      numberRooms
      numberBaths
      livingArea
      address
      postalCode
      name
      isActive
      rating
      rooms {
        id
        description
        name
        livingArea
        pricePerNight
        capacity
      }
      images {
        propertyId
        publicId
        url
        id
        createdAt
      }
    }
  }
`;

export const GET_ACTIVE_PROPERTY = gql`
  query getActiveProperty($id: String!) {
    getActiveProperty(id: $id) {
      id
      description
      numberRooms
      numberBaths
      livingArea
      address
      postalCode
      name
      isActive
      rating
      rooms {
        id
        description
        name
        livingArea
        pricePerNight
        capacity
      }
      images {
        propertyId
        publicId
        url
        id
        createdAt
      }
    }
  }
`;
export const GET_PROPERTY = gql`
  query getProperty($id: String!) {
    getProperty(id: $id) {
      id
      description
      numberRooms
      numberBaths
      livingArea
      address
      postalCode
      name
      isActive
      rooms {
        id
        description
        name
        livingArea
        pricePerNight
        capacity
      }
      images {
        propertyId
        publicId
        url
        id
        createdAt
      }
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation deleteProperty($id: String!) {
    deleteProperty(id: $id) {
      name
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation updateProperty(
    $id: ID!
    $numberBaths: Float!
    $name: String!
    $numberRooms: Float!
    $livingArea: Float!
    $postalCode: String!
    $address: String!
    $isActive: Boolean!
    $description: String!
  ) {
    updateProperty(
      updatePropertyInput: {
        description: $description
        numberBaths: $numberBaths
        name: $name
        numberRooms: $numberRooms
        livingArea: $livingArea
        postalCode: $postalCode
        address: $address
        isActive: $isActive
        id: $id
      }
    ) {
      name
    }
  }
`;

export const fetchActiveProperty = async (id: string) => {
  const { data } = await apolloClient.query({
    query: GET_ACTIVE_PROPERTY,
    variables: {
      id: id,
    },
  });
  return data;
};

export const fetchActiveProperties = async () => {
  const { data } = await apolloClient.query({
    query: GET_ACTIVE_PROPERTIES,
  });
  return data.getAllActiveProperties;
};

export const fetchProperty = async (id: string) => {
  const { data } = await apolloClient.query({
    query: GET_PROPERTY,
    variables: {
      id: id,
    },
  });
  return data;
};
export const fetchProperties = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALL_PROPERTIES,
  });
  return data.getAllProperties;
};
