const bcrypt = require('bcrypt');

const hashPassword = async (password, cost) => {
    try {
        const salt = await bcrypt.genSalt(cost);
        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword
    } catch (error) {
        return { message: 'failed hashing', code: 500, status: 102 }
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const isUserExists = await bcrypt.compare(password, hashedPassword);
        if (!isUserExists) {
            throw { message: "Username atau password salah", code: 400, status: 103 }
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    hashPassword,
    comparePassword
}