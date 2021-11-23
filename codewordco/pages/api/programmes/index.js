import nc from 'next-connect';
import Program from '../../../models/programModel';
import mongodb from '../../../utils/mongodb';

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  const programmes = await Program.find({});
  await mongodb.disconnect();
  res.send(programmes);
});

export default handler;
