export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  UNEXPECTED_ERROR = 'UNEXPECTED_ERROR',
}

export interface BusinessError {
  code: ErrorCode;
  message: string;
  details?: any;
}

export const mapStatusToErrorCode = (status?: number): ErrorCode => {
  switch (status) {
    case 400: return ErrorCode.VALIDATION_ERROR;
    case 401: return ErrorCode.AUTHENTICATION_ERROR;
    case 403: return ErrorCode.AUTHORIZATION_ERROR;
    case 404: return ErrorCode.NOT_FOUND_ERROR;
    case 409: return ErrorCode.CONFLICT_ERROR;
    case 500: return ErrorCode.SERVER_ERROR;
    default: return ErrorCode.UNEXPECTED_ERROR;
  }
};
