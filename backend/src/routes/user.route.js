import { Router } from 'express';
import { createUser, loginUser, logoutUser, statusLogin } from '../controllers/user.controller.js';
import { cookieJwtAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/me', cookieJwtAuth, (req, res, next) => statusLogin(req, res, next));
// router.get('/:id', (req, res, next) => getOneUser(req, res, next));
router.post('/', (req, res, next) => createUser(req, res, next));
router.post('/login', (req, res, next) => loginUser(req, res, next));
router.patch('/', (req, res, next) => updateUser(req, res, next));
router.delete('/logout', (req, res, next) => logoutUser(req, res, next));

export default router;
