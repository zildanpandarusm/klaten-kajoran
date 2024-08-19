import { createPotentialService } from '../services/potentials/create-potential.service.js';
import { deletePotentialService } from '../services/potentials/delete-potential.service.js';
import { getOnePotentialService } from '../services/potentials/get-one-potential.service.js';
import { getPotentialCategoryUserService } from '../services/potentials/get-potential-category-user.service.js';
import { getPotentialCategoryService } from '../services/potentials/get-potential-category.service.js';
import { getPotentialService } from '../services/potentials/get-potential.service.js';
import { updatePotentialService } from '../services/potentials/update-potential.service.js';

const getPotential = async (req, res, next) => {
  try {
    const result = await getPotentialService();

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getOnePotential = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOnePotentialService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getPotentialCategory = async (req, res, next) => {
  try {
    const { kategori } = req.params;
    const result = await getPotentialCategoryService(kategori);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getPotentialCategoryUser = async (req, res, next) => {
  try {
    const { id, kategori } = req.params;
    const result = await getPotentialCategoryUserService(id, kategori);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const createPotential = async (req, res, next) => {
  try {
    const { body, file } = req;
    const result = await createPotentialService(body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const updatePotential = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { id } = req.params;
    const result = await updatePotentialService(id, body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const deletePotential = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { public_id } = req.body;
    const result = await deletePotentialService(public_id, id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

export { getPotential, getOnePotential, createPotential, updatePotential, deletePotential, getPotentialCategory, getPotentialCategoryUser };
