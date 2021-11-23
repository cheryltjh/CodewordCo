import React, {useContext} from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  Container,
  ThemeProvider,
  CssBaseline,
  Switch,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippingAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>CodeWordCo</title>
      </Head>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            CodeWordCo
          </Typography>
          <Link
            variant="button"
            color="text.primary"
            href="/"
            sx={{ my: 1, mx: 1.5 }}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Typography>Home</Typography>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/programmes"
            sx={{ my: 1, mx: 1.5 }}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Typography>Programmes</Typography>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/about"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Typography>About</Typography>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/contactus"
            sx={{ my: 1, mx: 1.5 }}
          >
            <Typography>Contact Us</Typography>
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/cart"
            sx={{ my: 1, mx: 1.5 }}
            style={{ color: "black", textDecoration: "none" }}
          >
            <Typography>
              {cart.cartItems.length > 0 ? (
                <Badge color="secondary" badgeContent={cart.cartItems.length}>
                  Cart
                </Badge>
              ) : (
                "Cart"
              )}
            </Typography>
          </Link>
          {userInfo ? (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={loginClickHandler}
                className={classes.navbarButton}
              >
                {userInfo.name}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={loginMenuCloseHandler}
              >
                <MenuItem onClick={(e) => loginMenuCloseHandler(e, "/profile")}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => loginMenuCloseHandler(e, "/order-history")}
                >
                  Order Hisotry
                </MenuItem>
                {userInfo.isAdmin && (
                  <MenuItem
                    onClick={(e) =>
                      loginMenuCloseHandler(e, "/admin/dashboard")
                    }
                  >
                    Admin Dashboard
                  </MenuItem>
                )}
                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button href="/login" variant="outlined" sx={{ my: 0.5, mx: 1 }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
    </div>
  );
}
