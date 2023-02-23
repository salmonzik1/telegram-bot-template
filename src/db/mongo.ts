import mongoose, { connect } from 'mongoose';

import { config } from '@/config.ts';

export const runMongo = () => {
    mongoose.set('strictQuery', false);

    return connect(config.DATABASE_URL);
};
