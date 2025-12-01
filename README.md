
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
- **Angular 16+** (Standalone Components)
- **TypeScript**
- **SCSS** (Glassmorphism UI)
- **Web Audio API** (Real-time tone generation)
- **Lucide Angular** (Icons)

## Backend
- **Node.js** & **Express**
- **TypeScript**
- **Supabase** (PostgreSQL Database, Auth, Storage)
- **Multer** (Avatar Uploads)

---

# 🎮 Training Modes

## 1️⃣ Single Note Mode
- Plays one musical note using the Web Audio API.
- User selects the correct note name (C, C#, D, etc.).

## 2️⃣ Chord Recognition
Plays 3-note chords. Identify the quality:
- Major
- Minor
- Dominant 7
- Sus4
- Power Chord (5)

## 3️⃣ Pitch Comparison
Two notes are played sequentially. Determine if the second note is:
- **Higher**
- **Lower**
- **Same**

## 4️⃣ Interval Training (Unison → Octave)
Two notes are played harmonically and melodically. Identify the interval:
- Unison (Prime)
- Minor 2nd (m2) / Major 2nd (M2)
- Minor 3rd (m3) / Major 3rd (M3)
- Perfect 4th (P4)
- Tritone
- Perfect 5th (P5)
- Minor 6th (m6) / Major 6th (M6)
- Minor 7th (m7) / Major 7th (M7)
- Octave

---

# 👤 Authentication & Profile
- **JWT Authentication:** Secure Register & Login via Supabase.
- **Profile Management:**
  - Upload/Change Profile Picture (stored in Supabase Storage).
  - "Danger Zone": Reset all progress or Delete account permanently.

---

# 📊 Statistics (Dashboard)
- **Overall Accuracy** & Total Sessions played.
- **Detailed Breakdown:** Best streak and accuracy per training mode.
- **Recent Activity:** History of the last 5 training sessions.

---

# 🤝 Team Roles

## Frontend Developer (23|Benji)
- Angular architecture & routing.
- Web Audio API integration (Sound generation).
- Responsive UI/UX design (Glassmorphism).
- Game logic & State management.

## Backend Developer (HerWang)
- Express API with TypeScript.
- Database schema & Supabase integration.
- Authentication middleware (JWT).
- API endpoints for Results, Users, and Avatars.

---

# 🚀 Installation

### Prerequisites
- Node.js (v18+)
- A Supabase project (URL & Service Key)

### 1. Frontend
```bash
cd frontend
npm install
ng serve
````

*Navigate to `http://localhost:4200/`*

### 2\. Backend

Create a `.env` file in the `backend` folder with:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
```

Then run:

```bash
cd backend
npm install
npm run dev
```

*API runs on `http://localhost:3000/`*

-----

# 📜 License

This project is released under the MIT License.
