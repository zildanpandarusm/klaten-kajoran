import { findAllPotential } from '../../repositories/potential.repository.js';

export const getPotentialService = async () => {
  let result = await findAllPotential();

  const formattedResult = result.map((post) => ({
    ...post,
    formattedDate: new Date(post.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return formattedResult;
};
