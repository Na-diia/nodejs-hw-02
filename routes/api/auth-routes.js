const express = require('express');

const {register, login, getCurrent, logout, patchSub, updateAvatar, verify, resendVerifyEmail} = require('../../controllers/user-controller');
 const { authenticate, subValidate, authValidate,  upload, emailValidate} = require('../../middlewares');

const router = express.Router();

router.post('/register', authValidate, register);

router.post("/login", authValidate, login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/avatars',  authenticate, upload.single("avatar"), updateAvatar);

router.patch('/:userId', authenticate, subValidate, patchSub);

router.get('/verify/:verificationToken', verify);

router.post('/verify', emailValidate, resendVerifyEmail);

module.exports = router;  