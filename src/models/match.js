import mongoose from 'mongoose';

let matchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, index: true },
  event_id: {type: Number, required: true},
  fightcard_order: {type: String, required: true},
  fighter1_id: String,
  fighter2_id: String,
  fighter1_first_name: String,
  fighter1_nickname: String,
  fighter1_last_name: String,
  fighter2_first_name: String,
  fighter2_nickname: String,
  fighter2_last_name: String,
  fighter1_full_body_image: String,
  fighter2_full_body_image: String,
  fighter1_weight_class: String,
  fighter2_weight_class: String,
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('Match', matchSchema);
