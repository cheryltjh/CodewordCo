import clientPromise from '../../util/mongodb';

export default async function (req, res) {
  const client = await clientPromise;
  const db = client.db("codewordco");
  const data = await db.collection("programmes").find({}).toArray();
  res.json({data});
}