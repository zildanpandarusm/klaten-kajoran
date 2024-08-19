import { Router } from 'express';
import { createAbout, deleteAbout, getOneAbout, getAbout, updateAbout } from '../controllers/about.controller.js';

const router = Router();

router.get('/', (req, res, next) => getAbout(req, res, next));
router.get('/:id', (req, res, next) => getOneAbout(req, res, next));
router.post('/', (req, res, next) => createAbout(req, res, next));
router.patch('/:id', (req, res, next) => updateAbout(req, res, next));
router.delete('/:id', (req, res, next) => deleteAbout(req, res, next));

export default router;
