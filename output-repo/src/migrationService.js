const { createGit } = require("./gitFactory");
const { getChangesets } = require("./ewmClient");

async function migrate(options = {}) {
  const git = createGit();
  const changesets = await getChangesets();

  console.log(`Loaded ${changesets.length} changesets`);

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
  console.log(`\n=== Applying changeset ${change.id} ===`);

  if (!change.files || change.files.length === 0) {
    console.log(`WARNING: changeset ${change.id} has no files`);
    return;
  }

  for (const file of change.files) {
    console.log(`Writing file: ${file.path}`);

    if (!file.path || !file.content) {
      console.log(`INVALID FILE ENTRY in changeset ${change.id}`);
      continue;
    }

    if (git.addFile) {
      git.addFile(file.path, file.content);
    } else {
      console.log("git.addFile is missing!");
    }
  }

  if (git.commit) {
    console.log(`Committing changeset ${change.id}`);
    git.commit(
      change.message,
      change.author,
      change.date
    );
  } else {
    console.log("git.commit is missing!");
  }
}

async function safePush(git) {
  if (!git.push) {
    console.log("git.push not available, skipping push");
    return;
  }

  try {
    await git.push("origin", "main");
    console.log("Push successful");
  } catch (err) {
    console.log("Push failed:", err.message);
  }
}

module.exports = { migrate };