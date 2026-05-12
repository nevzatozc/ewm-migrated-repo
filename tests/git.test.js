const simpleGit = require("simple-git");
const path = require("path");

const repoPath = path.join(__dirname, "../output-repo");

const git = simpleGit(repoPath);

describe("Git History", () => {
  test("should have commits", async () => {
    const log = await git.log();

    expect(log.total).toBeGreaterThan(0);
  });

  test("should contain correct commit messages", async () => {
    const log = await git.log();

    const messages = log.all.map(c => c.message);

    expect(messages).toContain("Initial commit");
    expect(messages).toContain("Add service layer");
  });
});