/**
 * Creates a standardized success response object.
 *
 * @param data - The response data.
 * @param message - Optional success message.
 * @returns A formatted success response object.
 */
export const successResponse = (
    data: unknown,
    message = "Operation successful",
) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
});

/**
 * Creates a standardized error response object.
 *
 * @param message - The error message.
 * @param code - The error code.
 * @returns A formatted error response object.
 */
export const errorResponse = (
    message: string,
    code: string,
) => ({
    success: false,
    error: {
        message,
        code,
    },
    timestamp: new Date().toISOString(),
});