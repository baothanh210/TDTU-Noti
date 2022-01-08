const {check} = require('express-validator')

const registerValidator = [
    check('name').exists().withMessage('Please enter Faculty or Deparment name')
    .notEmpty().withMessage('Please enter Faculty or Deparment name')
    .isLength({min: 6}).withMessage('Faculty or Deparment name must have more than 6 characters'),
    
    check('email').exists().withMessage('Please enter your email')
    .notEmpty().withMessage('Please enter your email')
    .isEmail().withMessage('This is not the valid email'),

    check('password').exists().withMessage('Please enter your password')
    .notEmpty().withMessage('Please enter your password')
    .isLength({min: 6}).withMessage('Password must have more than 6 characters'),

    check('rights').exists().withMessage('Please enter the rights for F/D')
    .notEmpty().withMessage('Please enter the rights for F/D'),
]

module.exports = registerValidator