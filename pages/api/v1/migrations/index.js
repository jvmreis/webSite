import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

async function migrations(req, res) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const defaultMigrationsOptions = {
      dbClient: dbClient, // Pass the database client directly
      dryRun: true,
      //dir: "infra/migrations", esse metodo de implemtação só funcionaria no linux no windows a \ é invertida
      dir: join(process.cwd(), "infra", "migrations"), // caminho absoluto para a pasta de migrações usando join para garantir compatibilidade entre sistemas operacionais
      direction: "up", // ou "down" para reverter migrações
      verbose: true, // para ver mais detalhes no console
      migrationsTable: "pgmigrations", // nome da tabela onde as migrações são registradas
    };
    if (req.method === "GET") {
      console.log("GET method called");
      const pendingMigrations = await migrationsRunner(
        defaultMigrationsOptions,
      );
      return res.status(200).json(pendingMigrations);
    }

    if (req.method === "POST") {
      console.log("entering POST method");
      const migratedMigrations = await migrationsRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return res.status(201).json(migratedMigrations);
      }
      return res.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error("Error during migrations:", error);
    throw error;
  } finally {
    await dbClient.end(); // Fechar o cliente após a execução
  }
}
export default migrations;
