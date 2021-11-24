// =======================================
//              DEPENDENCIES
// =======================================
require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path")
const session = require("express-session");
const PORT = process.env.PORT ?? 3000;
const mongoose = require("mongoose");
const productRouter = require("./backend/routers/productRouter");
const userRouter = require("./backend/routers/userRouter");
const MONGO_URI = process.env.MONGO_URI 

// =======================================
//              CONFIGURATION
// =======================================
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
mongoose.connection.on("error", (err) =>
  console.log(err.message + "Mongod not running")
);

// =======================================
//              MIDDLEWARE
// =======================================
app.use(express.static(path.join(__dirname, "./frontend/build")));
// for session
app.use(
  session({
    secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
    resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
    saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", productRouter);
app.use("/api", userRouter);

const Product = require("./backend/models/productModel");
app.get("/", (req, res) => {
  Product.create(
    {
      name: "Java",
      description: "Learn!",
      image: "test",
      price: "145",
      seatsAvailable: "12",
    },
    (error, createdProduct) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      // .json() will send proper headers in response so client knows it's json coming back
      res.status(200).send(createdProduct);
    }
  );
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

// =======================================
//              LISTENER
// =======================================
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));