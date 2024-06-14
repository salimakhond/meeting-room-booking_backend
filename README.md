# Meeting Room Booking System

[Meeting Room Booking System Live URL](https://assignment-03-zeta.vercel.app/)

## Introduction

**Meeting Room Booking System** is a managing meeting room booking services. This application allows customers to booking meeting room in online, and manage there bookings slot. This application build using Node.js and TypeScript.

## Features

- **User Authentication System**: Implement secure authentication with JWT and bcrypt.
- **Environment Configuration**: Manage environment variables using dotenv.
- **Input Validation**: Ensure robust input validation using Zod.
- **Database Integration**: Integrate seamlessly with MongoDB via Mongoose.
- **Code Quality**: Enforced coding standards with ESLint and Prettier.

## Technologies Used

- **Backend**:

  - Node.js
  - Express.js
  - TypeScript
  - Mongoose

- **Other Tools**:
  - Vercel (for hosting)
  - Git

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/salimakhond/meeting-room-booking_backend.git
   ```
2. **Navigate to the project directory:**
   ```sh
   cd your-repo-name
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up environment variables:**
   ```
   Create a .env file in the root directory and add the necessary environment variables as shown in .env.example.
   ```
5. **Build the project:**
   ```sh
   npm run build
   ```
6. **Start the application in development mode:**
   ```sh
   npm run start:dev
   ```
7. **Open the application in your browser:**
   ```
   Go to http://localhost:5000
   ```

## Usage

To use the application, follow these steps:

1. **SignUp/Login**: Access the authentication endpoints to create an account or log in.
2. **Protected Routes**: Use JWT to access protected routes after authentication.
3. **Database Operations**: Perform CRUD operations using the provided API endpoints.
