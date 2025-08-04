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
<img width="1901" height="877" alt="image" src="https://github.com/user-attachments/assets/91952407-09a2-4db5-b17e-8efbf6461de4" />

<img width="1899" height="873" alt="image" src="https://github.com/user-attachments/assets/544e02d7-66fc-46ff-907a-26d0bc212bc3" />

Admin Dashboard - Only Admin can create ar room (so sign up as an admin to create a room)

<img width="1920" height="875" alt="image" src="https://github.com/user-attachments/assets/c1dc43fc-0c91-492a-a783-a6d8dd4d2f19" />

<img width="1903" height="872" alt="image" src="https://github.com/user-attachments/assets/89449dc5-40d8-44bb-94cd-f1ed02c41b98" />

Student Dashboard - Student needs to enter the room id provided by the Admin to login

<img width="1920" height="872" alt="image" src="https://github.com/user-attachments/assets/8ea5b539-0628-44e6-bb1f-299edda35f9d" />


<img width="1899" height="873" alt="image" src="https://github.com/user-attachments/assets/81f1262e-2e07-4653-b7f9-a8b17e251354" />

Output - Synced across both admin and student pages
<img width="1899" height="880" alt="image" src="https://github.com/user-attachments/assets/729f5c4d-4ac6-4ca3-bb59-2b3c131e54b3" />

It also provides exact errors if any in code
<img width="1628" height="309" alt="image" src="https://github.com/user-attachments/assets/db96e883-fd52-459b-80c3-ffea1299c5dd" />



🛠️ Future Improvements


- Video Chat feature
  
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
git clone https://github.com/hrishikesh-bhatia/codemate.git
cd codemate

Create a .env file in main codemate folder
JUDGE0_API_KEY=your_rapidapi_key
MONGODB_URI=your_mongo_connection_string
JWT_SECRET = Your_Secret_Key

Setup Backend
- cd server
- npm install
- npm run dev

Setup Frontend
- cd client
- npm install
- npm run dev

Setup Peerjs(for voice chat feature)

To run the PeerJS server from terminal, you need to have peerjs installed globally if not run this command in terminal(powershell)
- npm install -g peer

Then you can run in server:
peerjs --port 9000 --host localhost


