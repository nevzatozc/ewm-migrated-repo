const { createGit } = require("./gitFactory");
const { getChangesets } = require("./ewmClient");

async function migrate(options = {}) {
  const git = createGit();
  const changesets = await getChangesets();

  for (const change of changesets) {
    applyChangeset(git, change);
  }

  const shouldSkipPush =
    options.skipPush === true ||
    process.env.NODE_ENV === "test" ||
    process.env.CI === "true";

  if (!shouldSkipPush) {
    await safePush(git);
  } else {
    console.log("Skipping push (test/ci mode)");
  }

  return git;
}

function applyChangeset(git, change) {
  console.log(`Applying changeset ${change.id}`);

  for (const file of change.files) {
    if (git.addFile) {
      git.addFile(file.path, file.content);
    }
  }

  if (git.commit) {
    git.commit(
      change.message,
      change.author,
      change.date
    );
  }
}

async function safePush(git) {
  if (!git.push) return;

  await git.push("origin", "main");
}

module.exports = { migrate };