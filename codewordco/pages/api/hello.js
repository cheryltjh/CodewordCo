import Program from "../../../models/programModel";
import nc from "next-connect";
import connect from "../../../utils/mongodb";

const handler = nc();

handler.get(async (req, res) => {
  await connect();
  const programmes = await Program.find({});
  res.send(programmes);
});

export default handler;