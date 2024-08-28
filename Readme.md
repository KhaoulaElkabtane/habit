# Habit Tracker

A simple habit tracking app built with Express, MongoDB, and React.

## Prerequisites

Before running the project, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)


## Getting Started

### 1. Install Dependencies
Navigate to the root folder of the project and run the following command to install the necessary dependencies for server
```bash
    npm install 
```

for the client side
```bash
cd client
npm install 
```

### 2. Set Up the Environment Variables

Create a .env file in the root directory of the project, and add your own MongoDB URI:

```bash
MONGO_URI=mongodb://localhost:27017/habit-tracker-db
```

Replace mongodb://localhost:27017/habit-tracker-db with your own MongoDB URL if you're using a different environment or database.

### 3. Run the Project
The project consists of both a server and a client. To run both concurrently, you can use the following command:

```bash
npm start
```