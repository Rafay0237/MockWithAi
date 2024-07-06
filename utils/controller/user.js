import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { User } from '../schema';

const  SignUp=async(req, res)=> {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, userName, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 9);

    const [newUser] = await db
      .insert(User)
      .values({
        email,
        userName,
        password: hashedPassword,
      })
      .returning();

    const token = jwt.sign({ id: newUser.id, email: newUser.email },
         process.env.NEXT_PUBLIC_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        userName: newUser.userName,
      },
      token,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export default SignUp
