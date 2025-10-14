Real-time crypto trading dashboard built with the MERN stack.
Includes secure JWT authentication, Binance live price streaming, and user trade management.


⚙️ Features

🔐 User signup/login with JWT

💹 Live BTC/USDT trade updates via Binance WebSocket

📈 Trade creation & history tracking

🧰 MongoDB Atlas for data storage

🚀 Setup
Backend
cd backend
npm install


.env

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


Start:

npm start

Frontend
cd frontend
npm install


.env

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000


Start:

npm start

☁️ Deployment (Render)

Backend:

Root: /backend

Build: npm install

Start: npm start

Frontend:

Root: /frontend

Build: npm run build

Publish: build

Env vars:

REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_WS_URL=wss://your-backend.onrender.com


TEST LINKS:
FRONTEND Link : https://cryptotrading-frontend.onrender.com
BACKEND Link : https://cryptotrading-backend.onrender.com
GITHUB Link For Frontend : https://github.com/primehta17/cryptotrading-frontend.git
GITHUB Link For Frontend : https://github.com/primehta17/cryptotrading-backend.git

🔐 Test Credentials
Email: testuser@gmail.com
Password: test1234


License: MIT License