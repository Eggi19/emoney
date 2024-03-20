const { Service } = require("../repository")

module.exports = {
    getAllBanner: async () => {
        try {
            const result = await Service.getBanner()
            if (result.error) {
                throw result.error
            }

            return {data: result.data, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    },
    getAllService: async () => {
        try {
            const result = await Service.getService()
            if (result.error) {
                throw result.error
            }

            return {data: result.data, error: null }
        } catch (error) {
            return { data: null, error: error }
        }
    }
}