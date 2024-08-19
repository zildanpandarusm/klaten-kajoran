import { findOnePost } from '../../repositories/post.repository.js';

export const getOnePostService = async (id) => {
  try {
    let result = await findOnePost(id);

    if (result) {
      // Format tanggal jika ada
      result.formattedDate = new Date(result.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }

    return result;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
};
