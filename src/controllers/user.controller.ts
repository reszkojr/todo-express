import { Request, Response } from 'express';
import { userSchema, UserType } from '../db/schema/user.schema';
import { database } from '../db/db';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const handleRegisterUser = async (req: Request, res: Response): Promise<any> => {
	const user = req.body;

	if (user.username == undefined || user.email == undefined || user.password == undefined) {
		return res.status(400).send('Username, email and password are required');
	}

	try {
		const existingUser = await database.select().from(userSchema).where(eq(userSchema.email, user.email)).limit(1);
		if (existingUser.length) {
			return res.status(400).send('User already exists');
		}

		bcrypt.hash(user.password, 10, async function (err, hash) {
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

export const handleLoginUser = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;

	if (email == undefined || password == undefined) {
		return res.status(400).send('Email and password are required');
	}

	try {
		const user = await database.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);
		if (!user.length) {
			return res.status(404).send('User not found');
		}

		bcrypt.compare(password, user[0].password, function (err, result) {
			if (err) {
				console.error('Error comparing passwords:', err);
				return res.status(500).send('Internal server error while comparing passwords');
			}

			if (!result) {
				return res.status(401).send('Incorrect password');
			}

			const { password: _, ...userWithoutPassword } = user[0];

			const accessToken = jwt.sign(userWithoutPassword, process.env.JWT_SECRET_KEY!, { expiresIn: '10s' });
			const refreshToken = jwt.sign(userWithoutPassword, process.env.JWT_REFRESH_SECRET_KEY!, { expiresIn: '1h' });

			res.status(200).json({ accessToken, refreshToken });
		});
	} catch (err) {
		console.error('Error logging in user:', err);
		res.status(500).send('Internal server error while logging in user');
	}
};
export const handleRefreshToken = async (req: Request, res: Response): Promise<any> => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(400).send('Refresh token is required');
	}

	let decodedJwt;
	try {
		decodedJwt = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY!);
	} catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).send('Refresh token has expired');
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).send('Refresh token is invalid');
        }
		res.status(500).send('Error verifying refresh token');
	}

	const { email } = decodedJwt as { email: string };
	const existingUser = await database.select().from(userSchema).where(eq(userSchema.email, email)).limit(1);
	if (!existingUser.length) {
		return res.status(404).send('User not found');
	}

	const { password: _, ...userWithoutPassword } = existingUser[0];
	const newAccessToken = jwt.sign(userWithoutPassword, process.env.JWT_SECRET_KEY!, { expiresIn: '15m' });

	res.status(200).json({ accessToken: newAccessToken });
};
