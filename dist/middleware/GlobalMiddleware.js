"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        }
        else {
            next();
        }
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
