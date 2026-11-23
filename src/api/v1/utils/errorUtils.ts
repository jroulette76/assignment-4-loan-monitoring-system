/**
 * Extracts an error message from unknown error types.
 *
 * @param error - The error object.
 * @returns The error message.
 */
export const getErrorMessage = (
    error: unknown,
): string => {
    if (error instanceof Error) {
        return error.message;
    }

    return String(error);
};

/**
 * Extracts an error code from Firebase or other errors.
 *
 * @param error - The error object.
 * @returns The error code.
 */
export const getErrorCode = (
    error: unknown,
): string => {
    if (error instanceof Error) {
        const firebaseError = error as Error & {
            code?: string;
        };

        return firebaseError.code || "UNKNOWN_ERROR";
    }

    return "UNKNOWN_ERROR";
};