const accountRoute =  require("./router/account");
const roleRoute =  require("./router/role");

const route = app => {
    app.use("/signup/account", accountRoute);
    app.use("/v1/role", roleRoute);
}

module.exports = route;