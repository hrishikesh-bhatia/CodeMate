# CodeMate 

**CodeMate** is a real-time collaborative code editor that allows multiple users (students & mentors) to write, run, and debug code together with voice chat — just like Google Docs + Replit + Zoom all in one!

---

## ✨ Features

- 🔄 Real-time collaborative coding (via WebSockets)
- 🧠 Role-based system: Students & Teaching Assistants (TAs)
- 🧪 Code execution powered by [Judge0 API](https://rapidapi.com/judge0-official/api/judge0-ce)
- 🧠 Supports standard input (stdin) and error handling
- 📞 Built-in voice calling using WebRTC (PeerJS)
- 💾 Persistent session saving via MongoDB
- 🔁 Auto-sync code on join for new users
- 🧩 Language selector and theme switcher 

---

## ⚙️ Tech Stack

### Frontend:
- React
- Monaco Editor
- Socket.IO Client
- PeerJS (WebRTC voice)

### Backend:
- Node.js
- Express
- Socket.IO
- Judge0 API (via RapidAPI)
- MongoDB (Mongoose)

---

🚀 Usage
- Open the app in two tabs or two devices

- Join the same room via room ID(Room can only be created by a mentor or TA)

- Collaborate in real-time: code, edit, talk, and run programs!

- Code is saved automatically and loaded for new participants

🛡️ Security Notes

- Judge0 execution is sandboxed
  
- Only room participants can access session code
  
- Voice calls use P2P via WebRTC (no media is stored)

📸 Demo


🛠️ Future Improvements


- Chatbox alongside voice
  
- File system support
  
- Whiteboard or notes tab
  
- Better auth and room controls


## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

MIT © [Hrishikesh Bhatia](https://github.com/hrishikesh-bhatia)


## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/codemate.git
cd codemate

Create a .env file in main codemate folder
JUDGE0_API_KEY=your_rapidapi_key
MONGODB_URI=your_mongo_connection_string


Setup Backend
- cd backend
- npm install
- Start the server: npm run dev

Setup Frontend
- cd frontend
- npm install
- npm run dev
