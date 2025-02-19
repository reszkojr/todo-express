import { NextFunction, Request, Response } from 'express';
import { database } from '../db/db';
import { userSchema, UserType } from '../db/schema/user.schema';
import { InvalidTokenError } from '../exceptions/invalidTokenError';
import { validateToken } from '../utils/token.utils';
import { eq } from 'drizzle-orm';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.header('Authorization')?.replace('Bearer ', '');
		if (token === undefined) {
			res.status(401).send({ error: 'Missing token' });
			return;
		}

		const decodedToken = validateToken(token);
		const selectUser = await database.select().from(userSchema).where(eq(userSchema.id, decodedToken.id)).limit(1);
        
		if (!selectUser.length) {
            throw new Error('No user found for token');
		}

        const user: UserType = selectUser[0];
		req.user = user;
		next();
	} catch (error) {
        console.log(error)
		if (error instanceof InvalidTokenError) {
			res.status(401).send({ error: `Authentication failed: ${error.message}` });
			return;
		}
		res.status(401).send({ error: 'Authentication failed' });
		return;
	}
};
