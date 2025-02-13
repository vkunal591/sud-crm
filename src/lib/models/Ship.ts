import mongoose, { Document, Schema } from 'mongoose';

interface IShip extends Document {
  name: string;
  type: string;
  capacity: number;
}

const shipSchema = new Schema<IShip>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: Number, required: true },
});

export default mongoose.models.Ship || mongoose.model<IShip>('Ship', shipSchema);
