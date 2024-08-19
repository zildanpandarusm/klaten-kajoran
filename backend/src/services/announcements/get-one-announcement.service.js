import { findOneAnnouncement } from '../../repositories/announcement.repository.js';

export const getOneAnnouncementService = async (id) => {
  let result = await findOneAnnouncement(id);

  if (result) {
    // Format tanggal jika ada
    result.formattedDate = new Date(result.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  return result;
};
