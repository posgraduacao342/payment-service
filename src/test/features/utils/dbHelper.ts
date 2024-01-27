import { MongoClient } from 'mongodb';

const mongoUrl = 'mongodb://localhost:27017/test';

export async function connectToDatabase() {
  const client = new MongoClient(mongoUrl);

  try {
    await client.connect();
    console.log('Conectado ao banco de dados MongoDB');
    return client;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
    throw error;
  }
}

export async function clearCollection(collectionName) {
  const client = await connectToDatabase();
  const collection = client.db().collection(collectionName);

  try {
    await collection.deleteMany({});
    console.log(`Coleção '${collectionName}' limpa`);
  } catch (error) {
    console.error(`Erro ao limpar a coleção '${collectionName}':`, error);
    throw error;
  } finally {
    await client.close();
  }
}
