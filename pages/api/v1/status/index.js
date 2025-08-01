import database from "infra/database.js";

async function status(req, res) {
  const updateAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  //const databaseName = req.query.databaseName;
  console.log("databaseName:", databaseName);
  const databaseOpenConnectionsResult = await database.query(
    // Using parameterized query to prevent SQL injection
    {
      text: "SELECT count(*):: int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    },
    //`SELECT count(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`,
    //"SELECT count(*):: int FROM pg_stat_activity WHERE datname = '" +
    //  databaseName +
    //  "';",
    //"SELECT count(*):: int FROM pg_stat_activity WHERE datname = 'local_db';",
  );

  const databaseOpenConnectionsValue =
    databaseOpenConnectionsResult.rows[0].count;

  res.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        open_connections: databaseOpenConnectionsValue,
      },
    },
  });
}

export default status;
