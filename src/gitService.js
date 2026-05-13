const simpleGit = require("simple-git");

const git = simpleGit();

async function initRepo(repoPath) {
  await git.cwd(repoPath);

  await git.init();

  await git.addConfig(
    "user.name",
    "EWM Migrator"
  );

  await git.addConfig(
    "user.email",
    "migrator@company.com"
  );
}

async function commitAll(
  repoPath,
  message,
  author,
  date
) {
  await git.cwd(repoPath);

  await git.add("./*");

  await git.commit(message, {
    "--author": `${author} <${author}@company.com>`,
    "--date": date,
    "--allow-empty": null,
  });
}

async function setupRemote(repoPath, remoteUrl) {
  await git.cwd(repoPath);

  const remotes = await git.getRemotes();

  const hasOrigin = remotes.find(
    r => r.name === "origin"
  );

  if (!hasOrigin) {
    await git.addRemote(
      "origin",
      remoteUrl
    );
  }
}

async function push(repoPath) {
  await git.cwd(repoPath);

  await git.push(
    "origin",
    "main",
    ["-u", "--force"]
  );
}

module.exports = {
  initRepo,
  commitAll,
  setupRemote,
  push,
};