const MemoryGit = require("../src/memoryGit");

test("Git History structure and commit ordering", () => {
  const git = new MemoryGit();

  git.commit("Initial commit", "a", "2025-01-01");
  git.commit("Add service layer", "a", "2025-01-02");

  const log = git.log();

  // 1. basic structure check
  expect(log).toBeDefined();
  expect(Array.isArray(log.all)).toBe(true);

  const messages = log.all.map(c => c.message);

  // 2. content validation
  expect(messages).toContain("Initial commit");
  expect(messages).toContain("Add service layer");

  // 3. order validation (git history correctness)
  expect(messages[0]).toBe("Initial commit");
  expect(messages[1]).toBe("Add service layer");
});