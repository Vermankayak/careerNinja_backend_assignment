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
exports.BattleValidators = void 0;
const express_validator_1 = require("express-validator");
const Battle_1 = require("../models/Battle");
const mainValidator_1 = require("./mainValidator");
class BattleValidators {
    static search() {
        return [express_validator_1.query('king', 'king is Required').isString()
                .custom((king, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (king && !('type' in req.query)) {
                    const attackerKing = yield Battle_1.default.find({ attacker_king: king });
                    const defenderKing = yield Battle_1.default.find({ defender_king: king });
                    return mainValidator_1.MainValidator.validation(attackerKing, defenderKing, req, 'kings');
                }
                else {
                    req.kings = [];
                }
            })),
            express_validator_1.query('type').custom((type, { req }) => __awaiter(this, void 0, void 0, function* () {
                if (type && !('location' in req.query)) {
                    const attackerKing = yield Battle_1.default.find({ attacker_king: req.query.king, battle_type: type });
                    const defenderKing = yield Battle_1.default.find({ defender_king: req.query.king, battle_type: type });
                    return mainValidator_1.MainValidator.validation(attackerKing, defenderKing, req, 'type');
                }
                else {
                    req.type = [];
                    return true;
                }
            })),
            express_validator_1.query('location').custom((location, { req }) => __awaiter(this, void 0, void 0, function* () {
                const searchField = location;
                if (location) {
                    const attackerKing = yield Battle_1.default.find({ attacker_king: req.query.king, battle_type: req.query.type, location: { $regex: searchField, $options: '$i' } });
                    const defenderKing = yield Battle_1.default.find({ defender_king: req.query.king, battle_type: req.query.type, location: { $regex: location, $options: '$i' } });
                    return mainValidator_1.MainValidator.validation(attackerKing, defenderKing, req, 'location');
                }
                else {
                    req.location = [];
                    return true;
                }
            }))
        ];
    }
}
exports.BattleValidators = BattleValidators;
