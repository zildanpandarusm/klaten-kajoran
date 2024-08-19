import { findOneOrganization, updateOrganization } from '../../repositories/organization.repository.js';
import { cloudinary } from '../upload.service.js';

export const updateOrganizationService = async (id, data, file) => {
  const organizationLast = await findOneOrganization(id);
  if (!organizationLast) throw new Error('Data not found');
  let imageUrl = '';
  let public_id = '';
  if (file == undefined) {
    imageUrl = organizationLast.imageUrl;
    public_id = organizationLast.public_id;
  } else {
    await cloudinary.uploader.destroy(organizationLast.public_id);
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
    public_id = result.public_id;
  }

  const organization = {
    nama: data.nama,
    imageUrl: imageUrl,
    public_id: public_id,
    jabatan: data.jabatan,
    date: new Date(),
  };

  let updatedOrganization = await updateOrganization(id, organization);

  return {
    result: updatedOrganization,
  };
};
