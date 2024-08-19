import { createPostService } from '../services/posts/create-post.service.js';
import { deletePostService } from '../services/posts/delete-post.service.js';
import { getOnePostService } from '../services/posts/get-one-post.service.js';
import { getPostCategoryService } from '../services/posts/get-post-category.service.js';
import { getPostService } from '../services/posts/get-post.service.js';
import { updatePostService } from '../services/posts/update-post.service.js';

const getPost = async (req, res, next) => {
  try {
    const result = await getPostService();

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getOnePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getOnePostService(id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const getPostCategory = async (req, res, next) => {
  try {
    const { id, kategori } = req.params;
    const result = await getPostCategoryService(id, kategori);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { body, file } = req;
    const result = await createPostService(body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { body, file } = req;
    const { id } = req.params;
    const result = await updatePostService(id, body, file);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { public_id } = req.body;
    const result = await deletePostService(public_id, id);

    return res.status(200).json({ status: 'success', data: result });
  } catch (e) {
    next(e);
  }
};

export { getPost, getOnePost, createPost, updatePost, deletePost, getPostCategory };
