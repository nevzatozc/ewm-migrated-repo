async function getChangesets() {
  return [
    {
      id: 1,
      author: "ahmet",
      message: "Initial JS + C project",
      date: "2025-01-01T10:00:00",
      files: [
        {
          path: "app.js",
          content: "console.log('v1');"
        },
        {
          path: "c/main.c",
          content: "#include <stdio.h>\nint main(){printf(\"v1\");return 0;}"
        }
      ]
    },
    {
      id: 2,
      author: "mehmet",
      message: "Add service layer + C utils",
      date: "2025-01-02T11:00:00",
      files: [
        {
          path: "service.js",
          content: "module.exports = {};"
        },
        {
          path: "c/utils.c",
          content: "#include <stdio.h>\nvoid print(){printf(\"ok\");}"
        },
        {
          path: "c/utils.h",
          content: "void print();"
        }
      ]
    },
    {
  id: 3,
  author: "ahmet",
  message: "Finalize integration",
  date: "2025-01-03T12:00:00",
  files: [
    {
      path: "app.js",
      content: "console.log('v2 final');"
    },
    {
      path: "c/main.c",
      content: "#include \"utils.h\"\nint main(){print();}"
    }
  ]
}
  ];
}

module.exports = { getChangesets };