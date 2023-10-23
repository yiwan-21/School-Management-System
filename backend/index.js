import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URI);
console.log(process.env.JWT_SECRET);