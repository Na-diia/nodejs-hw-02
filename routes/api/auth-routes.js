const express = require('express');

const {register, login, getCurrent, logout, patchSub, updateAvatar} = require('../../controllers/user-controller');
 const { authenticate, subValidate, authValidate,  upload} = require('../../middlewares');

const router = express.Router();

router.post('/register', authValidate, register);

router.post("/login", authValidate, login);

router.get('/current', authenticate, getCurrent);

router.post('/logout', authenticate, logout);

router.patch('/avatars',  authenticate, upload.single("avatar"), updateAvatar);

router.patch('/:userId', authenticate, subValidate, patchSub);

module.exports = router;  