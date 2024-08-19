import { Router } from 'express';
import { createPotential, deletePotential, getOnePotential, getPotential, getPotentialCategory, getPotentialCategoryUser, updatePotential } from '../controllers/potential.controller.js';
import { upload } from '../services/upload.service.js';

const router = Router();

router.get('/', (req, res, next) => getPotential(req, res, next));
router.get('/kategori/:kategori', (req, res, next) => getPotentialCategory(req, res, next));
router.get('/kategori/:kategori/:id', (req, res, next) => getPotentialCategoryUser(req, res, next));
router.get('/:id', (req, res, next) => getOnePotential(req, res, next));
router.post('/', upload.single('file'), (req, res, next) => createPotential(req, res, next));
router.patch('/:id', upload.single('file'), (req, res, next) => updatePotential(req, res, next));
router.delete('/:id', (req, res, next) => deletePotential(req, res, next));

export default router;
