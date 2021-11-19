import { Button, Grid, List, ListItem } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Program from "../../models/Program";
import mongodb from "../../util/mongodb";

export default function ShowProgram(props) {
  const { program } = props;

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
              <Button href="/cart" fullWidth variant="contained" color="primary">
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
