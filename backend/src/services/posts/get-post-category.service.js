import { findAllPostCategory } from '../../repositories/post.repository.js';
import { ObjectId } from 'mongodb';

export const getPostCategoryService = async (id, category) => {
  try {
    const pipeline = [
      {
        $match: {
          category: category,
          _id: { $ne: new ObjectId(id) }, // Mengecualikan dokumen dengan id yang diberikan
        },
      },
      {
        $sort: {
          date: -1, // Mengurutkan berdasarkan tanggal, dari terbaru ke terlama
        },
      },
    ];

    const results = await findAllPostCategory(pipeline);
    const formattedResult = results.map((post) => ({
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
