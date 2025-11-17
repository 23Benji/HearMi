// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend läuft 🎧' });
});

app.get('/api/exercises', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exercises')   
      .select('*');

    if (error) {
      console.error('Supabase-Fehler:', error);
      return res
        .status(500)
        .json({ error: 'Datenbankfehler', details: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server-Fehler:', err);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
