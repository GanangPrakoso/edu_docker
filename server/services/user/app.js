const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const os = require("os");

app.get("/", (_, res) => {
  res.status(200).json({
    msg: "user service is running ok",
    os: os.platform(),
  });
});

app.get("/users", (_, res) => {
  const users = [
    {
      username: "Gojo Satoru",
    },
    {
      username: "Makima",
    },
  ];

  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log("user service is running on PORT", PORT);
});
