const express = require("express");
const cors = require("cors");

const app = express();

var corOption = {
  origin: "https://localhost:8081",
};

//midleware

app.use(cors(corOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// router
const router = require("./Routes/ProductsRoutes.js");
app.use("/api/products", router);

const catRouter = require("./Routes/CategoryRoutes.js");
app.use("/api/category", catRouter);
//testing api
app.get("/", (req, res) => {
  res.json({ message: "hello friends how are you...." });
});

// api for paggination

app.get("/paginatedUser", async (req, res) => {
  res.json("paginated");
});

const PORT = process.env.PORT || 8081;

//server

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
