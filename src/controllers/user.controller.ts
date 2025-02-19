import { Request, Response } from 'express';
import { userSchema } from '../db/schema/user.schema';
import { database } from '../db/db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

export const handleRegisterUser = async (req: Request, res: Response): Promise<any> => {
    const user = req.body;

    try {
        const existingUser = await database.select().from(userSchema).where(eq(userSchema.email, user.email)).limit(1);
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        bcrypt.hash(user.password, 10, async function(err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Internal server error while hashing password');
            }
                
            const newUser = await database.insert(userSchema).values({ username: user.username, email: user.email, password: hash }).returning();
            
            const { password: _, ...userWithoutPassword } = newUser[0];
            res.status(201).json(userWithoutPassword);
        });
    } catch (err) {
        console.error('Error registering new user:', err);
        res.status(500).send('Internal server error while registering new user');
    }
};
