import { findOneAbout, updateAbout } from '../../repositories/about.repository.js';

export const updateAboutService = async (id, data) => {
  const aboutBefore = await findOneAbout(id);

  const about = {
    email: data.email ?? aboutBefore.email,
    telp: data.telp ?? aboutBefore.telp,
    alamat: data.alamat ?? aboutBefore.alamat,
    jmlpdk: data.jmlpdk ?? aboutBefore.jmlpdk,
    sejarah: data.sejarah ?? aboutBefore.sejarah,
    visi: data.visi ?? aboutBefore.visi,
    misi: data.misi ?? aboutBefore.misi,
  };

  let updatedAbout = await updateAbout(id, about);

  return {
    result: updatedAbout,
  };
};
