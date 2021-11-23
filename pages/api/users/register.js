import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/userModel';
import mongodb from '../../../utils/mongodb';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await mongodb.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await mongodb.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
