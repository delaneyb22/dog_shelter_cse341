// validation/dogValidation.js
const Joi = require('joi');

const dogSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    age: Joi.number().integer().min(0).required(),
    breed: Joi.string().min(1).max(50).required(),
    ownerId: Joi.string().required(), // Assuming ownerId is a string (e.g., a user ID)
});

const validateDog = (req, res, next) => {
    const { error } = dogSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = validateDog;