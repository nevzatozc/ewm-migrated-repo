const { migrate } = require("../src/migrationService");

test("should migrate safely without pushing", async () => {
  const git = await migrate({
    skipPush: true
  });

  expect(git).toBeDefined();

  if (git.log) {
    expect(git.log().length).toBeGreaterThan(0);
  }
});