const router = require('express').Router();

router.get('/', function (req, res) {
  res.json({
    status: 'API Works',
    message: 'Welcome to FirstRest API'
  });
});
const transactionController = require('../controllers/transactionController');

router.route('/getAllTransaction').get(transactionController.getAll);
router.route('/addTransaction').post(transactionController.add);
router.route('/deleteTransaction').delete(transactionController.delete);
router.route('/editTransaction').put(transactionController.update);

module.exports = router;
