type ServiceResponseErrorForType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorForType,
  data: { message: string }
};

export type ServiceResponseSucess<T> = {
  status: 'SUCESS',
  data: T
};

export type ServiceResponse <T> = ServiceResponseSucess <T> | ServiceResponseError;