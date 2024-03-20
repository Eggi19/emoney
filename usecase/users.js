const { hashPassword, comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const { passwordValidation, emailValidation, registerValidation, loginValidation, userUpdateValidation } = require("../helpers/validation")
const { User } = require("../repository")

module.exports = {
    registerUser: async (req) => {
        try {
            let error = registerValidation(req)
            if (error) {
                throw error
            }

            error = emailValidation(req.email)
            if (error) {
                throw error
            }

            error = passwordValidation(req.password)
            if (error) {
                throw error
            }

            req.password = await hashPassword(req.password, 10)
            error = await User.register(req)
            if (error) {
                throw error
            }

        } catch (error) {
            return error
        }
    },

    userLogin: async (req) => {
        try {
            let error = loginValidation(req)
            if (error) {
                throw error
            }

            error = emailValidation(req.email)
            if (error) {
                throw error
            }

            error = passwordValidation(req.password)
            if (error) {
                throw error
            }

            const result = await User.login(req)
            if (result.error) {
                throw result.error
            }

            error = await comparePassword(req.password, result.data.password)
            if (error) {
                throw error
            }

            const token = await generateToken(req.email)

            return { data: token, error: null }

        } catch (error) {
            return { data: null, error: error }
        }
    },

    userProfile: async (email) => {
        try {
            const result = await User.getProfile(email)

            return { result, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    },

    updateProfile: async (req, email) => {
        try {
            const error = userUpdateValidation(req)
            if (error) {
                throw error
            }

            const result = await User.updateProfile(req, email)

            return { result, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    },

    addProfileImge: async (req, email) => {
        try {
            const fullUrl = req.protocol + '://' + req.get('host');
            const path = `${fullUrl}/profile_image/${req.file.filename}`
            const result = await User.updateProfileImage(path, email)

            return { result, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    }
}