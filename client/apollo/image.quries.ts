import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
  mutation uploadImage($file: Upload!, $propertyId: String!) {
    uploadImage(file: $file, createImageInput: { propertyId: $propertyId }) {
      id
    }
  }
`;

export const DELETE_IMAGE = gql`
  mutation deleteImage($id: String!) {
    deleteImage(id: $id) {
      url
    }
  }
`;
