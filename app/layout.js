// app/components/Layout.js

import React from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Marketplace App</title>
        <meta name="description" content="Marketplace App - Support NPOs through donations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />

      <main>
        {children}
      </main>
      
    </div>
  );
};

export default Layout;