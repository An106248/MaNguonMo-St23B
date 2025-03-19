const express = require("express");
const bodyParser = require("body-parser");
const bookingRoutes = require("../routes/bookingRoutes");

const app = express();

// Cấu hình EJS
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", bookingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
