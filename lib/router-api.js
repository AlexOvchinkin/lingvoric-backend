var express = require('express');
var router = express.Router();
const multer = require('multer');

const upload = multer({ dest: process.cwd() });

router.get('/video-list', require('../route-handlers/get-video-list'));
router.get('/video-folders', require('../route-handlers/get-video-folders'));
router.get('/video-subfolders', require('../route-handlers/get-video-subfolders'));
router.get('/single-video/:id', require('../route-handlers/get-single-video'));

router.post('/video', upload.single('file'), require('../route-handlers/post-video'));
router.post('/new-title', require('../route-handlers/post-new-title'));
router.post('/new-subtitle', require('../route-handlers/post-new-subtitle'));

module.exports = router;