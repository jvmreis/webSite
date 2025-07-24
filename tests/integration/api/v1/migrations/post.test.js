import database from "infra/database.js";

beforeAll(cleanDatabase);
async function cleanDatabase() {
  // Implement your database cleaning logic here
  await database.query("drop schema public cascade; create schema public;");
  // This could involve dropping tables, truncating data, etc.
  console.log("Cleaning database...");
}
test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(201);
  const responseBody = await response.json();
  console.log("responseBody:", responseBody);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0); // Assuming there are migrations available

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const responseBody2 = await response2.json();
  console.log("responseBody2:", responseBody2);
  expect(Array.isArray(responseBody2)).toBe(true);
  expect(responseBody2.length).toBe(0); // Assuming there are migrations available
});
