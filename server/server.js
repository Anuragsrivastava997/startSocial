import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.set('strictQuery', false);
async () => {
      await mongoose
            .connect(
                  process.env.DB_URL.replace('<password>', process.env.DB_PASSWORD),
                  {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                  },
            )
            .then(() => {
                  console.log('Connected to MongoDB');
            })
            .catch((error) => {
                  console.log(error.message);
            });
};

app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
});
