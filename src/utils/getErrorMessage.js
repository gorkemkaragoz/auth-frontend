const HTTP_ERRORS = {
  400: 'Invalid request. Please check your input.',
  401: 'Incorrect email or password.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'This email address is already in use.',
  500: 'Server error. Please try again later.',
};

const getErrorMessage = (err, fallback = 'An unexpected error occurred. Please try again.') => {
  if (!err.response) {
    return 'Unable to connect to the server. Please check your connection.';
  }

  if (err.response?.data?.message) {
    return err.response.data.message;
  }

  return HTTP_ERRORS[err.response?.status] || fallback;
};

export default getErrorMessage;
