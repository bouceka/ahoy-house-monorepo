// @flow
import Head from 'next/head';
import * as React from 'react';

import { Header } from '../../components/header/header.component';

export const Login = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header type="solid" imageExtend={false} position="sticky" />
      <main></main>
      <div>
        <h1 className="heading">Login</h1>
      </div>
    </>
  );
};

export default Login;
