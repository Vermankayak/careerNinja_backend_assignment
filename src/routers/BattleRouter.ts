import { Router } from "express"
import { BattleController } from "../controllers/BattleController";
import { GlobalMiddleWare } from "../middleware/GlobalMiddleware";
import { BattleValidators } from "../validators/BattleValidator";


export class BattleRouter{
  public router : Router
  constructor(){
    this.router = Router()
    this.getRoutes()
  }
  getRoutes() {
   this.router.get('/list-location', BattleController.listLocation);
   this.router.get('/list-types', BattleController.listTypes);
   this.router.get('/list-kings', BattleController.listKing);
   this.router.get('/count',BattleController.count);
   this.router.get('/data-ingestor', BattleController.ingestor)
    this.router.get('/search', BattleValidators.search(), GlobalMiddleWare.checkError, BattleController.search)
  }
  
}
export default new BattleRouter().router;