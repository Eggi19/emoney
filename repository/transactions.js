const { pgClient } = require("../db/postgres")

const client = pgClient()

module.exports = {
    recordTransaction: async (req) => {
        try {
            const response = await client.query(`INSERT INTO transactions (invoice_number, transaction_type, description, total_amount, user_email) VALUES ('${req.invoice_number}', '${req.transaction_type}', '${req.description}', ${req.total_amount}, '${req.email}') RETURNING invoice_number, transaction_type, description, total_amount, created_at`)
        
            return { data: response.rows, error: null }
        } catch (error) {

            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    getTransaction: async (email, limit, offset) => {
        try {
            const response = await client.query(`SELECT invoice_number, transaction_type, description, total_amount, created_at FROM transactions WHERE user_email = '${email}' ORDER BY created_at DESC ${limit? `LIMIT ${limit}`: ''} ${offset? `OFFSET ${offset}`: ''}`)
        
            return { data: response.rows, error: null }
        } catch (error) {
            console.log(error);
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    }
}