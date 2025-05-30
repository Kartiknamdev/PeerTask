const isDevelopment = import.meta.env.MODE === 'development';

export const BACKEND_URL = isDevelopment 
  ? 'http://localhost:3000/api/v1'  // development
  : 'https://pba2-kartikk12na-gmailcoms-projects.vercel.app'; // production