import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  type: {type: String, required: true},
  content: {type: String},
  post_type: {type: String, required: true},
  isDeleted: {type: Boolean, default: false},
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
