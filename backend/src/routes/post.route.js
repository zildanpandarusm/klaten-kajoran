import { Router } from 'express';
import { createPost, deletePost, getOnePost, getPost, getPostCategory, updatePost } from '../controllers/post.controller.js';
import { upload } from '../services/upload.service.js';
import { cookieJwtAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', (req, res, next) => getPost(req, res, next));
router.get('/kategori/:kategori/:id', (req, res, next) => getPostCategory(req, res, next));
router.get('/:id', (req, res, next) => getOnePost(req, res, next));
router.post('/', cookieJwtAuth, upload.single('file'), (req, res, next) => createPost(req, res, next));
router.patch('/:id', cookieJwtAuth, upload.single('file'), (req, res, next) => updatePost(req, res, next));
router.delete('/:id', cookieJwtAuth, (req, res, next) => deletePost(req, res, next));

export default router;
