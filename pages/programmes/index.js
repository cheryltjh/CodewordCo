import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import data from '../../utils/data';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Programmes() {
  return (
    <Layout>
      <div>
        <h1>Programmes</h1>
        <Grid container spacing={3}>
          {data.programmes.map((program) => (
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
                  <Button Link href={`/program/${program.slug}`} size="small" color="primary">
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