# 42 OS

**Quiet homepage for your life.**

This is a personal dashboard to track what you're doing with your time — books you're reading, projects you're building, things you're exploring. It's not a todo list. It's a way to stay aware of how you spend your time and attention.

## Features

- Add things you're doing across a few simple categories
- View them in one glance, like a living snapshot of your focus
- Use it fully offline or sign in to sync
- Keyboard-friendly interface

## Tech

- Next.js
- Tailwind CSS
- Clerk (auth)
- Redis KV

## Development

1. Clone the repository

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   - Create a `.env.local` file in the root directory
   - Copy content from `.env.example` and fill in your keys.

4. Run the development server
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:3000`
6. Sign up or log in with Clerk to start using the app
