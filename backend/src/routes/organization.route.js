import { Router } from 'express';
import { createOrganization, deleteOrganization, getOneOrganization, getOrganization, updateOrganization } from '../controllers/organization.controller.js';
import { upload } from '../services/upload.service.js';
import { cookieJwtAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', (req, res, next) => getOrganization(req, res, next));
router.get('/:id', (req, res, next) => getOneOrganization(req, res, next));
router.post('/', upload.single('file'), (req, res, next) => createOrganization(req, res, next));
router.patch('/:id', upload.single('file'), (req, res, next) => updateOrganization(req, res, next));
router.delete('/:id', (req, res, next) => deleteOrganization(req, res, next));

export default router;
