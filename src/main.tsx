import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx' // Note que agora ele puxa o arquivo que você acabou de criar
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)