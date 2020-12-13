import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const battleSchema = new mongoose.Schema({
      name: {type: String, required: false},
      year:  {type: String, required: false},
      battle_number:  {type: String, required: false},
      attacker_king:  {type: String, required: false, index:{background:true}},
      defender_king:  {type: String, required: false, index:{background:true}},
      attacker_1:  {type: String, required: false},
      attacker_2:  {type: String, required: false},
      attacker_3:  {type: String, required: false},
      attacker_4:  {type: String, required: false},
      defender_1:  {type: String, required: false},
      defender_2: {type: String, required: false},
      defender_3: {type: String, required: false},
      defender_4:  {type: String, required: false},
      attacker_outcome:  {type: String, required: false},
      battle_type:  {type: String, required: false},
      major_death:  {type: String, required: false},
      major_capture:  {type: String, required: false},
      attacker_size:  {type: String, required: false},
      defender_size:  {type: String, required: false},
      attacker_commander:  {type: String, required: false},
      defender_commander:  {type: String, required: false},
      summer:  {type: String, required: false},
      location:  {type: String, required: false},
      region:  {type: String, required: false},
      note:  {type: String, required: false},
});

//We can create indexes in case size of database increases.

// battleSchema.index({attacker_king:1, battle_type:1}, {background:true})
// battleSchema.index({defender_king:1, battle_type:1}, {background:true})
// battleSchema.index({attacker_king:1, battle_type:1, location:1}, {background:true})
// battleSchema.index({defender_king:1, battle_type:1, location:1}, {background:true})

export default model('battles', battleSchema);