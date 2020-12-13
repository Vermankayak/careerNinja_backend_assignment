import Battle from '../models/Battle';
import { getEnvironmentVariables } from "../environment/env";
const csvtojson = require("csvtojson");

export class BattleController {


static async listLocation(req, res, next) {
  const locations = await Battle.distinct('location')
  const index = locations.indexOf("");
  if (index > -1) {
    locations.splice(index, 1);
  }
  res.json({
    message:"Successfully Fetched Locations",
    locations:locations,
    count: locations.length
  })
}
static async listTypes(req, res, next) {
  const types = await Battle.distinct('battle_type')
  const index = types.indexOf("");
  if (index > -1) {
    types.splice(index, 1);
  }
  res.json({
    message:"Successfully Fetched Battle Types",
    types:types,
    count: types.length
  })
}

static async listKing(req, res, next) {
  const attackerKing = await Battle.distinct('attacker_king')
  const defenderKing = await Battle.distinct('defender_king')
  let kings = [...attackerKing, ...defenderKing]
  kings = [...new Set(kings)]
  const index = kings.indexOf("");
  if (index > -1) {
    kings.splice(index, 1);
  }
  res.json({
    message:"Successfully Fetched Kings",
    kings:kings,
    count: kings.length
  })
}
static async count(req, res, next) {
  const count = await Battle.find({})

  res.json({
    message:"Successfully Fetched battle Count",
    count:count.length
  })
}

static search(req, res, next) {
  try{
    if (req.location[0]) {
      res.json({data:req.location, count:req.location.length})
    }else if(req.type[0]){
      res.json({data:req.type, count:req.type.length})
    }else if(req.kings[0]){
      res.json({data:req.kings, count:req.kings.length})
    }else{
      res.status(404).send({message:"No data Found", count:req.kings.length})
    }
}catch(e) {
  next(e)
}
}

static ingestor(req, res, next) {
  let url = getEnvironmentVariables().db_url

  csvtojson().fromFile("C:/Users/ADMIN/Downloads/battles.csv").then(async(csvData) => {
      for (let i of csvData) {
        await new Battle(i).save();
      }
      res.json({
        message: "Data has been loaded into database",
        status: 200
      })
  
  })
}

}