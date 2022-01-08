const {check} = require('express-validator')

const updateValidator = [
    check('name').exists().withMessage('Please enter your name')
    .notEmpty().withMessage('Please enter your name'),

    check('className').exists().withMessage('Please enter your class')
    .notEmpty().withMessage('Please enter your class'),

    check('faculty').exists().withMessage('Please enter your faculty')
    .notEmpty().withMessage('Please enter your faculty'),
]

module.exports = updateValidator