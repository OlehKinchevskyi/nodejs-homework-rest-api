const joi = require('joi');
const mongoose = require('mongoose')

const schemaCreateContact = joi.object({
    name: joi.string().min(3).max(30).pattern(/[A-Z]\w+/).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: joi.string().min(10).max(14).required(),
    favorite: joi.boolean().optional()
 })

const schemaQueryContact = joi.object({
    sortBy: joi.string().valid('name', 'phone', 'email').optional(),
    sortByDesc: joi.string().valid('name', 'phone', 'email').optional(),
    filter: joi.string().optional(),// .valid('name', 'phone', 'email')
    limit: joi.number().integer().min(1).max(50).optional(),
    offset: joi.number().integer().min(0).optional(),
    favorite: joi.boolean().optional()
}). without('sortBy', 'sortDesc')
 
 const schemaPutContact = joi.object({
    name: joi.string().min(3).max(30).optional(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: joi.string().max(16).pattern(/^\([\d]{2,3}\)\[\d]{2,3}-[\d]{3,4}$/).optional(),
    favorite: joi.boolean().optional()
 }).or('name', 'email', 'phone', 'favorite')

 const schemaPatchContact = joi.object({
    favorite: joi.boolean().required(),
 })
 
const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj)
        return next()
    } catch (err) {
        next({ status: 400, message: err.message.replace(/"/g, "'")})
 }
}

const validationQueryContact = async (req, res, next) => {
    return await validate(schemaQueryContact, req.query, next)
}

const validationCreateContact = async (req, res, next) => {
    return await validate(schemaCreateContact, req.body, next)
}
const validationPutContact = async (req, res, next) => {
    return await validate(schemaPutContact, req.body, next)
}
const validationPatchContact = async (req, res, next) => {
    return await validate(schemaPatchContact, req.body, next)
}
const validationObjectId = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: 'Invalid Object Id' })
    }
    next()
  }
module.exports = {
    validationQueryContact,
    validationCreateContact,
    validationPutContact,
    validationPatchContact,
    validationObjectId
}