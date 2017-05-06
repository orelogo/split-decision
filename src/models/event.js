import mongoose from 'mongoose';

let eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
	  required: true,
    unique: true
  }
});

export default mongoose.model('Event', eventSchema);
