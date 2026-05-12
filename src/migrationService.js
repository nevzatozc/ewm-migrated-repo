const fs = require("fs-extra");
const path = require("path");

const ewmClient = require("./ewmClient");
const gitService = require("./gitService");

const OUTPUT_DIR = path.join(
  __dirname,
  "..",
  "output-repo"
);

const REMOTE_URL =
  "git@github.com:nevzatozc/ewm-migrated-repo.git";

async function migrate() {
  const changesets =
    await ewmClient.getChangesets();

  await fs.ensureDir(OUTPUT_DIR);

  await gitService.initRepo(
    OUTPUT_DIR
  );

  for (const change of changesets) {
    console.log(
      `Applying changeset ${change.id}`
    );

    for (const file of change.files) {
      const targetPath = path.join(
        OUTPUT_DIR,
        file.path
      );

      await fs.outputFile(
        targetPath,
        file.content
      );
    }

    await gitService.commitAll(
      OUTPUT_DIR,
      change.message,
      change.author,
      change.date
    );
  }

  // branch rename
  const simpleGit = require("simple-git");
  const git = simpleGit(OUTPUT_DIR);

  await git.branch(["-M", "main"]);

  // remote
  await gitService.setupRemote(
    OUTPUT_DIR,
    REMOTE_URL
  );

  // push
  await gitService.push(OUTPUT_DIR);

  console.log(
    "Migration + Push completed"
  );
}

module.exports = {
  migrate,
};