const { topUpValidation } = require("../helpers/validation");
const { Transaction, User, Service } = require("../repository")

module.exports = {
    topUpBalance: async (req, email) => {
        try {
            const error = topUpValidation(req)
            if (error) {
                throw error
            }

            const lockResponse = await User.lockRow(email)
            if (lockResponse.error) {
                throw lockResponse.error
            }

            const topUpResponse = await User.topUp(req.top_up_amount, email)
            if (topUpResponse.error) {
                throw topUpResponse.error
            }

            const recordResponse = await Transaction.recordTransaction({
                invoice_number: 'number',
                transaction_type: 'TOPUP',
                description: 'Top Up balance',
                total_amount: req.top_up_amount,
                email: email
            })
            if (recordResponse.error) {
                throw recordResponse.error
            }

            return { data: topUpResponse.data, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    },

    transaction: async (req, email) => {
        try {
            if (!req.service_code) {
                throw { message: 'Parameter service_code harus di isi', code: 400, status: 102 }
            }

            const lockResponse = await User.lockRow(email)
            if (lockResponse.error) {
                throw lockResponse.error
            }

            const getServiceReponse = await Service.getOneService(req.service_code)
            if (getServiceReponse.error) {
                throw getServiceReponse.error
            }
            if (getServiceReponse.data === undefined) {
                throw { message: 'Service atas Layanan tidak ditemukan', code: 400, status: 102 }
            }

            const getBalanceResponse = await User.getBalance(email)
            if (getBalanceResponse.error) {
                throw getBalanceResponse.error
            }
            if (getServiceReponse.data.service_tarif > getBalanceResponse.data.balance) {
                throw { message: 'Saldo tidak mencukupi', code: 400, status: 102 }
            }

            const reduceBalanceResponse = await User.reduceBalance(getServiceReponse.data.service_tarif, email)
            if (reduceBalanceResponse.error) {
                throw reduceBalanceResponse.error
            }

            const recordResponse = await Transaction.recordTransaction({
                invoice_number: 'number',
                transaction_type: 'PAYMENT',
                description: getServiceReponse.data.service_name,
                total_amount: getServiceReponse.data.service_tarif,
                email: email
            })
            if (recordResponse.error) {
                throw recordResponse.error
            }

            return {
                data: {
                    invoice_number: 'number',
                    service_code: getServiceReponse.data.service_code,
                    service_name: getServiceReponse.data.service_name,
                    transaction_type: 'PAYMENT',
                    total_amount: getServiceReponse.data.service_tarif,
                    created_on: getServiceReponse.data.created_at
                },
                error: null
            }

        } catch (error) {
            return { data: null, error: error }
        }
    },

    getAllTransaction: async (email, limit, offset) => {
        try {
            const result = await Transaction.getTransaction(email, limit, offset)
            if (result.error) {
                throw result.error
            }

            return {
                data: {
                    offset: offset,
                    limit: limit,
                    records: result.data
                },
                error: null
            }
        } catch (error) {
            return { data: null, error: error }
        }
    }
}