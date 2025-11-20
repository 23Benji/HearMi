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

// Ergebnis speichern
app.post('/api/results', async (req, res) => {
  const { user_name, exercise_id, score } = req.body;

  // einfache Prüfung der Daten
  if (!user_name || !exercise_id || score === undefined) {
    return res.status(400).json({
      error: 'Felder fehlen (user_name, exercise_id, score)',
    });
  }

  try {
    const { data, error } = await supabase
      .from('results')
      .insert([
        { user_name, exercise_id, score },
      ])
      .select(); // gespeicherten Datensatz zurückgeben

    if (error) {
      console.error('Supabase-Fehler (INSERT results):', error);
      return res
        .status(500)
        .json({ error: 'Datenbankfehler', details: error.message });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Server-Fehler (POST /api/results):', err);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

// Ergebnisse holen (optional nach user_name filtern)
app.get('/api/results', async (req, res) => {
  const { user_name } = req.query; // ?user_name=Anna

  try {
    let query = supabase
      .from('results')
      .select('*')
      .order('created_at', { ascending: false });

    if (user_name) {
      query = query.eq('user_name', user_name);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase-Fehler (SELECT results):', error);
      return res
        .status(500)
        .json({ error: 'Datenbankfehler', details: error.message });
    }

    res.json(data);
  } catch (err) {
    console.error('Server-Fehler (GET /api/results):', err);
    res.status(500).json({ error: 'Serverfehler' });
  }
});
