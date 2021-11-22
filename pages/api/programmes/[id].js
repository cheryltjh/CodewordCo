import nc from 'next-connect';
import Program from "../../../models/Program";
import mongodb from "../../../util/mongodb";

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  const program = await Program.findById(req.query.id);
  await mongodb.disconnect();
  res.send(program);
});

export default handler;