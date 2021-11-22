import Head from "next/head";
import React, {useContext} from "react";
import NavBar from "./NavBar";

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
