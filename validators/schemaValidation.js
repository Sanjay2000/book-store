const Joi = require('joi')

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
});

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    username: Joi.string().min(4).required(),
    password: Joi.string(),
    role:Joi.string().optional()


});

const addGameDataSchema = Joi.object({
    gameId: Joi.number().required(),
    score: Joi.number().required(),
});


module.exports = {
    registerSchema,
    loginSchema,
    addGameDataSchema
};
