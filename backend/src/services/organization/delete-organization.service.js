import { deleteOrganization } from '../../repositories/organization.repository.js';
import { cloudinary } from '../upload.service.js';

export const deleteOrganizationService = async (public_id, id) => {
  const result = await cloudinary.uploader.destroy(public_id);

  let deletedOrganization = await deleteOrganization(id);

  return {
    result: deletedOrganization,
  };
};
