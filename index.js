const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const mediaRoutes = require("./routes/media");
const uploadRoutes = require("./routes/upload")

dotenv.config();
const app = express();


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));


//  Middleware functions..
app.use(express.json());  // Parses json request bodies
app.use(express.urlencoded({ extended: true }));  // Parses Form data
app.use(cookieParser());

//  routers ..  seperate routes for login or auth routers and media routes seperately ..
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);
app.use("/upload" , uploadRoutes );



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));