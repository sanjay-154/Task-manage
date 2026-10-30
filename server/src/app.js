require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const express = require("express");
const cors = require("cors");
const app = express();
const todoRoutes = require("../src/routes/Todoroutes")
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("TODO API is runing...");
});

app.get("/api/test", (req, res) => {
  res.json({
    message: "Backend connected successfully!",
  });
});

app.use("/api/todos",todoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
