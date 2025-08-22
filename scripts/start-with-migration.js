#!/usr/bin/env node

/**
 * Script de inicio que ejecuta migración automáticamente
 * Para Render (versión gratuita)
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando servidor con migración automática...');

// Función para ejecutar comandos
const runCommand = (command, args, options = {}) => {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
};

// Función para ejecutar migración directamente
const runMigrationDirectly = async () => {
  try {
    console.log('🗄️ Ejecutando migración directamente...');
    
    // Importar y ejecutar migración
    const { createTables } = require('./migrate.js');
    await createTables();
    console.log('✅ Migración completada exitosamente');
    return true;
  } catch (error) {
    console.warn('⚠️ Advertencia: La migración falló:', error.message);
    console.warn('💡 Esto puede ser normal si las tablas ya existen');
    return false;
  }
};

// Función principal
const main = async () => {
  try {
    // 1. Verificar si estamos en producción (Render)
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      console.log('🌍 Entorno de producción detectado (Render)');
      console.log('🗄️ Ejecutando migración automática...');
      
      // Intentar migración directa primero
      const migrationSuccess = await runMigrationDirectly();
      
      if (!migrationSuccess) {
        console.log('🔄 Intentando migración con npm...');
        try {
          await runCommand('npm', ['run', 'db:migrate']);
          console.log('✅ Migración con npm completada');
        } catch (migrationError) {
          console.warn('⚠️ Advertencia: La migración con npm también falló');
          console.warn('💡 Continuando sin migración...');
        }
      }
    } else {
      console.log('🏠 Entorno de desarrollo detectado');
      console.log('⏭️ Saltando migración automática');
    }

    // 2. Iniciar el servidor
    console.log('🚀 Iniciando servidor...');
    await runCommand('node', ['src/server.js']);
    
  } catch (error) {
    console.error('💥 Error durante el inicio:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  main().catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });
}

module.exports = main;
