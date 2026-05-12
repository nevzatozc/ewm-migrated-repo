const { migrate } = require("../src/migrationService");
beforeEach(() => {
  jest.clearAllMocks();
});
test("migration works", async () => {
  const git = await migrate({ skipPush: true });
  expect(git).toBeDefined();
});

test("should migrate safely without pushing", async () => {
  const git = await migrate({
    skipPush: true
  });

  const log = git.log();

  expect(log.all.length).toBeGreaterThan(0);
});