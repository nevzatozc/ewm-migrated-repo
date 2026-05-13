function createGit() {
  const fs = require("fs");
  const path = require("path");

  const commits = [];

  return {
    addFile: (filePath, content) => {
      let base = "output-repo";

      const ext = path.extname(filePath);

      if (ext === ".js") base += "/js";
      if (ext === ".c" || ext === ".h") base += "/c";

      const fullPath = path.join(base, path.basename(filePath));

      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
      fs.writeFileSync(fullPath, content);
    },

    commit: (message, author, date) => {
      commits.push({
        message,
        author,
        date
      });
    },

    log: () => ({
      all: commits
    }),

    push: async () => {
      console.log("Push simulated");
    }
  };
}

module.exports = { createGit };