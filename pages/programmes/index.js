import Head from "next/head";
import clientPromise from "../../util/mongodb";

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const db = client.db("codewordco");
  const data = await db.collection("programmes").find({}).toArray();

  const programmes = JSON.parse(JSON.stringify(data));

  return {
    props: { programmes: programmes },
  };
}

export default function Programmes({ programmes }) {
  return (
    <>
      <Head>
        <title>CodewordCo | Programme list</title>
      </Head>
      <h1>Programme List</h1>
      {programmes &&
        programmes.map((program) => (
          <div key={program.id}>
            <a>
              <h3>{program.name}</h3>
              <p>Decription: {program.description}</p>
            </a>
          </div>
        ))}
    </>
  );
}
