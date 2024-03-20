const { userUsecase } = require("../usecase");

module.exports = {
    register: async (req, res) => {
        try {
            const error = await userUsecase.registerUser(req.body)
            if (error) {
                throw error
            }

            res.status(200).send({
                status: 0,
                message: "Registrasi berhasil silahkan login",
                data: null
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },

    login: async (req, res) => {
        try {
            const data = await userUsecase.userLogin(req.body)
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Login Sukses",
                data: {
                    token: data.data
                }
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },

    getOneUser: async (req, res) => {
        try {
            const data = await userUsecase.userProfile(req.user.email)
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Sukses",
                data: data.result.data
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },

    updateOneUser: async (req, res) => {
        try {
            const data = await userUsecase.updateProfile(req.body, req.user.email)
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Sukses",
                data: data.result.data
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },

    addImage: async (req, res) => {
        try {
            const data = await userUsecase.addProfileImge(req, req.user.email)
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Sukses",
                data: data.result.data
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    }
};