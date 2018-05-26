var express = require('express');
var router = express.Router();

router.get('/video-list', require('../route-handlers/get-video-list'));

module.exports = router;