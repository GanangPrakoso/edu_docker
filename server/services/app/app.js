const express = require("express");
const morgan = require("morgan");
const os = require("os");

const app = express();
const PORT = Number(process.env.PORT) || 4002;

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to intro-docker/app service!",
    os: os.platform(),
  });
});

app.get("/characters", async (req, res) => {
  const characters = [
    {
      name: "Count Dracula",
      occupation: "Bloody Vampire",
    },
    {
      name: "Jonathan Harker",
      occupation: "Lawyer",
    },
    {
      name: "Dr. Abraham Van Helsing",
      occupation: "Polymath Doctor",
    },
  ];
  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`this app running on port ${PORT}`);
});
