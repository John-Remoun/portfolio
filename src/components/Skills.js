import { useRef, useState, useEffect } from 'react';
import { useReveal } from './useReveal';
import './Skills.css';

const BARS = [
  { name: 'Node.js / Express.js / TypeScript', pct: 95, cat: 'Backend & Runtimes' },
  { name: 'React.js / Next.js / Frontend',      pct: 92, cat: 'Frontend Architecture' },
  { name: 'RESTful & GraphQL APIs',            pct: 92, cat: 'API Architecture' },
  { name: 'MongoDB & Aggregations',            pct: 90, cat: 'Databases & Schemas' },
  { name: 'Redis & Caching Strategies',        pct: 88, cat: 'Caching & Rate Limiting' },
  { name: 'OAuth2, JWT & System Security',      pct: 92, cat: 'Security & Auth' },
  { name: 'Socket.IO / Real-Time Engines',      pct: 86, cat: 'Real-Time Systems' },
  { name: 'Data Structures & Algorithms',      pct: 90, cat: 'Computer Science Core' },
  { name: 'Docker, Git & Linux Tooling',        pct: 82, cat: 'DevOps & Tooling' },
];

// OFFICIAL SVG LOGOS FOR FRONTEND, BACKEND, DB, SECURITY, DEVOPS & CS
const ICONS = {
  // FRONTEND
  html: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.659-13.214-.001.705 8.034h8.809l-.361 3.961-3.526.952-3.521-.954-.226-2.585H4.63l.432 5.097 6.908 1.918 6.921-1.918.909-10.134H8.531z" fill="#E34F26"/></svg>
  ),
  css: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm14.73 13.916l.45-5.066H5.975l.233 2.658h7.009l-.226 2.583-3.522.952-3.524-.952-.152-1.724H3.14l.353 3.961 6.478 1.794 6.478-1.794.708-7.971H3.593L3.13 4.375h14.877l-.234 2.658H5.952l.23 2.658H16.23z" fill="#1572B6"/></svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" width="38" height="38"><circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" strokeWidth="1.2"><ellipse cx="12" cy="12" rx="10" ry="4.2"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)"/></g></svg>
  ),
  nextjs: (
    <svg viewBox="0 0 24 24" width="38" height="38"><circle cx="12" cy="12" r="11" fill="#000" stroke="#FFF" strokeWidth="1"/><path d="M14.5 7v10M9.5 7v10l5.8-8" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  redux: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5l-4-4 1.4-1.4L10 13.7l6.6-6.6L18 8.5l-8 8z" fill="#764ABC"/></svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4"/></svg>
  ),
  sass: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 12.82c-.8.8-2.2 1.3-3.84 1.3-3.2 0-5.4-1.8-5.4-4.5 0-3 2.6-4.8 6.1-4.8 2.2 0 3.7.8 4.2 1.4l-1.3 1.3c-.4-.4-1.4-1-2.9-1-2.2 0-3.8 1.1-3.8 3 0 1.8 1.4 2.8 3.5 2.8 1.1 0 2.1-.3 2.6-.8v-1.6h-2.6v-1.8h4.5v4.7z" fill="#CC6699"/></svg>
  ),
  bootstrap: (
    <svg viewBox="0 0 24 24" width="38" height="38"><rect width="24" height="24" rx="5" fill="#7952B3"/><path d="M8 5h4.8c2.4 0 3.7 1.1 3.7 2.7 0 1.3-.8 2.2-2 2.5 1.5.3 2.5 1.4 2.5 2.9 0 1.8-1.5 2.9-4 2.9H8V5zm2.4 4.2h2.2c.9 0 1.4-.4 1.4-1.1 0-.7-.5-1.1-1.4-1.1h-2.2v2.2zm0 4.6h2.5c1 0 1.6-.4 1.6-1.2 0-.8-.6-1.2-1.6-1.2h-2.5v2.4z" fill="#FFF"/></svg>
  ),
  vite: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M21.5 3.5L12.5 21 3.5 3.5h18z" fill="#FFC920"/><path d="M16.5 3.5L12 12 7.5 3.5h9z" fill="#9663E8"/></svg>
  ),

  // BACKEND & RUNTIMES
  js: (
    <svg viewBox="0 0 24 24" width="38" height="38"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M12.5 17.8c.6.9 1.4 1.5 2.6 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-2 1.6-3.5 4.1-3.5 1.8 0 3 .6 3.9 2.1l-1.9 1.2c-.5-.8-1.1-1.1-2-1.1-.8 0-1.3.4-1.3 1 0 .7.5 1 1.7 1.5l.7.3c2.2.9 3.4 1.9 3.4 4.1 0 2.4-1.8 3.7-4.4 3.7-2.3 0-3.8-1-4.7-2.7l1.8-1.2zm-6.2.3c.4.7.9 1.2 1.7 1.2.7 0 1.2-.4 1.2-1.4V8.7h2.6v9.1c0 2.3-1.3 3.5-3.5 3.5-1.9 0-3.1-.9-3.7-2.4l1.7-1.1z" fill="#000"/></svg>
  ),
  ts: (
    <svg viewBox="0 0 24 24" width="38" height="38"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M13.6 17.8c.6.9 1.4 1.5 2.6 1.5 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.9-.8-3.1-1.8-3.1-3.9 0-2 1.6-3.5 4.1-3.5 1.8 0 3 .6 3.9 2.1l-1.9 1.2c-.5-.8-1.1-1.1-2-1.1-.8 0-1.3.4-1.3 1 0 .7.5 1 1.7 1.5l.7.3c2.2.9 3.4 1.9 3.4 4.1 0 2.4-1.8 3.7-4.4 3.7-2.3 0-3.8-1-4.7-2.7l1.8-1.2zM4 8.7h7.2v2.2H7.7v9.4H5.1v-9.4H4V8.7z" fill="#FFF"/></svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2L2.5 7.5v11L12 24l9.5-5.5v-11L12 2zm6.7 14.8l-6.7 3.9-6.7-3.9v-7.8l6.7-3.9 6.7 3.9v7.8z" fill="#339933"/><path d="M12 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" fill="#66CC33"/></svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M24 18.25h-5.068l-3.321-4.945-3.371 4.945H7.172l4.896-7.009-4.547-6.491h5.118l3.024 4.498 3.074-4.498h5.068l-4.647 6.441L24 18.25zM0 11.251h7.172v1.749H0v-1.749z" fill="#F0EAD6"/></svg>
  ),
  rest: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M7.8 10.7l8.4-3.4M7.8 13.3l8.4 3.4"/></svg>
  ),
  graphql: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2L2 7.7v11.5L12 25l10-5.8V7.7L12 2zm7.7 15.8L12 22.2l-7.7-4.4V9.2L12 4.8l7.7 4.4v8.6z" fill="#E10098"/><circle cx="12" cy="4.8" r="2.2" fill="#E10098"/><circle cx="4.3" cy="9.2" r="2.2" fill="#E10098"/><circle cx="19.7" cy="9.2" r="2.2" fill="#E10098"/><circle cx="4.3" cy="17.8" r="2.2" fill="#E10098"/><circle cx="19.7" cy="17.8" r="2.2" fill="#E10098"/><circle cx="12" cy="22.2" r="2.2" fill="#E10098"/></svg>
  ),
  socketio: (
    <svg viewBox="0 0 24 24" width="38" height="38"><circle cx="12" cy="12" r="10" fill="#010101" stroke="#FFF" strokeWidth="1.5"/><path d="M7 12l3-6 1 4 6-2-3 6-1-4-6 2z" fill="#FFF"/></svg>
  ),
  multer: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12l4-4 4 4"/></svg>
  ),
  zod: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M3 5h18l-12 14h12" stroke="#3E67B1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
  ),

  // DATABASES (OFFICIAL MONGODB LEAF)
  mongodb: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12.5 24c-.3 0-.6-.1-.8-.4l-1.2-3.8c.8.2 1.6.3 2.4.3s1.6-.1 2.4-.3l-1.2 3.8c-.2.3-.5.4-.8.4z" fill="#47A248"/><path d="M12 0C12 0 6 6.3 6 12.3c0 3.3 2.7 6 6 6s6-2.7 6-6C18 6.3 12 0 12 0zm.6 16.9v-7.8c1.6.4 2.7 1.8 2.7 3.4 0 2.2-1.6 3.9-2.7 4.4z" fill="#13AA52"/><path d="M11.4 16.9v-7.8c-1.6.4-2.7 1.8-2.7 3.4 0 2.2 1.6 3.9 2.7 4.4z" fill="#11924B"/></svg>
  ),
  mongoose: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5l-4-4 1.4-1.4L10 13.7l6.6-6.6L18 8.5l-8 8z" fill="#880000"/></svg>
  ),
  aggregations: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><path d="M4 6h16M7 12h10M10 18h4"/><circle cx="18" cy="18" r="3"/><path d="M20 20l2 2"/></svg>
  ),
  schema: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="8.5" y="14" width="7" height="7" rx="1"/><path d="M6.5 10v2a2 2 0 002 2h7a2 2 0 002-2v-2"/></svg>
  ),
  redis: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M2 7.5L12 2l10 5.5v9L12 22 2 16.5v-9z" fill="#DC382D"/><path d="M12 6.5l6 3.3-6 3.3-6-3.3 6-3.3zm-6 5.8l5 2.8v4.2l-5-2.8v-4.2zm12 0v4.2l-5 2.8v-4.2l5-2.8z" fill="#FFF" opacity="0.9"/></svg>
  ),
  ratelimit: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#DC382D" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3M7 12h2M15 12h2"/></svg>
  ),
  sql: (
    <svg viewBox="0 0 24 24" width="38" height="38"><ellipse cx="12" cy="5" rx="9" ry="3" fill="#00758F"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" fill="none" stroke="#00758F" strokeWidth="2"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" fill="none" stroke="#00758F" strokeWidth="2"/></svg>
  ),

  // SECURITY
  jwt: (
    <svg viewBox="0 0 24 24" width="38" height="38"><rect width="24" height="24" rx="4" fill="#000"/><path d="M7 8h10v2H7V8zm0 4h10v2H7v-2zm0 4h7v2H7v-2z" fill="#FB015B"/><circle cx="17" cy="17" r="2" fill="#00E676"/></svg>
  ),
  oauth: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
  ),
  rbac: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"/><circle cx="12" cy="11" r="3"/><path d="M7 18c0-2.5 2.2-4 5-4s5 1.5 5 4"/></svg>
  ),
  aes: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/><circle cx="12" cy="16" r="1.5"/></svg>
  ),
  bcrypt: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><path d="M21 2l-2 2m-2-2l2 2m4 0l-2 2M3 11h18M3 17h18M3 5h10"/><circle cx="16" cy="5" r="2"/></svg>
  ),
  argon2: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  ),
  otp: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><rect x="6" y="2" width="12" height="20" rx="3"/><circle cx="12" cy="18" r="1"/><path d="M9 7h6M9 10h6M9 13h3"/></svg>
  ),

  // DEVOPS & TOOLS
  git: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M21.6 10.9l-8.5-8.5c-.8-.8-2-.8-2.8 0L8 4.7 10.3 7c.6-.2 1.3-.1 1.8.4.5.5.7 1.3.4 1.9l2.4 2.4c.6-.3 1.4-.1 1.9.4.7.7.7 1.8 0 2.5s-1.8.7-2.5 0c-.5-.5-.7-1.3-.4-1.9l-2.2-2.2V16c.2.1.4.3.5.5.7.7.7 1.8 0 2.5s-1.8.7-2.5 0-1.8-.7 0-2.5c.3-.3.7-.5 1.2-.5V9.4c-.5 0-.9-.2-1.2-.5-.5-.5-.7-1.3-.4-1.9L7 4.7 2.4 9.3c-.8.8-.8 2 0 2.8l8.5 8.5c.8.8 2 .8 2.8 0l7.9-7.9c.8-.8.8-2 0-2.8z" fill="#F05032"/></svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#FFF"/></svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M13.98 11.08h2.12v2.16h-2.12v-2.16zm-3.1 0h2.12v2.16h-2.12v-2.16zm-3.1 0h2.12v2.16H7.78v-2.16zm-3.1 0h2.12v2.16H4.68v-2.16zm9.3-3.16h2.12v2.16h-2.12V7.92zm-3.1 0h2.12v2.16h-2.12V7.92zm-3.1 0h2.12v2.16H7.78V7.92zm6.2-3.16h2.12v2.16h-2.12V4.76zm-12.76 11.2c-.32 1.3.4 2.8 1.74 3.7 2.22 1.48 5.6 1.87 8.35 1.13 3.66-1 6.27-4.14 6.78-7.85.93.18 1.86.07 2.6-.32.4-.2.83-.55 1.07-.94-.52-.12-1.05-.12-1.57.02-.75.2-1.46.6-2.17.65-.22-1.52-1.12-2.88-2.45-3.66l-.52-.3-1.08.38c-.8.28-1.54.83-2.15 1.5-.78-.13-1.6-.17-2.4-.1-3.6.3-6.6 2.47-7.9 5.89z" fill="#2496ED"/></svg>
  ),
  postman: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M13.4 2.1L3.9 7.6v11l9.5 5.5 9.5-5.5v-11l-9.5-5.5z" fill="#FF6C37"/><path d="M12 16.5l-4.5-2.6v-5.2L12 6.1l4.5 2.6v5.2L12 16.5z" fill="#FFF"/></svg>
  ),
  stripe: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.764-1.353 2.012-1.353 2.011 0 3.766.864 3.766 2.062h3.407c0-3.08-2.493-4.996-6.91-4.996-4.226 0-6.942 2.146-6.942 4.965 0 3.864 5.068 4.453 6.942 5.166 2.14.806 3.197 1.583 3.197 2.534 0 .963-.89 1.492-2.235 1.492-2.393 0-4.372-1.103-4.372-2.535H6.077c0 3.407 2.913 5.43 7.611 5.43 4.545 0 7.356-2.053 7.356-5.166 0-3.957-5.13-4.577-7.068-5.19z" fill="#635BFF"/></svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 1L24 22H0L12 1z" fill="#FFF"/></svg>
  ),
  netlify: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M6.3 3.4L2.8 7l7.8 7.8 3.5-3.5L6.3 3.4zm11.4 0l-7.8 7.8 3.5 3.5 7.8-7.8-3.5-3.5zm-11.4 17.2l7.8-7.8-3.5-3.5-7.8 7.8 3.5 3.5zm11.4 0l3.5-3.5-7.8-7.8-3.5 3.5 7.8 7.8z" fill="#00C7B7"/></svg>
  ),
  linux: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2C9.5 2 8 4.5 8 7v4c-1 1-2 3-2 5 0 3 2.5 5 6 5s6-2 6-5c0-2-1-4-2-5V7c0-2.5-1.5-5-4-5zm-2 5c0-1 1-2 2-2s2 1 2 2v2h-4V7zm2 13c-2.5 0-4-1.2-4-3 0-1.2.8-2.5 1.7-3.4l.3-.3V15h4v-1.7l.3.3c.9.9 1.7 2.2 1.7 3.4 0 1.8-1.5 3-4 3z" fill="#FCC624"/><circle cx="10" cy="7" r="1" fill="#000"/><circle cx="14" cy="7" r="1" fill="#000"/></svg>
  ),

  // CS CORE
  cpp: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm-1 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.4 0 2.7.7 3.4 1.8l-1.8 1c-.3-.5-.9-.8-1.6-.8-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c.7 0 1.3-.3 1.6-.8l1.8 1c-.7 1.1-2 1.8-3.4 1.8zm6-3.5h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1zm3 0h-1v1h-1v-1h-1v-1h1v-1h1v1h1v1z" fill="#00599C"/></svg>
  ),
  python: (
    <svg viewBox="0 0 24 24" width="38" height="38"><path d="M11.9 2c-5.2 0-4.8 2.2-4.8 2.2v2.3h4.9v.7H5.1S2 6.8 2 12c0 5.2 2.7 5 2.7 5h1.6v-2.3c0-2.6 2.3-2.5 2.3-2.5h4.8s2.2.1 2.2-2.1V4.2s.4-2.2-3.7-2.2zm-2.7 1.5c.5 0 .9.4.9.9 0 .5-.4.9-.9.9s-.9-.4-.9-.9c.1-.5.5-.9.9-.9z" fill="#3776AB"/><path d="M12.1 22c5.2 0 4.8-2.2 4.8-2.2v-2.3h-4.9v-.7h6.9s3.1.4 3.1-4.8c0-5.2-2.7-5-2.7-5h-1.6v2.3c0 2.6-2.3 2.5-2.3 2.5h-4.8s-2.2-.1-2.2 2.1v3.7s-.4 2.2 3.7 2.2zm2.7-1.5c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9.5 0 .9.4.9.9 0 .5-.4.9-.9.9z" fill="#FFD43B"/></svg>
  ),
  ds: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="M10.5 7.5L6.5 15.5M13.5 7.5l4 8M8 18h8"/></svg>
  ),
  algo: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M9 6h6M12 6v9"/></svg>
  ),
  oop: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#C9A84C" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  ),
  problem: (
    <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#E8C97A" strokeWidth="1.8"><path d="M9 18h6M10 22h4M12 2a7 7 0 00-7 7c0 2.5 1.3 4.7 3.3 6C9 15.8 9.5 17 9.5 18h5c0-1 .5-2.2 1.2-3 2-1.3 3.3-3.5 3.3-6a7 7 0 00-7-7z"/></svg>
  ),
};

// 2 BALANCED ROWS INCLUDING FRONTEND, BACKEND, DATABASES, SECURITY, DEVOPS & CS
const TECH_ROW1 = [
  { l: 'React.js',          i: ICONS.react },
  { l: 'Next.js',           i: ICONS.nextjs },
  { l: 'JavaScript (ES6+)', i: ICONS.js },
  { l: 'TypeScript',        i: ICONS.ts },
  { l: 'HTML5',             i: ICONS.html },
  { l: 'CSS3',              i: ICONS.css },
  { l: 'Redux Toolkit',     i: ICONS.redux },
  { l: 'Tailwind CSS',      i: ICONS.tailwind },
  { l: 'Sass / SCSS',       i: ICONS.sass },
  { l: 'Bootstrap',         i: ICONS.bootstrap },
  { l: 'Vite',              i: ICONS.vite },
  { l: 'Node.js',           i: ICONS.nodejs },
  { l: 'Express.js',        i: ICONS.express },
  { l: 'RESTful APIs',     i: ICONS.rest },
  { l: 'GraphQL',          i: ICONS.graphql },
  { l: 'Socket.IO',        i: ICONS.socketio },
  { l: 'Multer',           i: ICONS.multer },
  { l: 'Zod Validation',   i: ICONS.zod },
  { l: 'MongoDB (Official)',i: ICONS.mongodb },
  { l: 'Mongoose ORM',      i: ICONS.mongoose },
  { l: 'Redis Caching',     i: ICONS.redis },
];

const TECH_ROW2 = [
  { l: 'SQL Databases',     i: ICONS.sql },
  { l: 'Rate Limiting',     i: ICONS.ratelimit },
  { l: 'Schema Design',     i: ICONS.schema },
  { l: 'DB Aggregations',   i: ICONS.aggregations },
  { l: 'JWT Auth',          i: ICONS.jwt },
  { l: 'Google OAuth2',     i: ICONS.oauth },
  { l: 'RBAC Security',     i: ICONS.rbac },
  { l: 'AES-256 Encryption',i: ICONS.aes },
  { l: 'Bcrypt Hashing',   i: ICONS.bcrypt },
  { l: 'Argon2 Security',   i: ICONS.argon2 },
  { l: 'OTP Auth',          i: ICONS.otp },
  { l: 'Git VCS',           i: ICONS.git },
  { l: 'GitHub',            i: ICONS.github },
  { l: 'Docker',            i: ICONS.docker },
  { l: 'Postman',           i: ICONS.postman },
  { l: 'Stripe Webhooks',   i: ICONS.stripe },
  { l: 'Vercel',            i: ICONS.vercel },
  { l: 'Netlify',           i: ICONS.netlify },
  { l: 'Linux Fundamentals',i: ICONS.linux },
  { l: 'C++',               i: ICONS.cpp },
  { l: 'Python',            i: ICONS.python },
  { l: 'Data Structures',   i: ICONS.ds },
  { l: 'Algorithms',        i: ICONS.algo },
  { l: 'OOP Design',        i: ICONS.oop },
  { l: 'Problem Solving',   i: ICONS.problem },
];

export default function Skills() {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);
  useReveal(ref, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setAnimated(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <span className="sec-num">03.</span>
          <h2 className="sec-title">Technical Stack</h2>
          <div className="sec-line" />
        </div>

        {/* 1. TOP SECTION: ENGINEERING COMPETENCIES (DIVIDED EQUALLY IN 2 COLUMNS) */}
        <div className="competencies-block reveal">
          <h3 className="skills-sub">Engineering Competencies</h3>
          <div className="bars-grid">
            {BARS.map((s, i) => (
              <div key={s.name} className="skill-row">
                <div className="skill-meta">
                  <span className="skill-name">{s.name}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-track">
                  <div
                    className="skill-fill"
                    style={{
                      width: animated ? `${s.pct}%` : '0%',
                      transitionDelay: `${i * 0.07}s`,
                    }}
                  />
                </div>
                <span className="skill-cat">{s.cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MIDDLE SECTION: SKILLS MANIFEST JSON (FULL WIDTH UNDER COMPETENCIES) */}
        <div className="skills-code-block reveal">
          <div className="skills-code">
            <div className="sc-head">
              <span className="sc-lang">json</span>
              <span className="sc-file">skills-manifest.json</span>
            </div>
            <pre className="sc-body">{`{
  "frontend":          ["React.js", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Redux", "Tailwind CSS", "Sass", "Bootstrap", "Vite"],
  "backend_runtimes": ["Node.js", "Express.js", "TypeScript", "JavaScript (ES6+)", "RESTful APIs", "GraphQL", "Socket.IO", "Multer", "Zod"],
  "databases_caching": ["MongoDB (Mongoose, Aggregations, Indexing, Schema Design)", "Redis (Caching, Rate Limiting)", "SQL"],
  "security_auth":     ["JWT (Access/Refresh Tokens)", "Google OAuth2", "RBAC", "AES-256-CBC", "Bcrypt", "Argon2", "OTP"],
  "devops_tooling":    ["Git", "GitHub", "Docker", "Postman", "Stripe Webhooks", "Vercel", "Netlify", "Linux fundamentals"],
  "cs_core":           ["Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "C++", "Python", "Problem Solving"]
}`}</pre>
          </div>
        </div>

        {/* 3. BOTTOM SECTION: TECHNICAL STACK (EXACTLY 2 COUNTER-MOVING MARQUEE ROWS) */}
        <div className="tech-stack-block reveal">
          <h3 className="skills-sub">Iconic Tech Stack</h3>
          <div className="tech-marquee-container">
            {/* ROW 1: MOVES RIGHT */}
            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-track track-right">
                {[...TECH_ROW1, ...TECH_ROW1, ...TECH_ROW1].map((t, i) => (
                  <div key={`${t.l}-r1-${i}`} className="tech-card">
                    <span className="tech-icon">{t.i}</span>
                    <span className="tech-tooltip">{t.l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ROW 2: MOVES LEFT */}
            <div className="tech-marquee-wrapper">
              <div className="tech-marquee-track track-left">
                {[...TECH_ROW2, ...TECH_ROW2, ...TECH_ROW2].map((t, i) => (
                  <div key={`${t.l}-r2-${i}`} className="tech-card">
                    <span className="tech-icon">{t.i}</span>
                    <span className="tech-tooltip">{t.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
