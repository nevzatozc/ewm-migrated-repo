//Dosyalar dogru yazılıyor mu, ve migration calısıyor mu
const fs = require("fs-extra");
const path = require("path");

const migration = require("../src/migrationService");

const OUTPUT_DIR = path.join(__dirname, "../output-repo");

describe("Migration Service", () => {
  beforeAll(async () => {
    await fs.remove(OUTPUT_DIR);
  });

  test("should migrate EWM to git repo structure", async () => {
    await migration.migrate();

    const appFile = await fs.pathExists(
      path.join(OUTPUT_DIR, "app.js")
    );

    const serviceFile = await fs.pathExists(
      path.join(OUTPUT_DIR, "service.js")
    );

    expect(appFile).toBe(true);
    expect(serviceFile).toBe(true);
  });
});