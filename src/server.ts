import * as express from 'express'
import {getEnvironmentVariables} from './environment/env'
import * as mongoose from 'mongoose'
import BattleRouter from './routers/BattleRouter'
var bodyParser = require('body-parser')


//We are here following Single responsibility principle such that every method in our class is only executing single responsibility.
export class Server{
  public app: express.Application = express()
  constructor() {
    this.setConfiguration()
    this.setRoutes()
  }
  setConfiguration() {
      this.connectMongoDB();
      this.configureBodyParser()
  }
  connectMongoDB() {
    const databaseUrl = getEnvironmentVariables().db_url
    mongoose.connect(databaseUrl, {useNewUrlParser:true, useUnifiedTopology:true}).then(() => {
    console.log("mongodb is connected")
  })
  }

  configureBodyParser() {
    this.app.use(bodyParser.urlencoded({extended:true}))
  }
  setRoutes () {
    this.app.use('/api/battle/', BattleRouter)
  }
  error404Handler() {
    this.app.use((req, res) => {
        res.status(404).json({
            message: 'Not Found',
            status_code: 404
        });
    })
}
  handleErrors() {
    this.app.use((error, req, res, next) => {
        const errorStatus = req.errorStatus || 500;
        res.status(errorStatus).json({
            message: error.message || 'Something Went Wrong. Please Try Again',
            status_code: errorStatus
        })
    })
}
}