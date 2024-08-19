import { createOrganization } from '../../repositories/organization.repository.js';
import { cloudinary } from '../upload.service.js';

export const createOrganizationService = async (data, file) => {
  if (!file) {
    throw new Error('File not provided');
  }

  const result = await cloudinary.uploader.upload(file.path);

  const organization = {
    nama: data.nama,
    imageUrl: result.secure_url,
    public_id: result.public_id,
    jabatan: data.jabatan,
    date: new Date(),
  };

  let createdOrganization = await createOrganization(organization);

  return {
    imageUrl: result.secure_url,
    result: createdOrganization,
  };
};
