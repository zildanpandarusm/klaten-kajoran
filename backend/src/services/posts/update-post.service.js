import { findOnePost, updatePost } from '../../repositories/post.repository.js';
import { cloudinary } from '../upload.service.js';

export const updatePostService = async (id, data, file) => {
  const postLast = await findOnePost(id);
  if (!postLast) throw new Error('Data not found');
  let imageUrl = '';
  let public_id = '';
  if (file == undefined) {
    imageUrl = postLast.imageUrl;
    public_id = postLast.public_id;
  } else {
    await cloudinary.uploader.destroy(postLast.public_id);
    const result = await cloudinary.uploader.upload(file.path);
    imageUrl = result.secure_url;
    public_id = result.public_id;
  }

  const post = {
    title: data.title,
    imageUrl: imageUrl,
    public_id: public_id,
    desc: data.desc,
    descSingkat: data.descSingkat,
    category: data.category,
    date: new Date(),
  };

  let updatedPost = await updatePost(id, post);

  return {
    result: updatedPost,
  };
};
