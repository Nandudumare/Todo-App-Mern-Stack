const express = require("express");
const cors = require("cors");
const connection = require("./Database/db");
const user = require("./Controller/user");
const todo = require("./Controller/todo");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://admirable-haupia-6a5610.netlify.app",
      "https://todo-application-beta.vercel.app",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", user);

app.use("/todo", todo);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server started");
  } catch (err) {
    console.log(err);
  }
});
