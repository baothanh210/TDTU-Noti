const {check} = require('express-validator')

const loginValidator = [
    
    check('email').exists().withMessage('Please enter your email')
    .notEmpty().withMessage('Please enter your email')
    .isEmail().withMessage('This is not the valid email'),

    check('password').exists().withMessage('Please enter your password')
    .notEmpty().withMessage('Please enter your password')
    .isLength({min: 6}).withMessage('Password must have more than 6 characters'),

]

module.exports = loginValidator