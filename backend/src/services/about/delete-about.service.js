import { findOneAbout, deleteAbout } from '../../repositories/about.repository.js';

export const deleteAboutService = async (id) => {
  const about = await findOneAbout(id);

  if (!about) {
    throw new Error('About not found');
  }

  let deletedAbout = await deleteAbout(id);

  return {
    result: deletedAbout,
  };
};
