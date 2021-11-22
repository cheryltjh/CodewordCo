import Head from "next/head";
import NavBar from "./NavBar";
import React from "react";

export default function Layout({ children }) {

  return (
    <div>
      <Head>
        <title>CodewordCo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
