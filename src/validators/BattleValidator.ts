import {body, query} from 'express-validator';
import { resolve } from 'path';
import Battle from '../models/Battle';
import { MainValidator } from './mainValidator';


export class BattleValidators {
static search() {
  return [query('king', 'king is Required').isString()
  .custom(async(king, {req}) => {
    if (king && !('type' in req.query)) {
      const attackerKing = await Battle.find({attacker_king: king})
      const defenderKing = await Battle.find({defender_king: king})
      return MainValidator.validation(attackerKing, defenderKing, req, 'kings')
    }else{
    req.kings=[]
    }
    }
  ),
  query('type').custom(async(type, {req}) => {
  
    if(type && !('location' in req.query)) {
      const attackerKing = await Battle.find({attacker_king: req.query.king, battle_type:type})
      const defenderKing = await Battle.find({defender_king: req.query.king, battle_type:type})
      return MainValidator.validation(attackerKing, defenderKing, req, 'type')
    }
    else{
    req.type=[]
    return true
    }
  }),

  query('location').custom(async(location, {req}) => {
    const searchField = location
    if(location) {
      const attackerKing = await Battle.find({attacker_king: req.query.king, battle_type:req.query.type,location: {$regex:searchField, $options:'$i'}})
      const defenderKing = await Battle.find({defender_king: req.query.king, battle_type:req.query.type, location: {$regex:location, $options:'$i'}})
      return MainValidator.validation(attackerKing, defenderKing, req, 'location')
    }else{
    req.location=[]
    return true
    }
  })

];
}
}