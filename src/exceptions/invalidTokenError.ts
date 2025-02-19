export class InvalidTokenError extends Error {
    constructor(message: string = "Invalid token provided") {
        super(message);
        this.name = "InvalidTokenError";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InvalidTokenError);
        }
    }
}