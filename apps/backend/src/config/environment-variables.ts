import * as Joi from 'joi';

export interface EnvironmentVariables {
  DATABASE_URL: string;

  PUBLISHEABLE_KEY: string;
  SECRET_KEY: string;
  PRIMIUM_PRICE_ID: string;
  BUSINESS_PRICE_ID: string;

  BASE_URL: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  HOST: string;
  OFFICIAL_EMAIL: string;
  SMPTP_PORT: number;
  SECURE: boolean;

  FIREBASE_SERVICE_ACCOUNT_KEY: string;
  FIRESTORE_DATABASE_URL: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DATABASE_URL: Joi.string().required(),
  PUBLISHEABLE_KEY: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  PRIMIUM_PRICE_ID: Joi.string().required(),
  BUSINESS_PRICE_ID: Joi.string().required(),

  BASE_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  HOST: Joi.string().required(),
  OFFICIAL_EMAIL: Joi.string().required(),
  SMPTP_PORT: Joi.number().required(),
  SECURE: Joi.boolean().required(),

  FIREBASE_SERVICE_ACCOUNT_KEY: Joi.string().required(),
  FIRESTORE_DATABASE_URL: Joi.string().required(),
});
