import { UserType } from '../../db/schema/user.schema';

declare global {
	namespace Express {
		interface Request {
			user?: UserType;
		}
	}
}
