import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  emoji: String,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  reactions: [reactionSchema]
}, {
  timestamps: true
});

export default mongoose.model('Message', messageSchema);