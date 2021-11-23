import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Program from '../../models/programModel';
import mongodb from '../../utils/mongodb';
import axios from 'axios';
import { Store } from '../../utils/Store';
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Button, Grid, List, ListItem } from "@mui/material";

export default function ProgramScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { program } = props;

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/programmes/${program._id}`);
    if (data.seatsAvailable < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...program, quantity } });
    router.push('/cart');
  };

  return (
    <Layout>
      <div>
      <Link href="/programmes">Back to Program Listings</Link>
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
              <h1>{program.name}</h1>
            </ListItem>
            <ListItem>Program Start Date: {program.start}</ListItem>
            <ListItem>Program End Date: {program.end}</ListItem>
            <ListItem>Price: ${program.price}</ListItem>
            <ListItem>Description: {program.description}</ListItem>
            <ListItem>Class size: {program.seatsAvailable > 0 ? 'Available' : 'Unavailable'}</ListItem>
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
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await mongodb.connect();
  const program = await Program.findOne({ slug }.lean());
  await mongodb.disconnect();
  return {
    props: {
      program: mongodb.convertDocToObj(program),
    },
  };
}