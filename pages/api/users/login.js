import nc from "next-connect";
import bcrypt from "bcrypt";
import User from "../../../models/User";
import mongodb from "../../../util/mongodb";
import { signToken } from "../../../util/authdb";

const handler = nc();

handler.post(async (req, res) => {
  await mongodb.connect();
  const user = await User.findOne({ email: req.body.email });
  await mongodb.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
});

export default handler;