import database from "infra/database.js";

async function status(req, res) {
  const result = await database.query("SELECT 1 + 1;");
  console.log("Database query result:", result.rows);
  res.status(200).json({ message: "API is running smoothly!" });
}

export default status;
