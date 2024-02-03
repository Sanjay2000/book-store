const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    username: Joi.string().min(4).required(),
    role: Joi.string().required()


});

const bookSchema = Joi.object({
    sellCount: Joi.number(),
    title: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    authors:Joi.array().required(),

});



module.exports = {
    registerSchema,
    loginSchema,
    bookSchema
};
