import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import Layout from "../../components/Layout";
import mongodb from "../../utils/mongodb";
import Program from "../../models/programModel";

export default function Programmes(props) {
  const { programmes } = props;

  return (
    <Layout>
      <div>
        <h1>Programmes</h1>
        <Grid container spacing={3}>
          {programmes.map((program) => (
            <Grid item md={4} key={program.name}>
              <Card>
                <Link href={`/programmes/${program.slug}`}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={program.image}
                      title={program.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{program.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions>
                  <Typography>${program.price}</Typography>
                  <Button
                    Link
                    href={`/programmes/${program.slug}`}
                    size="small"
                    color="primary"
                  >
                    Learn more!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await mongodb.connect();
  const programmes = await Program.find({}).lean();
  await mongodb.disconnect();
  return {
    props: {
      programmes: programmes.map(mongodb.convertDocToObj),
    },
  };
}
