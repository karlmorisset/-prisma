
const router = require('express').Router();
const PostController = require('../controllers/post')

router.get('/', PostController.getAll);
router.get('/:id', PostController.get);
router.post('/', PostController.create);
router.patch('/:id', PostController.update);
router.delete('/:id', PostController.delete);

module.exports = router;
