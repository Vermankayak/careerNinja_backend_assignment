"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BattleController = void 0;
const Battle_1 = require("../models/Battle");
const env_1 = require("../environment/env");
const csvtojson = require("csvtojson");
class BattleController {
    static listLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield Battle_1.default.distinct('location');
            const index = locations.indexOf("");
            if (index > -1) {
                locations.splice(index, 1);
            }
            res.json({
                message: "Successfully Fetched Locations",
                locations: locations,
                count: locations.length
            });
        });
    }
    static listTypes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const types = yield Battle_1.default.distinct('battle_type');
            const index = types.indexOf("");
            if (index > -1) {
                types.splice(index, 1);
            }
            res.json({
                message: "Successfully Fetched Battle Types",
                types: types,
                count: types.length
            });
        });
    }
    static listKing(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const attackerKing = yield Battle_1.default.distinct('attacker_king');
            const defenderKing = yield Battle_1.default.distinct('defender_king');
            let kings = [...attackerKing, ...defenderKing];
            kings = [...new Set(kings)];
            const index = kings.indexOf("");
            if (index > -1) {
                kings.splice(index, 1);
            }
            res.json({
                message: "Successfully Fetched Kings",
                kings: kings,
                count: kings.length
            });
        });
    }
    static count(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield Battle_1.default.find({});
            res.json({
                message: "Successfully Fetched battle Count",
                count: count.length
            });
        });
    }
    static search(req, res, next) {
        try {
            if (req.location[0]) {
                res.json({ data: req.location, count: req.location.length });
            }
            else if (req.type[0]) {
                res.json({ data: req.type, count: req.type.length });
            }
            else if (req.kings[0]) {
                res.json({ data: req.kings, count: req.kings.length });
            }
            else {
                res.status(404).send({ message: "No data Found", count: req.kings.length });
            }
        }
        catch (e) {
            next(e);
        }
    }
    static ingestor(req, res, next) {
        let url = env_1.getEnvironmentVariables().db_url;
        csvtojson().fromFile("C:/Users/ADMIN/Downloads/battles.csv").then((csvData) => __awaiter(this, void 0, void 0, function* () {
            for (let i of csvData) {
                yield new Battle_1.default(i).save();
            }
            res.json({
                message: "Data has been loaded into database",
                status: 200
            });
        }));
    }
}
exports.BattleController = BattleController;
