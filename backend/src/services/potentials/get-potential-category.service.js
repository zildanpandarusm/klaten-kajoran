import { findAllPotentialCategory } from '../../repositories/potential.repository.js';
import { ObjectId } from 'mongodb';

export const getPotentialCategoryService = async (category) => {
  try {
    const pipeline = [
      {
        $match: {
          category: category,
        },
      },
      {
        $sort: {
          date: -1,
        },
      },
    ];

    const results = await findAllPotentialCategory(pipeline);
    const formattedResult = results.map((potential) => ({
      ...potential,
      formattedDate: new Date(potential.date).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }));

    return formattedResult;
  } catch (error) {
    console.error('Error fetching potentials:', error);
    throw new Error('Failed to fetch potentials');
  }
};
