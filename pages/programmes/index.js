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
import mongodb from "../../util/mongodb";
import Program from "../../models/Program";
import Link from "next/link";

export default function Programmes(props) {
  const { programmes } = props;

    return (
        <div>
            <h1>Programmes</h1>
            <Grid container spacing={3}>
            {programmes.map((program) => (
           <Grid item md={4} key={program.name}>
           <Card>
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
             <CardActions>
               <Typography>${program.price}</Typography>
               <Link href={`/programmes/${program.slug}`}>
               <Button size="small" color="primary">
                 Learn more!
               </Button>
               </Link>
             </CardActions>
           </Card>
         </Grid>
       ))}
     </Grid>
   </div>
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
