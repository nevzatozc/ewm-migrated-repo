const { migrate } = require("./migrationService");

async function run() {
  const git = await migrate();

  console.log("Migration completed");

  if (git.log) {
    console.log("Commits:", git.log());
  }
}

run();