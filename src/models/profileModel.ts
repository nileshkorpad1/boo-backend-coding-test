import mongoose, { Schema, Document } from 'mongoose';

interface IProfile extends Document {
  imageUrl: string;
  name: string;
  phone: string;
  email: string;
  description: string;
}

const profileSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true }
});

export default mongoose.model<IProfile>('Profile', profileSchema);
