import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectToDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get('/test', (req, res) => res.send("hello"));

// API routes
app.use('/api/auth', authRoutes);

// Start server after DB connection
const port = process.env.PORT || 5000;
connectToDB()
//   .then(() => {
//     app.listen(port, () => {
//       console.log(✅ Server running on http://localhost:${port});
//     });
//   })
//   .catch(err => {
//     console.error("❌ Failed to connect to DB:", err);
//   });


app.listen(5000, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
    });