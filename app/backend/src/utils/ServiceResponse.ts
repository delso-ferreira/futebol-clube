type ServiceResponseErrorForType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'BAD_REQUEST';

export type ServiceResponseError = {
  status: ServiceResponseErrorForType,
  data: { message: string }
};

export type ServiceResponseSucess<T> = {
  status: 'SUCESS' | 'UPDATE',
  data: T
};

export type ServiceResponse <T> = ServiceResponseSucess <T> | ServiceResponseError;
