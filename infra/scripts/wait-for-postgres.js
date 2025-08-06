const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready", handleReturn);
  function handleReturn(error, stdout, stderr) {
    if (stdout.search("accepting connections") == -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log("\nPostgres is ready\n");
  }
}
console.log("\n\nwaiting for postgres to be ready...");
checkPostgres();
