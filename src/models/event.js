import mongoose from 'mongoose';

let eventSchema = new mongoose.Schema({
  event_id: { type: Number, required: true, unique: true, index: true },
  event_date: { type: Date, required: true },
  base_title: { type: String, required: true },
  title_tag_line: String,
  feature_image: String,
  updated: { type: Date, default: Date.now }
});

export default mongoose.model('Event', eventSchema);
