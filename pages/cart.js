import Link from "next/link";
import { Button } from "@mui/material";

export default function Cart() {
  return (
    <>
      <h1>View your cart</h1>
      <Button href="/login" variant="contained" color="primary">
        Check out
      </Button>
      <Link href="/programmes">
        <h4>Back to Program Listing</h4>
      </Link>
    </>
  );
}
