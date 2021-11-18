import Program from "../../models/Program";
import nc from "next-connect";
import mongodb from "../../util/mongodb";
import data from "../../util/data";
import User from "../../models/User";

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Program.deleteMany();
  await Program.insertMany(data.programmes);
  await mongodb.disconnect();
  res.send({message: 'seeded successfully'});
});

export default handler;