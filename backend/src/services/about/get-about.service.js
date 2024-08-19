import { findAllAbout } from '../../repositories/about.repository.js';

export const getAboutService = async () => {
  let result = await findAllAbout();

  return result;
};
