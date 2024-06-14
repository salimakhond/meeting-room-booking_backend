import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  //extract value with double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  const extractMessage = match && match[1];

  const errorSource: TErrorSources = [
    {
      path: '',
      message: `${extractMessage} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid Id',
    errorSource,
  };
};

export default handleDuplicateError;
