import { findAllPost } from '../../repositories/post.repository.js';

export const getPostService = async () => {
  try {
    const result = await findAllPost();
    const formattedResult = result.map((post) => ({
      ...post,
      formattedDate: new Date(post.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }));

    return formattedResult;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};
