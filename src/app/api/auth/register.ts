import bcrypt from 'bcrypt';
import User from '../../../models/User';
import mongoose from 'mongoose';

async function connectDb() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI!);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    await connectDb();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
