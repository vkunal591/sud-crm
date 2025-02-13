import mongoose, { Document, Schema } from 'mongoose';

interface IInvoice extends Document {
  shipId: mongoose.Schema.Types.ObjectId;
  date: Date;
  amount: number;
  customerName: string;
}

const invoiceSchema = new Schema<IInvoice>({
  shipId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ship', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  customerName: { type: String, required: true },
});

export default mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', invoiceSchema);
