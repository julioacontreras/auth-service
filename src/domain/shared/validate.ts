import * as Joi from 'joi'
import { ValidationError } from 'joi'
import { ERROR_INVALID_PARAMS } from '../constants'

export const getSchemaRequestIsAuthenticated = () => {
  return Joi.object({
    accessToken: Joi.string().required(),
    email: Joi.string().email().required(),
  })
}

export const getSchemaRequestLogin = () => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}

export const getSchemaRequestRegister = () => {
  return Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  })
}

export const prepareErrorParamsRequest = (error: ValidationError) => {
  return {
    error: {
      code: ERROR_INVALID_PARAMS,
      message: error.details[0].message,
    },
  }
}
