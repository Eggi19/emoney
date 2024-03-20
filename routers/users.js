const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { uploadProfile } = require('../middlewares/upload');
const { serviceHandler, userHandler, transactionHandler } = require('../handlers');

const router = express.Router();

router.post('/registration', userHandler.register)
router.post('/login', userHandler.login)
router.get('/profile', verifyToken, userHandler.getOneUser)
router.put('/profile/update', verifyToken, userHandler.updateOneUser)
router.put('/profile/image', verifyToken, uploadProfile, userHandler.addImage)
router.get('/banner', serviceHandler.findAllBanner)
router.get('/service', verifyToken, serviceHandler.findAllService)
router.post('/topup', verifyToken, transactionHandler.balanceTopUp)
router.post('/transaction', verifyToken, transactionHandler.userTransaction)
router.get('/transaction/history', verifyToken, transactionHandler.findAllTransaction)

module.exports = router