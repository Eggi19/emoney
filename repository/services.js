const { pgClient } = require("../db/postgres")

const client = pgClient()

module.exports = {
    getBanner: async () => {
        try {
            const response = await client.query(`SELECT banner_name, banner_image, description FROM banners WHERE deleted_at IS null`)
        
            return { data: response.rows, error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    getService: async () => {
        try {
            const response = await client.query(`SELECT service_code, service_name, service_icon, service_tarif FROM services WHERE deleted_at IS null`)
        
            return { data: response.rows, error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    getOneService: async (serviceCode) => {
        try {
            const response = await client.query(`SELECT service_code, service_name, service_icon, service_tarif FROM services WHERE service_code = '${serviceCode}' AND deleted_at IS null`)
            
            return { data: response.rows[0], error: null }
        } catch (error) {
            console.log(error);
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    }
}