import nc from 'next-connect';
import Program from '../../models/programModel';
import mongodb from '../../utils/mongodb';
import data from '../../utils/data';
import User from '../../models/userModel';

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Program.deleteMany();
  await Program.insertMany(data.programmes);
  await mongodb.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
