const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({
        status: 108,
        message: 'Token tidak tidak valid atau kadaluwarsa',
        data: null,
      });
    }

    try {
      token = token.split(' ')[1];
      if (token === null || !token)
        throw { message: 'Token tidak tidak valid atau kadaluwarsa', code: 401, status: 108 };
      let verifyUser = jwt.verify(token, 'login-token');

      if (!verifyUser) throw { message: 'Token tidak tidak valid atau kadaluwarsa', code: 401, status: 108 };

      req.user = verifyUser;
      next();
    } catch (error) {
      return res.status(401).send({
        status: 108,
        message: 'Token tidak tidak valid atau kadaluwarsa',
        data: null,
      });
    }
  },
};