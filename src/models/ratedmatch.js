import mongoose from 'mongoose';

let ratedMatchSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  match: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
  round1: [{type: Number}]
});

export default mongoose.model('RatedMatch', ratedMatchSchema);
