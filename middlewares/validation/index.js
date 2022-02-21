const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let Error = {};
        errors.array().map((err) => (Error[err.param] = err.msg));
        return res.status(422).json({ message: Error });
    }

    next();
};