import { findOneAbout } from '../../repositories/about.repository.js';

export const getOneAboutService = async (id) => {
  let result = await findOneAbout(id);

  return result;
};
