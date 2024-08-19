import { createAbout } from '../../repositories/about.repository.js';

export const createAboutService = async (data) => {
  const about = {
    email: data.email,
    telp: data.telp,
    alamat: data.alamat,
    jmlpdk: data.jmlpdk,
    sejarah: data.sejarah,
    visi: data.visi,
    misi: data.misi,
  };
  console.log(about);
  console.log('data', data);

  let createdAbout = await createAbout(about);

  return {
    result: createdAbout,
  };
};
