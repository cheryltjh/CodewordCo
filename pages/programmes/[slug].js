import { Button, Grid, List, ListItem } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import Program from "../../models/Program";
import mongodb from "../../util/mongodb";
import { Store } from "../../util/store";
import { useRouter } from "next/router";

export default function ShowProgram(props) {
  const router = useRouter();
  const { dispatch } = useContext(Store);
  const { program } = props;

  const addToCartHandler = async () => {
    const { data } = await axios.get(`/api/programmes/${program._id}`);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...program, quantity: 1 } });
    router.push("/cart");
  };

  return (
    <>
      <div>
        <h1>{program.name}</h1>
        <Link href="/programmes">
          <h4>Back to Program Listing</h4>
        </Link>
      </div>
      <Grid container spacing={1}>
        <Grid item md={3} xs={5}>
          <Image
            src={program.image}
            alt={program.name}
            width={200}
            height={200}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <h1>Name: {program.name}</h1>
            </ListItem>
            <ListItem>Program Start Date: {program.start}</ListItem>
            <ListItem>Program End Date: {program.end}</ListItem>
            <ListItem>Price: ${program.price}</ListItem>
            <ListItem>Decription: {program.description}</ListItem>
            <ListItem>
              <Button
                href="/cart"
                fullWidth
                variant="contained"
                color="primary"
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await mongodb.connect();
  const program = await Program.findOne({ slug }).lean();
  await mongodb.disconnect();
  return {
    props: {
      program: mongodb.convertDocToObj(program),
    },
  };
}
