
import Ship from '@/lib/models/Ship';
import mongoose from 'mongoose';

async function connectDb() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export default async function handler(req: { query: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
  const { id } = req.query;
  await connectDb();

  const ship = await Ship.findById(id);
  if (ship) {
    res.status(200).json(ship);
  } else {
    res.status(404).json({ error: 'Ship not found' });
  }
}
