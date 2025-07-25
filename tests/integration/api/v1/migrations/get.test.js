import database from "infra/database.js";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  // Implement your database cleaning logic here
  await database.query("drop schema public cascade; create schema public;");
  // This could involve dropping tables, truncating data, etc.
  console.log("Cleaning database...");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  console.log("responseBody:", responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0); // Assuming there are migrations available
});
