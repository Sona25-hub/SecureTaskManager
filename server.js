const express = require("express");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Secure Task Manager Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
