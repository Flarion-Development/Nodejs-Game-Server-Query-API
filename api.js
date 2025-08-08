import express from 'express';
import queryServer from './query.js';

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const API_HOST = process.env.SERVER_IP || 'localhost';
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express API!');
});

app.post('/query', async (req, res) => {
  const { game, serverip, serverport, queryport } = req.body;
  if (!game || !serverip || !serverport) {
    return res.status(400).json({ error: 'Missing required parameters: game, serverip, or serverport' });
  }
  const finalQueryPort = (queryport === undefined || queryport === null || queryport === '') ? serverport : queryport;
  try {
    const response = await queryServer(game, serverip, serverport, finalQueryPort);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Query failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://${API_HOST}:${PORT}`);
});
