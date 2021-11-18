import program from "../../../models/program"
import nc from "next-connect";
import mongodb from "../../../util/mongodb";

const handler = nc();

handler.get(async (req, res) => {
  await mongodb.connect();
  const programmes = await program.find({});
  await mongodb.disconnect();
  res.send(programmes);
});

export default handler;