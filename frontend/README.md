# Beyond ChatGPT - Frontend

A Next.js frontend application with a Matrix-themed UI for the mental coach chat interface.

## Features

- **Matrix Theme**: Black background with green text, glowing effects, and Matrix-style aesthetics
- **Real-time Chat**: Interactive chat interface connected to the FastAPI backend
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth UX**: Auto-scrolling messages, typing indicators, and smooth animations

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- The FastAPI backend should be running (see main README for backend setup)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Configuration

The frontend is configured to connect to the backend API. By default, it connects to `http://localhost:8000`.

If your backend is running on a different URL, create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Replace `http://localhost:8000` with your actual backend URL.

## Running Locally

1. Make sure your FastAPI backend is running on `http://localhost:8000` (or update the API URL as described above).

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

The application will automatically reload when you make changes to the code.

## Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main chat page component
│   ├── page.module.css     # Styles for the chat page
│   └── globals.css         # Global styles and Matrix theme
├── lib/
│   └── api.ts              # API client for backend communication
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── next.config.js          # Next.js configuration
└── README.md               # This file
```

## Deployment on Vercel

This frontend is designed to work with Vercel. To deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project in Vercel
3. Configure environment variables if needed (set `NEXT_PUBLIC_API_URL` to your backend API URL)
4. Deploy!

The frontend will automatically build and deploy on Vercel.

## Troubleshooting

### Cannot connect to backend
- Ensure the FastAPI backend is running
- Check that the API URL in `.env.local` matches your backend URL
- Verify CORS is enabled on the backend (it should be based on the backend configuration)

### Port 3000 already in use
- Change the port by running: `npm run dev -- -p 3001`
- Or stop the process using port 3000

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Try building again with `npm run build`

## Development Notes

- The application uses Next.js 14 with the App Router
- TypeScript is used for type safety
- CSS Modules are used for component styling
- The Matrix theme is implemented with custom CSS animations and effects
