import { gql } from '@apollo/client';

import { apolloClient } from '../utils/apollo-client';

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: String!) {
    deleteRoom(id: $id) {
      name
    }
  }
`;

export const UPDATE_ROOM = gql`
  mutation updateRoom(
    $id: ID!
    $capacity: Float!
    $name: String!
    $description: String!
    $livingArea: Float!
    $propertyId: ID!
    $amenities: String!
    $pricePerNight: Float!
  ) {
    updateRoom(
      updateRoomInput: {
        description: $description
        capacity: $capacity
        name: $name
        amenities: $amenities
        livingArea: $livingArea
        propertyId: $propertyId
        pricePerNight: $pricePerNight
        id: $id
      }
    ) {
      name
    }
  }
`;

export const GET_ALL_ROOMS = gql`
  query getAllRooms {
    getAllRooms {
      id
      description
      livingArea
      capacity
      name
      propertyId
      pricePerNight
      amenities
    }
  }
`;

export const GET_ROOM = gql`
  query getRoom($id: ID!) {
    getRoom(id: $id) {
      id
      description
      livingArea
      capacity
      propertyId
      name
      pricePerNight
      amenities
    }
  }
`;

export const CREATE_ROOM = gql`
  mutation createRoom(
    $capacity: Float!
    $name: String!
    $description: String!
    $livingArea: Float!
    $propertyId: ID!
    $amenities: String!
    $pricePerNight: Float!
  ) {
    createRoom(
      createRoomInput: {
        description: $description
        capacity: $capacity
        name: $name
        amenities: $amenities
        livingArea: $livingArea
        propertyId: $propertyId
        pricePerNight: $pricePerNight
      }
    ) {
      name
    }
  }
`;

export const fetchRoom = async (id: string) => {
  const { data } = await apolloClient.query({
    query: GET_ROOM,
    variables: {
      id: id,
    },
  });
  return data;
};
export const fetchRooms = async () => {
  const { data } = await apolloClient.query({
    query: GET_ALL_ROOMS,
  });
  return data.getAllRooms;
};
