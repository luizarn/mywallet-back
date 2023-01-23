import joi from 'joi'

export const recordSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().min(3).required()
})