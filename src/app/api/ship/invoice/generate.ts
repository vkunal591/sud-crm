import { PDFDocument } from 'pdf-lib';
import mongoose from 'mongoose';
import Invoice from '@/lib/models/Invoice';

async function connectDb() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export default async function handler(req: { query: { invoiceId: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): any; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer<ArrayBuffer>) => void; }) {
  const { invoiceId } = req.query;
  await connectDb();

  const invoice = await Invoice.findById(invoiceId).populate('shipId');
  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  page.drawText(`Invoice for: ${invoice.customerName}`, { x: 50, y: height - 50, size: 20 });
  page.drawText(`Ship: ${invoice.shipId.name}`, { x: 50, y: height - 100, size: 15 });
  page.drawText(`Amount: $${invoice.amount}`, { x: 50, y: height - 150, size: 15 });
  
  const pdfBytes = await pdfDoc.save();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `inline; filename="invoice-${invoiceId}.pdf"`);
  res.send(Buffer.from(pdfBytes));
}
