var express = require('express');
var router = express.Router();

router.get('/video-list', require('../route-handlers/get-video-list'));
router.post('/video', require('../route-handlers/post-video'));

module.exports = router;