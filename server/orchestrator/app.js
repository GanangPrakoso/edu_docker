if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const axios = require("axios");
const os = require("os");

const PORT = Number(process.env.PORT) || 4000;
const APP_SERVICE_URL = process.env.APP_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    message: "orchestrator is running!",
    os: os.platform(),
  });
});

app.get("/characters", async (_, res) => {
  try {
    const { data } = await axios.get(APP_SERVICE_URL + "/characters");
    res.json({ characters: data });
  } catch (error) {
    res.status(500).json({ message: "ISE" });
  }
});

app.get("/users", async (_, res) => {
  try {
    const { data } = await axios.get(USER_SERVICE_URL + "/users");
    res.json({ users: data });
  } catch (error) {
    res.status(500).json({ message: "ISE" });
  }
});

app.listen(PORT, () => {
  console.log(`orchestrator is running on port ${PORT}`);
});
