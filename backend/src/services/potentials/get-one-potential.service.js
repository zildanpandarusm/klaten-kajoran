import { findOnePotential } from '../../repositories/potential.repository.js';

export const getOnePotentialService = async (id) => {
  let result = await findOnePotential(id);

  if (result) {
    // Format tanggal jika ada
    result.formattedDate = new Date(result.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return result;
};
