
export class MainValidator{
  static validation(attackerKing, defenderKing, req, tag) {
    if (attackerKing[0] || defenderKing[0]) {
      const kings = [...attackerKing, ...defenderKing]
      if (tag === 'kings'){
        req.kings = kings
      }else if(tag === 'type') {
        req.type = kings
      }else{
        req.location = kings
      }
      return true
    }else{
      if (tag === 'kings'){
        req.kings = []
      }else if(tag === 'type') {
        req.type = []
      }else{
        req.location = []
      }
    }
  }
}