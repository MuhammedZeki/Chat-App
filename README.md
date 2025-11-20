# 💬 Chat-App | Real-Time Messaging Application

A modern real-time chat application that enables seamless one-to-one messaging with live online status tracking, message notifications, and secure authentication.  
Developed using **React + Zustand + Socket.io** on the frontend and **Node.js + Express + MongoDB + JWT** on the backend.

---

## 🚀 Features

- 🔐 Secure user authentication (JWT + HTTP-only Cookies)
- 💬 Real-time messaging powered by Socket.io
- 🟢 Online user presence indicators
- 🔔 Real-time message notifications
- 📸 Profile image upload with Cloudinary
- 🌙 Modern & responsive UI styled with TailwindCSS + DaisyUI
- ⚡ State management with Zustand
- 🛠 Clean architecture & reusable components

---

## 🧠 Tech Stack

### **Frontend**
| Technology | Description |
|-----------|-------------|
| React 19 | UI framework |
| Zustand | Global state management |
| React Router Dom 7 | Client-side routing |
| Socket.io Client | Real-time messaging |
| TailwindCSS + DaisyUI | UI styling |
| Axios | API integration |
| React-Hot-Toast | User notifications |
| Lucide-React | Icons |

### **Backend**
| Technology | Description |
|-----------|-------------|
| Node.js / Express | API backend |
| MongoDB / Mongoose | Database |
| JWT | Authentication |
| Socket.io | Real-time communication |
| Cloudinary | Media storage |
| Bcryptjs | Password hashing |
| CORS / Cookie-Parser | Security & cookie handling |

---

## 📦 Installation & Run

### **Clone Repo**

```bash
git clone https://github.com/MuhammedZeki/Chat-App.git
cd Twitter-clone
```

2. Frontend paketleri yükleyin:

```bash
cd ./frontend
npm install
npm run dev
```

3. Backend paketleri yükleyin:

```bash
npm install
npm start
```

4. Ortam değişkenlerini `.env.local` dosyasında tanımlayın (örnek dosya içinde olabilir):

```env
MONGODB_URI=...
PORT=your_secret=...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## 🧪 Usage

- View your contacts and see which users are online in real-time.
- Send and receive instant messages with other users.
- Get live notifications for new messages.
- Update your profile information including name, username, and profile picture.
- Chat in one-to-one conversations with secure authentication.
- Enjoy a responsive UI that works on both desktop and mobile devices.

---

## 👨‍💻 Developer

**Muhammed Zeki**  
🔗 [GitHub Profilim](https://github.com/MuhammedZeki)
