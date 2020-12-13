"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const env_1 = require("./environment/env");
const mongoose = require("mongoose");
const BattleRouter_1 = require("./routers/BattleRouter");
var bodyParser = require('body-parser');
//We are here following Single responsibility principle such that every method in our class is only executing single responsibility.
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
    }
    setConfiguration() {
        this.connectMongoDB();
        this.configureBodyParser();
    }
    connectMongoDB() {
        const databaseUrl = env_1.getEnvironmentVariables().db_url;
        mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("mongodb is connected");
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    setRoutes() {
        this.app.use('/api/battle/', BattleRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something Went Wrong. Please Try Again',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
