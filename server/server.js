const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTER
app.use("/", require("./router/auth"));
app.use("/user", require("./router/user"));

app.listen(3000, () => console.log("Server is running"));
