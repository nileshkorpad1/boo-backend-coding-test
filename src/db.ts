import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export const connectDB = async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection.on('error', (e) => {
        console.error(e);
    });
};

export const closeDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};
