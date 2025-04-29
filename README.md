We created the frontend and backend folders.
We installed React on the frontend using:
`` npm create vite@latest projectname``

To add a package.json file that Node.js can recognize in the backend, we used:
`` npm init -y ``

This command installs the essential packages to build a Node.js + Express backend API that:
Allows user authentication with JWT,
Stores data in MongoDB ,
Saves passwords securely,
Works with cookies,
Supports real-time data transmission (with socket.io),
Communicates smoothly with the frontend (via CORS)
`` npm i express mongoose dotenv jsonwebtoken bcryptjs cookie-parser cloudinary socket.io ``

We installed nodemon to automatically restart the Node.js app when files are changed:
`` npm i nodemon -D ``


