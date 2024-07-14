Here's an updated version of the README, including the additional dependencies: Toastify, Styled Components, and MUI Icons.

---

# MERN Stack Chat Application

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to send and receive messages in real-time, create chat rooms, and manage their user profiles.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup/login/logout)
- Real-time messaging
- Chat rooms
- User profiles
- Online status indicators
- Responsive design

## Technologies Used

- **Frontend:** React, Redux, Axios, Socket.io-client, Toastify, Styled Components, MUI Icons
- **Backend:** Node.js, Express, Socket.io
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS, Bootstrap, Styled Components

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Harshitjoshi133/ChatApp.git
   cd ChatApp
   ```

2. **Install dependencies:**

   **Backend:**
   ```sh
   cd server
   npm install
   ```

   **Frontend:**
   ```sh
   cd ../client
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the application:**

   **Backend:**
   ```sh
   cd server
   npm start
   ```

   **Frontend:**
   ```sh
   cd ../client
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Register a new user or login with an existing account.
3. Create or join a chat room.
4. Start chatting with other users in real-time.

## Project Structure

```
mern-chat-app/
├── client/             # Frontend code (React)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── utlis/
│       ├── App.js
│       └── index.js
├── server/             # Backend code (Node.js, Express)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to better fit your project's specifics and needs.
