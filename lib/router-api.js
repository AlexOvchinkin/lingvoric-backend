var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer({ dest: process.cwd() });

router.get('/video-list', require('../route-handlers/get-video-list'));
router.post('/video', upload.single('file'), require('../route-handlers/post-video'));

module.exports = router;