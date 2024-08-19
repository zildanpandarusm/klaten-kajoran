import Database from '../database/database.js';
import { ObjectId } from 'mongodb';

const collectionName = 'posts';

const getCollection = async () => {
  const dbInstance = Database(collectionName);
  const { collection } = await dbInstance.connect();
  return collection;
};

export const findOnePost = async (id) => {
  try {
    const collection = await getCollection();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Gagal menemukan data:', error);
    throw error;
  }
};

export const findAllPost = async (id) => {
  try {
    const collection = await getCollection();
    const cursor = await collection.find({}).sort({ date: -1 });
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.error('Gagal menemukan data:', error);
    throw error;
  }
};

export const findAllPostCategory = async (pipeline) => {
  try {
    const collection = await getCollection();
    const results = await collection.aggregate(pipeline).toArray();
    return results;
  } catch (error) {
    console.error('Gagal menemukan data:', error);
    throw error;
  }
};

export const createPost = async (data) => {
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error('Gagal memasukkan data:', error);
    throw error;
  }
};

export const updatePost = async (id, data) => {
  try {
    const collection = await getCollection();
    const result = await collection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: data,
      }
    );
    return result;
  } catch (error) {
    console.error('Gagal memasukkan data:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Gagal menghapus data:', error);
    throw error;
  }
};
