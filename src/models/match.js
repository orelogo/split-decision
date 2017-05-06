import mongoose from 'mongoose';

let matchSchema = new mongoose.Schema({
  event: {type: String, required: true},
  order: {type: Number, required: true},
  competitor1: {type: String, required: true},
  competitor2: {type: String, required: true}
});

export default mongoose.model('Match', matchSchema);
