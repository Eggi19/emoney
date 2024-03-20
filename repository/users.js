const { pgClient } = require("../db/postgres")

const client = pgClient()

module.exports = {
    register: async (req) => {
        try {
            await client.query(`INSERT INTO users (email, first_name, last_name, password) VALUES ('${req.email}', '${req.first_name}', '${req.last_name}', '${req.password}')`)
        } catch (error) {
            if (error.message === 'duplicate key value violates unique constraint "users_email_key"') {
                return { message: 'Email sudah terdaftar', code: 400, status: 102 }
            }
            return { message: 'Internal server error', code: 500, status: 102 }
        }
    },

    login: async (req) => {
        try {
            const result = await client.query(`SELECT email, password FROM users WHERE email = '${req.email}' AND deleted_at IS null`)

            if (!result.rows[0]) {
                return { data: null, error: { message: "Username atau password salah", code: 400, status: 103 } }
            }
            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    getProfile: async (email) => {
        try {
            const result = await client.query(`SELECT email, first_name, last_name, profile_image FROM users WHERE email = '${email}' AND deleted_at IS null`)

            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    updateProfile: async (req, email) => {
        try {
            const result = await client.query(`UPDATE users SET first_name = '${req.first_name}', last_name = '${req.last_name}' WHERE email = '${email}' AND deleted_at IS null RETURNING email, first_name, last_name, profile_image`)

            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    updateProfileImage: async (path, email) => {
        try {
            const result = await client.query(`UPDATE users SET profile_image = '${path}' WHERE email = '${email}' AND deleted_at IS null RETURNING email, first_name, last_name, profile_image`)
        
            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    topUp: async (amount, email) => {
        try {
            const result = await client.query(`UPDATE users SET balance = balance + ${amount} WHERE email = '${email}' AND deleted_at IS null RETURNING balance`)

            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    lockRow: async (email) => {
        try {
            await client.query(`SELECT * FROM users WHERE email = '${email}' FOR UPDATE`)
            
            return { data: null, error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    getBalance: async (email) => {
        try {
            const result = await client.query(`SELECT balance FROM users WHERE email = '${email}' AND deleted_at IS NULL`)

            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    },

    reduceBalance: async (amount, email) => {
        try {
            const result = await client.query(`UPDATE users SET balance = balance - ${amount} WHERE email = '${email}' AND deleted_at IS null RETURNING balance`)
            
            return { data: result.rows[0], error: null }
        } catch (error) {
            return { data: null, error: { message: 'Internal server error', code: 500, status: 102 } }
        }
    }
}