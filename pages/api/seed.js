import program from "../../models/program";
import nc from "next-connect";
import mongodb from "../../util/mongodb";
import data from "../../util/data";

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  await program.insertMany(data.programmes);
  await mongodb.disconnect();
  res.send({message: 'seeded successfully'});
});

export default handler;