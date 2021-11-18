import Link from "next/link";
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
// import Image from 'next/image';

export default function NavBar() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
            {/* <Image src="/image.png" width={128} height={77}/> */}
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              CodewordCo
            </Typography>
            <Link
              variant="button"
              color="text.primary"
              href="/"
              sx={{ my: 1, mx: 1.5 }}
              style={{ color:'black', textDecoration: 'none' }}
            >
              Home
            </Link>
            <li>
            <Link
              variant="button"
              color="text.primary"
              href="/about"
              style={{ color:'black', textDecoration: 'none' }}
            >
              About
            </Link>
            </li>
            <li>
            <Link
              variant="button"
              color="text.primary"
              href="/programmes"
              sx={{ my: 1, mx: 1.5 }}
              style={{ color:'black', textDecoration: 'none' }}
            >
              Browse Programmes
            </Link>
            </li>
            <li>
            <Link
              variant="button"
              color="text.primary"
              href="/contactus"
              sx={{ my: 1, mx: 1.5 }}
            >
              Contact us
            </Link>
            </li>
            {/* <li>
            <Link
              variant="button"
              color="text.primary"
              href="/cart"
              sx={{ my: 1, mx: 1.5 }}
              style={{ color:'black', textDecoration: 'none' }}
            >
              Cart
            </Link>
            </li> */}
          <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}
