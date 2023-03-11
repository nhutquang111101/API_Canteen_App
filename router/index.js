const accountRoute =  require("./router/account");
const roleRoute =  require("./router/role");
const path = require("path");
const accountRoute =  require("./router/account");
const roleRoute =  require("./router/role");
const categoryRoute =  require("./router/category");
const foodRoute =  require("./router/food");
const billRoute =  require("./router/bill");

const route = app => {
    app.use(
        "/uploads",
        express.static(path.join(__dirname, "uploads"))
      );
      app.use("/signup/account", accountRoute);
      app.use("/v1/role", roleRoute);
      app.use("/v1/category", categoryRoute);
      app.use("/v1/food", foodRoute);
      app.use("/v1/bill", billRoute);
}


module.exports = route;