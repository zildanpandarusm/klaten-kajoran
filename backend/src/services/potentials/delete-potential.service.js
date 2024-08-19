import { deletePotential } from '../../repositories/potential.repository.js';
import { cloudinary } from '../upload.service.js';

export const deletePotentialService = async (public_id, id) => {
  const result = await cloudinary.uploader.destroy(public_id);

  let deletedPotential = await deletePotential(id);

  return {
    result: deletedPotential,
  };
};
