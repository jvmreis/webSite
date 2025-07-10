import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });
  await client.connect();

  // Using try and catch to handle connection errors
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await client.end();
  }

  return result;
}
export default {
  query: query,
};
