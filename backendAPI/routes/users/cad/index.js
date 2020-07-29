'use strict'

const router = require('express').Router();
const cadController = require('../../../controllers/users/cad');
const profileController = require('../../../controllers/users/profile');
const multer = require('multer');
const multerConfig = require('../../../config/multer');

router.use(require('../../../middlewares/auth'));
router.get('/', cadController.viewAllUsers);
router.get('/:id/addresses', cadController.viewAllWithAddresses);
router.get('/:id/plan', cadController.viewAllWithPlan);
router.post('/:filtersval/filter', cadController.viewAllUsersFilter);
router.post('/:relations/where', cadController.viewAllUsersWhere);
router.post('/:id/addresses', cadController.insertAddresses);
router.post('/:id/plan', cadController.linkPlan);
router.post('/uploads', multer(multerConfig).single('file'), profileController.uploads);
router.patch('/', cadController.update);
router.delete('/', cadController.erase); 

module.exports = router;
