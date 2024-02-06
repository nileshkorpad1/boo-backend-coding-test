import mongoose, { Schema, Document } from 'mongoose';

interface IComment extends Document {
  content: string;
}

const commentSchema: Schema = new Schema({
  content: { type: String, required: true }
});

export default mongoose.model<IComment>('Comment', commentSchema);
