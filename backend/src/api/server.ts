import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { initializeDb } from '../db/postgresClient';
import interactionRoutes from './routes/interactionRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', interactionRoutes);

const startServer = async () => {
  await initializeDb();
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

// This only runs if this file is executed directly, not when imported
// (e.g., for testing)
if (require.main === module) {
  startServer();
}
export default app;