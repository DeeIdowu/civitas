const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect DB:
connectDB();

//init Middleware to obtain req.body for users.js:
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

//To access the routes/ define routes
app.use("/api/users", require("./routes/api/users")); //for endpoint to users
app.use("/api/auth", require("./routes/api/auth")); //for endpoint to auth
app.use("/api/posts", require("./routes/api/posts")); //for endpoint to posts
app.use("/api/profile", require("./routes/api/profile")); //for endpoint to profile

const PORT = process.env.PORT || 5000; //Default to 5000

app.listen(PORT, () => console.log(`Server started on ${PORT}`)); //callback upon success
