import { createOrganizationService } from '../services/organization/create-organization.service.js';
import { deleteOrganizationService } from '../services/organization/delete-organization.service.js';
import { getOneOrganizationService } from '../services/organization/get-one-organization.service.js';
import { getOrganizationService } from '../services/organization/get-organization.service.js';
import { updateOrganizationService } from '../services/organization/update-organization.service.js';

const getOrganization = async (req, res, next) => {
  try {
    const result = await getOrganizationService();

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getOneOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOneOrganizationService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const createOrganization = async (req, res, next) => {
  try {
    const { body, file } = req;
    const result = await createOrganizationService(body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const updateOrganization = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { id } = req.params;
    const result = await updateOrganizationService(id, body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const deleteOrganization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { public_id } = req.body;
    const result = await deleteOrganizationService(public_id, id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

export { getOrganization, getOneOrganization, createOrganization, updateOrganization, deleteOrganization };
