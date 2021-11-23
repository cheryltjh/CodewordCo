import nc from 'next-connect';
import Program from '../../../../models/programModel';
import mongodb from '../../../../utils/mongodb';

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  const program = await Program.findById(req.query.id);
  await db.disconnect();
  res.send(program);
});

export default handler;
