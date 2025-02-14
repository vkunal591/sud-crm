import Ship from '../../../models/Ship';
import mongoose from 'mongoose';

async function connectDb() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export default async function handler(req: { method: string; body: { name: any; type: any; capacity: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    await connectDb();
    const { name, type, capacity } = req.body;
    const newShip = new Ship({ name, type, capacity });
    await newShip.save();
    res.status(201).json(newShip);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
