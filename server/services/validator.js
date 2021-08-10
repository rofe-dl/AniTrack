const { check } = require('express-validator');

exports.registerFormValidations = [
    check('name', 'Name is required').trim().notEmpty(),
    check('email', 'Please enter a valid email').normalizeEmail().isEmail(),
    check('password', 'Password must be of 8 characters or more').trim().isLength({min: 8}),
    check('password').custom((value, { req }) => {
        if (value !== req.body.password2){
            throw new Error('Passwords do not match');
        }

        return true;
    })
]