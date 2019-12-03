export const API_PREFIX = "/api";
export const SWAGGER_URL = "/api-docs";

// Listing of Environments
export enum EnvVars {
  TEST = "test",
  LOCAL = "local",
  DEV = "dev",
  STG = "stg",
  PROD = "prod"
}

export enum HttpRequestLocation {
  body = "body",
  cookies = "cookies",
  headers = "headers",
  params = "params",
  query = "query"
}

export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE = 422,
  INTERNAL_SERVER_ERROR = 500
}

export enum Sensitivity {
  GET = 1,
  POST = 2,
  PUT = 2,
  DELETE = 3
}

export const HttpMethods = {
  GET: "GET",
  DELETE: "DELETE",
  POST: "POST",
  PUT: "PUT"
};
