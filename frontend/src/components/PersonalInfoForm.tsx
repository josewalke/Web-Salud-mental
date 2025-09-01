import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Heart, ArrowRight, ArrowLeft } from 'lucide-react';

interface PersonalInfo {
  nombre: string;
  apellidos: string;
  edad: string;
  genero: string;
  correo: string;
  orientacionSexual: string;
}

interface PersonalInfoFormProps {
  onSubmit: (personalInfo: PersonalInfo) => void;
  onBack: () => void;
  type: 'pareja' | 'personalidad';
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit, onBack, type }) => {
  const [formData, setFormData] = useState<PersonalInfo>({
    nombre: '',
    apellidos: '',
    edad: '',
    genero: '',
    correo: '',
    orientacionSexual: ''
  });

  const [errors, setErrors] = useState<Partial<PersonalInfo>>({});

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PersonalInfo> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellidos.trim()) newErrors.apellidos = 'Los apellidos son requeridos';
    if (!formData.edad.trim()) newErrors.edad = 'La edad es requerida';
    if (!formData.genero.trim()) newErrors.genero = 'El género es requerido';
    if (!formData.correo.trim()) newErrors.correo = 'El correo es requerido';
    if (!formData.orientacionSexual.trim()) newErrors.orientacionSexual = 'La orientación sexual es requerida';

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.correo && !emailRegex.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    // Validar edad
    const age = parseInt(formData.edad);
    if (formData.edad && (isNaN(age) || age < 13 || age > 120)) {
      newErrors.edad = 'La edad debe estar entre 13 y 120 años';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getTitle = () => {
    return type === 'pareja' 
      ? 'Cuestionario de Compatibilidad de Pareja' 
      : 'Cuestionario de Personalidad';
  };

  const getDescription = () => {
    return type === 'pareja'
      ? 'Antes de comenzar, necesitamos algunos datos para personalizar tu experiencia'
      : 'Para obtener resultados precisos, necesitamos algunos datos básicos';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      {/* Botón de Volver */}
      <div className="flex justify-start mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          {type === 'pareja' ? (
            <Heart className="w-8 h-8 text-red-500" />
          ) : (
            <User className="w-8 h-8 text-blue-500" />
          )}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getTitle()}
        </h1>
        <p className="text-gray-600 text-lg">
          {getDescription()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Nombre *
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange('nombre', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.nombre ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Tu nombre"
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
            )}
          </div>

          {/* Apellidos */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Apellidos *
            </label>
            <input
              type="text"
              value={formData.apellidos}
              onChange={(e) => handleChange('apellidos', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.apellidos ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Tus apellidos"
            />
            {errors.apellidos && (
              <p className="mt-1 text-sm text-red-600">{errors.apellidos}</p>
            )}
          </div>

          {/* Edad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              Edad *
            </label>
            <input
              type="number"
              value={formData.edad}
              onChange={(e) => handleChange('edad', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.edad ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Tu edad"
              min="13"
              max="120"
            />
            {errors.edad && (
              <p className="mt-1 text-sm text-red-600">{errors.edad}</p>
            )}
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              Género *
            </label>
            <input
              type="text"
              value={formData.genero}
              onChange={(e) => handleChange('genero', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.genero ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ej: Femenino, Masculino, No binario, etc."
            />
            {errors.genero && (
              <p className="mt-1 text-sm text-red-600">{errors.genero}</p>
            )}
          </div>

          {/* Correo */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-2" />
              Correo electrónico *
            </label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => handleChange('correo', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.correo ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="tu@email.com"
            />
            {errors.correo && (
              <p className="mt-1 text-sm text-red-600">{errors.correo}</p>
            )}
          </div>

          {/* Orientación Sexual */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Heart className="inline w-4 h-4 mr-2" />
              Orientación sexual *
            </label>
            <input
              type="text"
              value={formData.orientacionSexual}
              onChange={(e) => handleChange('orientacionSexual', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.orientacionSexual ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ej: Heterosexual, Homosexual, Bisexual, etc."
            />
            {errors.orientacionSexual && (
              <p className="mt-1 text-sm text-red-600">{errors.orientacionSexual}</p>
            )}
          </div>
        </div>

        {/* Botón de envío */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105"
          >
            Comenzar Cuestionario
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>

        {/* Información de privacidad */}
        <div className="text-center text-sm text-gray-500 mt-6">
          <p>
            Tus datos están protegidos y solo se utilizan para personalizar tu experiencia. 
            Puedes revisar nuestra política de privacidad en cualquier momento.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalInfoForm;
