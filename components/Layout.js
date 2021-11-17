import { Container, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout({ children }) {

  return (
    <div>
      <Head>
        <title>CodewordCo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
