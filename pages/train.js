import React from 'react';
import Head from 'next/head';

import ChessBoard from '../components/ChessBoard';

export default function Train() {
  return (
    <div>
      <Head>
        <title>Train | ChessOpenings.co.uk</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ChessBoard />
    </div>
  );
}
