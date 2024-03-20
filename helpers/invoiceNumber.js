const { Transaction } = require("../repository")

const generateInvoiceNumber = async () => {
    const newDate = new Date()
    const date = newDate.getDate() < 10 ? "0" + newDate.getDate().toString() : newDate.getDate().toString()
    const month = newDate.getMonth() < 10 ? "0" + (newDate.getMonth() + 1).toString() : (newDate.getMonth() + 1).toString()
    const year = newDate.getFullYear().toString()
    const total = await Transaction.countCurrentTransaction()
    if (total.error) {
        return { data: null, error: total.error }
    }
    if (parseInt(total.data) < 10) {
        total.data = "00" + total.data
    }
    if (parseInt(total.data) < 100) {
        total.data = "0" + total.data
    }

    return { data: "INV" + date + month + year + "-" + total.data, error: total.error }
}

module.exports = {
    generateInvoiceNumber
}