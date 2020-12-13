"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleRouter = void 0;
const express_1 = require("express");
const BattleController_1 = require("../controllers/BattleController");
const GlobalMiddleware_1 = require("../middleware/GlobalMiddleware");
const BattleValidator_1 = require("../validators/BattleValidator");
class BattleRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
    }
    getRoutes() {
        this.router.get('/list-location', BattleController_1.BattleController.listLocation);
        this.router.get('/list-types', BattleController_1.BattleController.listTypes);
        this.router.get('/list-kings', BattleController_1.BattleController.listKing);
        this.router.get('/count', BattleController_1.BattleController.count);
        this.router.get('/data-ingestor', BattleController_1.BattleController.ingestor);
        this.router.get('/search', BattleValidator_1.BattleValidators.search(), GlobalMiddleware_1.GlobalMiddleWare.checkError, BattleController_1.BattleController.search);
    }
}
exports.BattleRouter = BattleRouter;
exports.default = new BattleRouter().router;
