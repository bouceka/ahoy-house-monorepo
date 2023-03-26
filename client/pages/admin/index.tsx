// @flow
import Head from 'next/head';
import * as React from 'react';

import { AdminNav } from '../../components/admin-nav/admin-nav.component';

const AdminDashboard = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminNav />
      <main className="page ">
        <div className="row">
          <h1 className="heading">Dashboard</h1>
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;
