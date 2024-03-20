const { serviceUsecase } = require("../usecase");

module.exports = {
    findAllBanner: async (req, res) => {
        try {
            const data = await serviceUsecase.getAllBanner()
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Sukses",
                data: data.data
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },
    findAllService: async (req, res) => {
        try {
            const data = await serviceUsecase.getAllService()
            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Sukses",
                data: data.data
            });
        } catch (error) {
            res.status(error.code).send({
                status: error.status,
                message: error.message,
                data: null
            })
        }
    },
};