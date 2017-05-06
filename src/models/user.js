import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
  user_name: {
    type: String,
	  required: true,
	  unique: true
  },
  password: {
    type: String,
	  required: true
  }
});

export default mongoose.model('User', userSchema);
