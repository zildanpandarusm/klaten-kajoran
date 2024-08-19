import { createPotential } from '../../repositories/potential.repository.js';
import { cloudinary } from '../upload.service.js';

export const createPotentialService = async (data, file) => {
  if (!file) {
    throw new Error('File not provided');
  }

  const result = await cloudinary.uploader.upload(file.path);

  const potential = {
    title: data.title,
    imageUrl: result.secure_url,
    public_id: result.public_id,
    desc: data.desc,
    descSingkat: data.descSingkat,
    maps: data.maps,
    category: data.category,
    phone: data.phone,
    date: new Date(),
  };

  let createdPotential = await createPotential(potential);

  return {
    imageUrl: result.secure_url,
    result: createdPotential,
  };
};
