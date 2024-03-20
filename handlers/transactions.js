const { tx } = require("../db/postgres");
const { transactionUsecase } = require("../usecase");

module.exports = {
    balanceTopUp: async (req, res) => {
        try {
            let data
            await tx(async () => {
                data = await transactionUsecase.topUpBalance(req.body, req.user.email)
            });

            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Top Up Balance berhasil",
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

    userTransaction: async (req, res) => {
        try {
            let data
            await tx(async () => {
                data = await transactionUsecase.transaction(req.body, req.user.email)
            });

            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Transaksi berhasil",
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

    findAllTransaction: async (req, res) => {
        try {
            const data = await transactionUsecase.getAllTransaction(req.user.email, req.query.limit, req.query.offset)

            if (data.error) {
                throw data.error
            }

            res.status(200).send({
                status: 0,
                message: "Get History Berhasil",
                data: data.data
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