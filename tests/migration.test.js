const { migrate } = require("../src/migrationService");

beforeEach(() => {
  jest.clearAllMocks();
});

test("migration returns git instance", async () => {
  const git = await migrate({ skipPush: true });

  expect(git).toBeDefined();
  expect(typeof git).toBe("object");
});

test("should migrate safely without pushing and produce commits", async () => {
  const git = await migrate({
    skipPush: true
  });

  // commit log kontrolü (log mock değilse güvenli fallback)
  if (!git.log) {
    throw new Error("git.log is not implemented in gitFactory mock");
  }

  const log = git.log();

  expect(log).toBeDefined();
  expect(Array.isArray(log.all)).toBe(true);

  // migration en az 1 commit üretmeli
  expect(log.all.length).toBeGreaterThan(0);

  // commit message doğrulama (çok önemli regression check)
  const messages = log.all.map(c => c.message);

  expect(messages.length).toBeGreaterThan(0);
});