const {check} = require('express-validator')

const changePwdValidator = [
    check('old_pwd').exists().withMessage('Please enter your old password')
    .notEmpty().withMessage('Please enter your old password'),

    check('new_pwd').exists().withMessage('Please enter your new password')
    .notEmpty().withMessage('Please enter your new password')
    .isLength({min: 6}).withMessage('New password must have more than 6 characters'),

    check('renew_pwd').exists().withMessage('Please re-enter your new password')
    .notEmpty().withMessage('Please re-enter your new password')
    .custom((value, {req}) => {
        if (value !== req.body.new_pwd){
            throw new Error('New password not match!')
        }
        return true;
    }),
]

module.exports = changePwdValidator