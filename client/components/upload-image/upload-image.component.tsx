// @flow
import { ApolloQueryResult, useMutation, useQuery } from '@apollo/client';
import * as React from 'react';
import { UPLOAD_IMAGE } from '../../apollo/image.quries';
import { apolloClient } from '../../utils/apollo-client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
type Props = {
  propertyId: string;
  //   refetch: () => Promise<ApolloQueryResult<any>>
};
export const UploadImage = ({ propertyId }: Props) => {
  const [uploadFileMutation] = useMutation(UPLOAD_IMAGE);
  //   const { data, loading, error, refetch } = useQuery(GET_PROPERTY, { variables: { id: propertyId } });
  const router = useRouter();
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.validity.valid && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);
      if (file.size < 600000) {
        uploadFileMutation({
          variables: { file, propertyId },
          onCompleted: () => {
            //   refetch();
            router.reload();
          },
        }).then(() => {
          apolloClient.resetStore();
        });
      } else {
        toast.warn('The file is too big! (max 600KB)');
      }
    }
  }
  return (
    <>
      <input type='file' name='image' id='' onChange={onChange} />
    </>
  );
};
