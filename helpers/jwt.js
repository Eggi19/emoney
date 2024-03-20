const jwt = require('jsonwebtoken');

const generateToken = async (email) => {
    try {
        let payload = {
            email: email,
        };

        return jwt.sign(payload, 'login-token', {
            expiresIn: '12h',
        });
    } catch (error) {
        return error;
    }
}

module.exports = {
    generateToken
}