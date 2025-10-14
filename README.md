Real-Time Cryptocurrency Trading Dashboard

This application is a comprehensive cryptocurrency trading dashboard developed using the MERN stack, designed to provide real-time market data and secure user interactions. It integrates live price streaming from Binance, user authentication with JWT, and robust trade management features.

⚙️ Features

User Authentication: Secure signup and login functionality utilizing JSON Web Tokens (JWT) for session management.

Real-Time Market Data: Live streaming of BTC/USDT trading pairs via Binance WebSocket API, ensuring up-to-date market information.

Trade Management: Capabilities for users to create, view, and manage their trade history, facilitating effective portfolio tracking.

Data Storage: Utilization of MongoDB Atlas for scalable and reliable data storage solutions.

🚀 Setup Instructions
Backend

Navigate to the backend directory:

cd backend


Install dependencies:

npm install


Configure environment variables by creating a .env file with the following content:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


Start the backend server:

npm start

Frontend

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Configure environment variables by creating a .env file with the following content:

REACT_APP_API_URL=http://localhost:5000
REACT_APP_WS_URL=ws://localhost:5000


Start the frontend development server:

npm start

☁️ Deployment on Render
Backend Deployment

Set the root directory to /backend.

Install dependencies:

npm install


Start the backend server:

npm start

Frontend Deployment

Set the root directory to /frontend.

Build the frontend application:

npm run build


Publish the build directory.

Configure environment variables:

REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_WS_URL=wss://your-backend.onrender.com

🔗 Live Demo and Repository Links

Frontend Demo: https://cryptotrading-frontend.onrender.com

Backend Demo: https://cryptotrading-backend.onrender.com

Frontend GitHub Repository: https://github.com/primehta17/cryptotrading-frontend.git

Backend GitHub Repository: https://github.com/primehta17/cryptotrading-backend.git

Project Demonstration Video: https://drive.google.com/file/d/1zXV6lh0MZ5W4LBU_vVvYTLMJom2nTPTW/view?usp=sharing(View on Google Drive)

🔐 Test Credentials

Email: testuser@gmail.com
Password: test1234

📄 License
This project is licensed under the MIT License.