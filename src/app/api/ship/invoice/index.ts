import Invoice from '../../../models/Invoice';
import Ship from '../../../models/Ship';
import mongoose from 'mongoose';

async function connectDb() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { shipId, date, amount, customerName } = req.body;
    await connectDb();
    
    const ship = await Ship.findById(shipId);
    if (!ship) {
      return res.status(404).json({ error: 'Ship not found' });
    }
    
    const newInvoice = new Invoice({ shipId, date, amount, customerName });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
