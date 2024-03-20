const passwordValidation = (password) => {
    try {
        if (password.length < 8) {
            throw { message: 'Password length minimal 8 karakter', code: 400, status: 102 };
        }
    } catch (error) {
        return error;
    }
}

const emailValidation = (email) => {
    try {
        var re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            throw { message: 'Paramter email tidak sesuai format', code: 400, status: 102 };
        }
    } catch (error) {
        return error
    }
}

const registerValidation = (req) => {
    try {
        if (!req.email) {
            throw { message: 'Parameter email harus di isi', code: 400, status: 102 };
        }
        if (!req.first_name) {
            throw { message: 'Parameter first_name harus di isi', code: 400, status: 102 };
        }
        if (!req.last_name) {
            throw { message: 'Parameter last_name harus di isi', code: 400, status: 102 };
        }
        if (!req.password) {
            throw { message: 'Parameter password harus di isi', code: 400, status: 102 };
        }
    } catch (error) {
        return error
    }
}

const loginValidation = (req) => {
    try {
        if (!req.email) {
            throw { message: 'Parameter email harus di isi', code: 400, status: 102 };
        }
        if (!req.password) {
            throw { message: 'Parameter password harus di isi', code: 400, status: 102 };
        }
    } catch (error) {
        return error
    }
}

const userUpdateValidation = (req) => {
    try {
        if (!req.first_name) {
            throw { message: 'Parameter first_name harus di isi', code: 400, status: 102 };
        }
        if (!req.last_name) {
            throw { message: 'Parameter last_name harus di isi', code: 400, status: 102 };
        }
    } catch (error) {
        return error
    }
}

const topUpValidation = (req) => {
    try {
        if (!req.top_up_amount) {
            throw { message: 'Parameter top_up_amount harus di isi', code: 400, status: 102 };
        }
        if (typeof req.top_up_amount !== "number" || req.top_up_amount < 0) {
            throw { message: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0", code: 400, status: 102 };
        }

    } catch (error) {
        return error
    }
}

module.exports = {
    passwordValidation,
    emailValidation,
    registerValidation,
    loginValidation,
    userUpdateValidation,
    topUpValidation
}