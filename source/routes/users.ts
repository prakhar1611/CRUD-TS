import express from 'express';
import controller from '../controllers/users';
const router = express.Router();

router.get('/users', controller.getUsers);
router.put('/users/:id', controller.updateUsers);
router.delete('/users/:id', controller.deleteUsers);
router.post('/users', controller.addUsers);

export = router;