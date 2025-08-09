import { Client } from "pg";

async function query(queryObject) {
  let client;
  console.log("postgress credentials:", {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  // Using try and catch to handle connection errors
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  } finally {
    await client.end();
  }

}

async function getNewClient() {
  const client = new Client({
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();

  return client;
}
const database ={
  query: query,
  getNewClient: getNewClient,
};
export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  console.log("NODE_ENV:" + process.env.NODE_ENV);
  return process.env.NODE_ENV === "production" ? true : false;
}
