export const response = (status: boolean, message: object | string | object[]): object => {
    return {
        status,
        message
    }
}