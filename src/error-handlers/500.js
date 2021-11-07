'use strict';

module.exports = (err, req, res, next) => {

    const errorMessage = err.message ? err.message : err;

    const error500Handle = {
        status: 500,
        message: errorMessage
    }
    res.status(500).send(error500Handle)

}