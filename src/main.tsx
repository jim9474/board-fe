import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './auth/AuthContext.tsx';

window.addEventListener('beforeunload', () => {
  console.log('🔄 실제 새로고침 발생');
});
createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>
)
