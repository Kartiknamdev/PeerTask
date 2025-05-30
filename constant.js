const isDevelopment = import.meta.env.MODE === 'development';

export const BACKEND_URL = isDevelopment 
  ? 'http://localhost:3000/api/v1'  // development
  : 'https://pba-git-main-kartikk12na-gmailcoms-projects.vercel.app'; // production