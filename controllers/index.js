
var express = require('express'),
    router = express.Router();

router.use('/users', require('./users'));
router.use('/requests', require('./requests'));

router.get('/', function (req, res) {
    res.render('index', {title: 'Fiverr Buyer Request'});
});

router.get('*', function (req, res) {
    res.status(404).render('error', {
        title: 'Fiverr Buyer Request', error: {
            status: 404,
            stack: 'Not found'
        }
    });
});

module.exports = router;
