import { findOnePotential, updatePotential } from '../../repositories/potential.repository.js';
import { cloudinary } from '../upload.service.js';

export const updatePotentialService = async (id, data, file) => {
  const potentialLast = await findOnePotential(id);
  if (!potentialLast) throw new Error('Data not found');
  let imageUrl = '';
  let public_id = '';
  if (file == undefined) {
    imageUrl = potentialLast.imageUrl;
    public_id = potentialLast.public_id;
  } else {
    await cloudinary.uploader.destroy(potentialLast.public_id);
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
    public_id = result.public_id;
  }

  const potential = {
    title: data.title,
    imageUrl: imageUrl,
    public_id: public_id,
    desc: data.desc,
    descSingkat: data.descSingkat,
    maps: data.maps,
    category: data.category,
    phone: data.phone,
    date: new Date(),
  };

  let updatedPotential = await updatePotential(id, potential);

  return {
    result: updatedPotential,
  };
};
