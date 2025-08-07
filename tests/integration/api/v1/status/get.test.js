import orchestrator from "tests/orchestrator.js";
beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const currentDate = new Date(responseBody.update_at).toISOString();
  console.log("currentDate:", currentDate);
  expect(responseBody.update_at).toEqual(currentDate);

  //expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.open_connections).toEqual(1);
});

//test.only("teste SQL injection", async () => {
//await fetch("http://localhost:3000/api/v1/status?databaseName=local_db"); // -- iguinora o que vem depois do -- no SQL para corrigir isso usar Query sanization
//await fetch(
// "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
//);
//});
