import { findOneAnnouncement, updateAnnouncement } from '../../repositories/announcement.repository.js';
import { cloudinary } from '../upload.service.js';

export const updateAnnouncementService = async (id, data, file) => {
  const announcementLast = await findOneAnnouncement(id);
  if (!announcementLast) throw new Error('Data not found');
  let imageUrl = '';
  let public_id = '';
  if (file == undefined) {
    imageUrl = announcementLast.imageUrl;
    public_id = announcementLast.public_id;
  } else {
    await cloudinary.uploader.destroy(announcementLast.public_id);
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
    public_id = result.public_id;
  }

  const announcement = {
    title: data.title,
    imageUrl: imageUrl,
    public_id: public_id,
    desc: data.desc,
    date: new Date(),
  };

  let updatedAnnouncement = await updateAnnouncement(id, announcement);

  return {
    result: updatedAnnouncement,
  };
};
