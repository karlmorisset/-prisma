const router = require('express').Router();
const UserController = require('../controllers/user')

router.get('/', UserController.getAll);
router.get('/:id', UserController.get);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;
