const MemoryGit = require("../src/memoryGit");

test("Git History structure", () => {
  const git = new MemoryGit();

  git.commit("Initial commit", "a", "2025");
  git.commit("Add service layer", "a", "2025");

  const messages = git.log().all.map(c => c.message);

  expect(messages).toContain("Initial commit");
  expect(messages).toContain("Add service layer");
});