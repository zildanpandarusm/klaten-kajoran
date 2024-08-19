import { deletePost } from '../../repositories/post.repository.js';
import { cloudinary } from '../upload.service.js';

export const deletePostService = async (public_id, id) => {
  const result = await cloudinary.uploader.destroy(public_id);

  let deletedPost = await deletePost(id);

  return {
    result: deletedPost,
  };
};
