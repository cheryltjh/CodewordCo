require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path")
const PORT = process.env.PORT ?? 4000;
const mongoose = require("mongoose");
const session = require("express-session");
const productRouter = require("./controllers/productRouter");
const enrollRouter = require("./controllers/enrollRouter");
const userRouter = require("./controllers/userRouter");
const sessionRouter = require("./controllers/sessionRouter");
const MONGO_URI = process.env.MONGO_URI 

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
mongoose.connection.on("error", (err) =>
  console.log(err.message + "Mongod not running")
);

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
app.use("/api", enrollRouter);
app.use("/api", userRouter);
app.use("/api", sessionRouter);

const Product = require("./models/productModel");
app.get("/", (req, res) => {
  Product.create(
    {
      name: "JavaScript",
      description: "Learn your foundational knowledge of JavaScript here!",
      start: "22 March 2022",
      end: "22 May 2022",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      price: 145,
      seatsAvailable: 12,
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
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

//listener
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));