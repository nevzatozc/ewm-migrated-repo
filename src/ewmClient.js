async function getChangesets() {
  return [
    {
      id: 1,
      author: "ahmet",
      message: "Initial commit",
      date: "2025-01-01",
      files: [{ path: "app.js", content: "console.log('v1')" }]
    },
    {
      id: 2,
      author: "ahmet",
      message: "Update",
      date: "2025-01-02",
      files: [{ path: "app.js", content: "console.log('v2')" }]
    }
  ];
}

module.exports = { getChangesets };