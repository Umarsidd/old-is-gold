import dotenv from 'dotenv';
import app from './netlify/functions/app.js';

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 OLD IS GOLD Local API Server listening at http://localhost:${PORT}`);
});
