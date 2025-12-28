# Blog Next

A modern, full-featured blog platform built with Next.js, TypeScript, and MongoDB.

## Demo

[Find the demo here](https://blog-next-red-three.vercel.app/)

## Features

- Next.js 16 app directory structure
- TypeScript throughout
- MongoDB with Mongoose for data modeling
- Authentication (JWT, bcryptjs)
- Admin dashboard for managing posts, users, comments, categories
- File uploads with Cloudinary
- Rich search (by title, tags, etc.)
- Pagination and infinite scroll
- Plop generators for fast scaffolding
- Custom UI components (with @julseb-lib/react)
- Responsive, accessible design

## Getting Started

1. **Install dependencies:**
   ```sh
   pnpm install
   # or
   npm install
   ```
2. **Set up environment variables:**
   - Copy `template.env` to `.env` and fill in your values.
3. **Run the development server:**
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint
- `plop` - Run Plop generators (see `/plop` folder)
- `seed-users` - Seed the database with test users

## Folder Structure

- `/src/app` - Next.js app directory (routes, pages, API)
- `/src/components` - React UI components
- `/src/models` - Mongoose models
- `/src/api` - API service layer
- `/src/context` - React context providers
- `/src/seed` - Database seed scripts
- `/plop` - Plop generators for scaffolding

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MongoDB & Mongoose
- Cloudinary
- Tailwind CSS (via @julseb-lib/react)
- ESLint, Prettier

## License

MIT
