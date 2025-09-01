import React from 'react';
import { Heart, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Heart className="w-6 h-6 mr-2" />
              Love on the Brain
            </h3>
            <p className="text-blue-100 mb-4">
              El cerebro también se puede acariciar. 
              Servicios de salud mental y crecimiento personal sin juicios.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Packs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('cuestionarios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  Cuestionarios
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-blue-100">elcerebrotambienseacaricia@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-blue-100">+34 xxx xxx xxx</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-blue-500 mt-8 pt-8 text-center">
          <p className="text-blue-100">
            © 2024 Love on the Brain. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}