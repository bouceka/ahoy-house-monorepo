// @flow
import * as React from 'react';
import Head from 'next/head';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation } from '@apollo/client';
import { CREATE_ROOM } from '../../../../apollo/room-queries';
import { AdminNav } from '../../../../components/admin-nav/admin-nav.component';
import { Input } from '../../../../components/input/input.component';
import { Action } from '../../../../components/action/action.component';
import { fetchProperties, fetchProperty } from '../../../../apollo/property-queries';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { Property } from '../../../../types/property';

type Props = {
  property: Property
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ propertyId: string }>) => {
  console.log(params?.propertyId);
  const data = params?.propertyId ? await fetchProperty(params?.propertyId) : '';
  return {
    props: {
      property: data ? data.getProperty : [],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const properties: Property[] = await fetchProperties();
  const paths = properties.map((property) => {
    return {
      params: {
        propertyId: property.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};


const initialValue = {
    description: '',
    pricePerNight: 0,
    capacity: 0,
    name: '',
    livingArea: 0,
    amenities: '',
};

const validationSchema = yup.object().shape({
    name: yup.string().required('Name of the property is required'),
    description: yup.string().required('Description is required'),
    capacity: yup.number().required('Number of bathrooms is required'),
    livingArea: yup.number().required('Size is required'),
    pricePerNight: yup.number().required('Price per night is required'),
    amenities: yup.string().required('Amenities are required'),
});

const AddRoom = ({property}: Props) => {
  const [createRoom, { data, loading, error }] = useMutation(CREATE_ROOM);

  const submitForm = async (values: typeof initialValue) => {
    const { data } = await createRoom({
      variables: {
        description: values.description,
        pricePerNight: values.pricePerNight,
        capacity: values.capacity,
        name: values.name,
        livingArea: values.livingArea,
        propertyId: property.id,
        amenities: values.amenities,
      },
    });
    return data;
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AdminNav />
      <main className='page '>
        <ToastContainer style={{ fontSize: '1.6rem' }} pauseOnHover hideProgressBar />
        <div className='row'>
          <h1 className='heading'>Add Room of property {property.name}</h1>
          <h2 className='heading'>ID: {property.id}</h2>

          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                console.log(values);

                console.log(await submitForm(values));
                toast.success('Form submitted');
                // actions.resetForm();
              } catch (error) {
                console.log(values);
                toast.error('Submission failed');
                // actions.resetForm();
              }
            }}
          >
            {({ values, handleSubmit, handleChange, isSubmitting, dirty, isValid, errors, ...props }) => {
              return (
                <>
                  <form onSubmit={handleSubmit}>
                    <Input
                      onChange={handleChange}
                      value={values.name}
                      required
                      name='name'
                      label='Property Name'
                      placeholder='e.g. Silver House'
                    />
                    <Input
                      onChange={handleChange}
                      value={values.description}
                      required
                      name='description'
                      type='textarea'
                      label='Description'
                      placeholder='Describe the property'
                    />
                    <Input
                      onChange={handleChange}
                      value={values.capacity}
                      required
                      name='capacity'
                      type='number'
                      label='Capacity number of guests'
                      placeholder='e.g. 1'
                    />
                    <Input
                      onChange={handleChange}
                      value={values.livingArea}
                      required
                      name='livingArea'
                      type='number'
                      label='Living Area (sqft) '
                      placeholder='e.g. 981'
                    />
                    <Input
                      onChange={handleChange}
                      value={values.pricePerNight}
                      required
                      type='number'
                      name='pricePerNight'
                      label='Price Per Night'
                      placeholder='e.g. $50'
                    />
                    <Input
                      onChange={handleChange}
                      value={values.amenities}
                      required
                      name='amenities'
                      label='Amenities'
                      placeholder='e.g. Fridge, Wi-Fi, Free Parking'
                    />
                    <Action disabled={!isValid || !dirty} as='button' type='submit' styleType='primary'>
                      Submit
                    </Action>
                  </form>
                </>
              );
            }}
          </Formik>
        </div>
      </main>
    </>
  );
};

export default AddRoom;
