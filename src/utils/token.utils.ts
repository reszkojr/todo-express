import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '../exceptions/invalidTokenError';

export const validateToken = (token: string) => {
	const isTokenValid = jwt.verify(token, process.env.JWT_SECRET_KEY!);
	if (!isTokenValid) {
		throw new InvalidTokenError('Invalid token');
	}

	const decodedToken = jwt.decode(token);
	if (!decodedToken || typeof decodedToken !== 'object' || !('iat' in decodedToken)) {
		throw new InvalidTokenError('Invalid token');
	}

	return decodedToken;
};

