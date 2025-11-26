<p align="center">
  <img src="frontend/src/assets/images/HearMi.svg" alt="HearMi Logo" width="400"/>
</p>

# Interactive Ear Training Application

HearMi is a modern web-based **ear-training platform** where users improve their musical hearing through **four training modes**:

1. **Single Note Recognition**
2. **Chord Recognition**
3. **Pitch Comparison**
4. **Interval Training (Prime → Octave)**

The app focuses purely on audio perception — **no piano keyboard, no visual notation**.  
Built with Angular, Node.js, Express, and Supabase.

---

# 🛠 Tech Stack

## Frontend
- Angular (TypeScript)
- HTML5 / CSS3
- Web Audio API (tone, chord & interval generation)
- Angular Routing
- Angular HttpClient (AJAX requests)

## Backend
- Node.js
- Express.js
- Supabase JS SDK

## Database
- Supabase (PostgreSQL)
- Supabase Auth (login/register)
- Supabase for storing stats & results

---

# 🎮 Training Modes (MVP)

## 1️⃣ Single Note Mode
- Plays one musical note using Web Audio API
- User selects the correct note name (C, D#, F, etc.)

## 2️⃣ Chord Recognition
Plays 3-note chords:
- Major  
- Minor  
- Dominant 7  
- Sus4  
- Power chord (5)  
- Major 6  
- Minor 6  
User selects which chord type they heard.

## 3️⃣ Pitch Comparison
Two notes played one after another:  
- Is the second note **higher**, **lower**, or **same**?  
- Optionally: how many semitones difference?

## 4️⃣ Interval Training (Prime → Octave)
Two notes forming classic intervals:
- Prime (unison)
- m2 (minor second)
- M2 (major second)
- m3
- M3
- Perfect 4th
- Tritone
- Perfect 5th
- m6
- M6
- m7
- M7
- Octave

User identifies the interval by ear.

---

# 👤 Authentication (Supabase)
- Register  
- Login  
- Logout  
- Session handling  
- Secure storage of user profiles

---

# 📊 Statistics (Profile Page)
- Overall accuracy  
- Accuracy per training mode  
- Last 20 attempts  
- Time spent training  
- Best streak per mode  

---

# 🤝 Team Roles

## Frontend Developer
- Angular components & routing  
- Web Audio API  
- Training mode logic  
- UI & design (HTML/CSS)  
- AJAX calls to backend  
- Stats and profile page  

## Backend Developer
- Express API  
- Supabase database logic  
- Authentication handling  
- Generate tasks (notes/chords/intervals)  
- Score and stats saving  

---

# 🚀 Installation

## Frontend
```bash
cd frontend
npm install
ng serve
````

## Backend

```bash
cd backend
npm install
node index.js
```
# 📜 License
This project is released under the MIT License.
