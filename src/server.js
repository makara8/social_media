const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
require("./db");
const authRoute = require("./routes/authRoute");
const FriendRoute = require("./routes/friendRoute");
const authMiddleware = require("./middleware/authMiddleware");
const postRoute = require("./routes/postRoute");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));

//auth
app.use("/auth", authRoute);
app.use("/friend", authMiddleware, FriendRoute);
app.use("/post", authMiddleware, postRoute);

app.listen(process.env.PORT, () => {
  console.log("server run on port 3000");
});
