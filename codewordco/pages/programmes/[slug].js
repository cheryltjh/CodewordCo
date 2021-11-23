import React from "react";
import { useRouter } from "next/router";
import data from "../../utils/data";
import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import { Button, Grid, List, ListItem } from "@mui/material";

export default function ProgramScreen() {
  const router = useRouter();
  const { slug } = router.query;
  const program = data.programmes.find((a) => a.slug === slug);

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
            <ListItem>Class size: {program.seatsAvailable}</ListItem>
            <ListItem>
              <Button
                href="/cart"
                fullWidth
                variant="contained"
                color="primary"
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
