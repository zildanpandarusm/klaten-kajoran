import { createPost } from '../../repositories/post.repository.js';
import { cloudinary } from '../upload.service.js';

export const createPostService = async (data, file) => {
  if (!file) {
    throw new Error('File not provided');
  }

  const result = await cloudinary.uploader.upload(file.path);

  const post = {
    title: data.title,
    imageUrl: result.secure_url,
    public_id: result.public_id,
    desc: data.desc,
    descSingkat: data.descSingkat,
    category: data.category,
    date: new Date(),
  };

  let createdPost = await createPost(post);

  return {
    imageUrl: result.secure_url,
    result: createdPost,
  };
};
