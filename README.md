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


To handle client-side routing and enable navigation between different pages in a Single Page Application (SPA).
`npm install react-router-dom`

To display modern and user-friendly toast notifications for actions like success, error, or information messages.
`npm install react-hot-toast`

Install Tailwind CSS
`npm install tailwindcss @tailwindcss/vite`

Install daisyUI as a Node package:
`npm i -D daisyui@latest`

install axios
`$ npm i axios zustand`

To enable Cross-Origin Resource Sharing (CORS), allowing the frontend (e.g., React running on a different port) to communicate with the backend API securely.
`npm install cors`

for icon lib Lucide
`npm i lucide-react`