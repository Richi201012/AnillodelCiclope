import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ciclopesnacks',
  jwtSecret: process.env.JWT_SECRET || 'supersecret'
};

export default config;
