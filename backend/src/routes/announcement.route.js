import { Router } from 'express';
import { createAnnouncement, deleteAnnouncement, getOneAnnouncement, getAnnouncement, updateAnnouncement } from '../controllers/announcement.controller.js';
import { upload } from '../services/upload.service.js';
import { cookieJwtAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', (req, res, next) => getAnnouncement(req, res, next));
router.get('/:id', (req, res, next) => getOneAnnouncement(req, res, next));
router.post('/', cookieJwtAuth, upload.single('file'), (req, res, next) => createAnnouncement(req, res, next));
router.patch('/:id', cookieJwtAuth, upload.single('file'), (req, res, next) => updateAnnouncement(req, res, next));
router.delete('/:id', cookieJwtAuth, (req, res, next) => deleteAnnouncement(req, res, next));

export default router;
