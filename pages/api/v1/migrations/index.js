import migrationsRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";
import db from "node-pg-migrate/dist/db";

async function migrations(req, res) {
  const dbClient = await database.getNewClient();
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
    const pendingMigrations = await migrationsRunner(defaultMigrationsOptions);
    await dbClient.end(); // Fechar o cliente após a execução
    return res.status(200).json(pendingMigrations);
  }

  if (req.method === "POST") {
    console.log("entering POST method");
    const migratedMigrations = await migrationsRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });
    await dbClient.end(); // Fechar o cliente após a execução

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations);
    }
    return res.status(200).json(migratedMigrations);
  }

  return res.status(405).json({ error: "Method not allowed" });
}

export default migrations;
