"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVariables = void 0;
const dev_env_1 = require("./dev.env");
const prod_env_1 = require("./prod.env");
function getEnvironmentVariables() {
    if (process.env.NODE_ENV === "prod") {
        return prod_env_1.prodEnvironment;
    }
    else {
        return dev_env_1.devEnvironment;
    }
}
exports.getEnvironmentVariables = getEnvironmentVariables;
