import { findAllAnnouncement } from '../../repositories/announcement.repository.js';

export const getAnnouncementService = async () => {
  let result = await findAllAnnouncement();

  const formattedResult = result.map((post) => ({
    ...post,
    formattedDate: new Date(post.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return formattedResult;
};
