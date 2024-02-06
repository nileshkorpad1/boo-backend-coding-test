import mongoose, { Schema, Document } from 'mongoose';

interface IVote extends Document {
  commentId: string;
  mbti?: string;
  enneagram?: string;
  zodiac?: string;
}

const voteSchema: Schema = new Schema({
  commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  mbti: { type: String },
  enneagram: { type: String },
  zodiac: { type: String }
});

export default mongoose.model<IVote>('Vote', voteSchema);
