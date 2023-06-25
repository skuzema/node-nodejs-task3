export const URL = {
  base_url: '/api',
  users: '/api/users',
};

export const STATUS_CODE = {
  success: 200,
  created: 201,
  bad_request: 400,
  not_found: 404,
  internal_error: 500,
};

export const MESSAGE = {
  bad_request:'Required fields are missing',
  not_found: 'Endpoint not found',
  internal_error: 'Internal Server Error',
};

export const METHOD = {
  get: 'GET',
  post: 'POST',
};