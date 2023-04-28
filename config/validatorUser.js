const joi = require('joi')

const validatorUser = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(2).max(15).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty": "Your First Name is a required field",
            "string.min": "Your First Name must have at least 2 characters",
            "string.max": "Your First Name could have max. 15 characters",
            "string.pattern.base": "Your First Name must contain only letters",
        }),
        lastName: joi.string().trim().min(2).max(15).required().pattern(new RegExp('[a-zA-Z]$')).messages({
            "string.empty": "Your Last Name is a required field",
            "string.min": "Your Last Name must have at least 3 characters",
            "string.max": "Your Last Name could have max. 15 characters",
            "string.pattern.base": "Your Last Name must contain only letters",
        }),
        email: joi.string().required().trim().email({tlds:{allow:false}}).messages({
            "any.required": "Your Email is a required field",
            "string.email": "Your Email must be a valid mail",
        }),
        password: joi.string().min(6).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/).messages({
            "string.empty": "Your Password  is a required field",
            "string.min": "Your Password  must have at least 6 characters",
            "string.pattern.base": "Your Password must have at least a letter and a number",
        }),
        repeatpassword: joi.string().min(5).trim().required().pattern(/(?=.*\d)(?=.*[A-z])/),
        country: joi.string().trim().required().messages({
            "string.empty": "Your country is a required field",
        }),
        img: joi.string().required().trim().messages({
            "string.empty": "Your must insert an image URL link ",
        }),
        loggedWithGoogle: joi.boolean()
    })
    const validation = schema.validate(req.body, {abortEarly: true})
    if (validation.error) {
        return res.json({success: false, error: validation.error.details[0]})
    }
    next()
}

module.exports = validatorUser