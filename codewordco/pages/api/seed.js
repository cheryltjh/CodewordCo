import Program from "../../models/programModel"
import nc from "next-connect";
import connect from "../../utils/mongodb";
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await connect();
  await Program.deleteMany();
  await Program.insertMany(data.programmes);
  res.send({message: 'seeded successfully'});
});

export default handler;