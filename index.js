const express =  require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const accountRoute =  require("./router/account");
const roleRoute =  require("./router/role");

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
app.use("/signup/account", accountRoute);
app.use("/v1/role", roleRoute);


app.listen(8000, ()=>{
    console.log("Server is Running...");
});
