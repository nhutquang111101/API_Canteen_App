const express =  require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
<<<<<<< HEAD
const path = require("path");
const accountRoute =  require("./router/account");
const roleRoute =  require("./router/role");
const categoryRoute =  require("./router/category");
const foodRoute =  require("./router/food");
const billRoute =  require("./router/bill");
=======

const route = require("./router");
>>>>>>> dev-phminhco

dotenv.config();
//connect DATABASE
mongoose.connect((process.env.MONGODB_URL))
  .then(() => {
    console.log('Connection successful!');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });



app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));

//router
<<<<<<< HEAD
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use("/signup/account", accountRoute);
app.use("/v1/role", roleRoute);
app.use("/v1/category", categoryRoute);
app.use("/v1/food", foodRoute);
app.use("/v1/bill", billRoute);

=======
route(app);
>>>>>>> dev-phminhco


app.listen(8000, ()=>{
    console.log("Server is Running...");
});
