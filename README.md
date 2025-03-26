# Vue.js + Next.js Todo Application

A full-stack todo application built with Vue.js 3 (frontend) and Next.js (backend).

## Live Demo

Check out the live application: [Vue.js + Next.js Todo App](https://vue-nextjs-exercise-azi5.vercel.app/)

## Demo

![Todo App Demo](frontend/assets/Todo_App_Demo.gif)

## Project Structure

```
.
├── frontend/          # Vue.js 3 frontend application
└── server/           # Next.js backend API
```

## Prerequisites

- Node.js (v19 or higher)
- npm (v10 or higher)

## Setup Instructions

### Backend Setup (Next.js)

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The backend server will run on `http://localhost:3000`

### Frontend Setup (Vue.js)

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`

## Features

- User Authentication
- Todo CRUD Operations
- Protected Routes
- Modern UI with Tailwind CSS
- TypeScript Support
- CORS Enabled API

## API Endpoints

- `POST /api/login` - User authentication
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `DELETE /api/todos/[id]` - Delete a todo

## Development

### Frontend Development

The frontend is built with:

- Vue.js 3
- TypeScript
- Vite
- Tailwind CSS

### Backend Development

The backend is built with:

- Next.js
- TypeScript
- JWT Authentication
- In-memory Data Storage

## Environment Variables

### Frontend

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:3000
```

### Backend

Create a `.env` file in the server directory:

```
JWT_SECRET=your-secret-key
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
