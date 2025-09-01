import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

// Marca de agua del desarrollador en consola
console.log(`
🚀 Web Salud Mental - Love on the Brain
👨‍💻 Desarrollado por: José Juan Pérez González
🔗 LinkedIn: https://www.linkedin.com/in/jose-juan-perez-gonzalez/
💼 GitHub: https://github.com/josewalke
📧 Contacto: joseperezglz01@gmail.com

¡Gracias por visitar mi proyecto! 🎉
`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)