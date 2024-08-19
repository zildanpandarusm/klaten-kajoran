import { createAboutService } from '../services/about/create-about.service.js';
import { deleteAboutService } from '../services/about/delete-about.service.js';
import { getOneAboutService } from '../services/about/get-one-about.service.js';
import { getAboutService } from '../services/about/get-about.service.js';
import { updateAboutService } from '../services/about/update-about.service.js';

const getAbout = async (req, res, next) => {
  try {
    const result = await getAboutService();

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getOneAbout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneAboutService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const createAbout = async (req, res, next) => {
  try {
    const result = await createAboutService(req.body);
    console.log('body', req.body);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const updateAbout = async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const result = await updateAboutService(id, body);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const deleteAbout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteAboutService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

export { getAbout, getOneAbout, createAbout, updateAbout, deleteAbout };
