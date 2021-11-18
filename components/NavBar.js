import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
// import Image from 'next/image';
import React from "react";

export default function NavBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            {/* <Image src="/image.png" width={128} height={77}/> */}
            <Typography>CodewordCo</Typography>
          </Link>
          <Link href="/">
            <Typography>Home</Typography>
          </Link>
          <Link href="/about">
            <Typography>
              <a className="nav-link">About</a>
            </Typography>
          </Link>
          <Link href="/programmes">
            <Typography>
              <a className="nav-link">Browse Programmes</a>
            </Typography>
          </Link>
          <Link href="/contactus">
            <Typography>
              <a className="nav-link">Contact us</a>
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
