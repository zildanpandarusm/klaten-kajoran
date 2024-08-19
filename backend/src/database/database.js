import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

function Database(collectionName) {
  const uri = 'mongodb+srv://zildanmarginata:GWURjyw5L4AooPHC@desakajoran.gqupmif.mongodb.net/?retryWrites=true&w=majority&appName=desakajoran';
  // const uri = 'mongodb://127.0.0.1:27017';
  const dbName = 'desa_kajoran';
  const client = new MongoClient(uri);

  const connect = async () => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      console.log('Berhasil terhubung ke MongoDB');
      return { db, collection };
    } catch (error) {
      console.error('Gagal terhubung ke MongoDB:', error);
      throw error;
    }
  };

  return {
    connect,
  };
}

export default Database;
