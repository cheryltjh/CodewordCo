import Head from "next/head";
import Layout from "../components/Layout";
import clientPromise from "../util/mongodb";

export default function Home({ isConnected }) {
  return (
    <Layout>
    <div className="container">
      <h1>Home</h1>
      <h3>Hi! This is the homepage</h3>
    </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands

  let isConnected;
  try {
    const client = await clientPromise;
    isConnected = true;
  } catch (e) {
    console.log(e);
    isConnected = false;
  }

  return {
    props: { isConnected },
  };
}
