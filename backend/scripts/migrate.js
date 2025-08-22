require('dotenv').config();
const pool = require('../src/config/database');

const createTables = async () => {
  console.log('🚀 Iniciando migración de base de datos...');
  
  try {
    // Crear tabla de usuarios
    console.log('📝 Creando tabla users...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de cuestionarios
    console.log('📝 Creando tabla questionnaires...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS questionnaires (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR(50) NOT NULL,
        personal_info JSONB NOT NULL,
        answers JSONB NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de mensajes de contacto
    console.log('📝 Creando tabla contact_messages...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        asunto VARCHAR(200),
        mensaje TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla de análisis de compatibilidad
    console.log('📝 Creando tabla compatibility_analysis...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS compatibility_analysis (
        id SERIAL PRIMARY KEY,
        questionnaire1_id INTEGER NOT NULL,
        questionnaire2_id INTEGER NOT NULL,
        compatibility_score DECIMAL(5,2),
        detailed_analysis JSONB,
        recommendations JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (questionnaire1_id) REFERENCES questionnaires(id) ON DELETE CASCADE,
        FOREIGN KEY (questionnaire2_id) REFERENCES questionnaires(id) ON DELETE CASCADE
      )
    `);

    // Crear índices para mejor performance
    console.log('📊 Creando índices...');
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_questionnaires_user_id ON questionnaires(user_id)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_questionnaires_type ON questionnaires(type)
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_questionnaires_created_at ON questionnaires(created_at)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_compatibility_questionnaire1 ON compatibility_analysis(questionnaire1_id)
    `);

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_compatibility_questionnaire2 ON compatibility_analysis(questionnaire2_id)
    `);

    // Crear usuario admin por defecto (si no existe)
    console.log('👤 Creando usuario admin por defecto...');
    const bcrypt = require('bcryptjs');
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await pool.query(`
      INSERT INTO users (email, password, name, role)
      VALUES ($1, $2, 'Administrador', 'admin')
      ON CONFLICT (email) DO NOTHING
    `, ['admin@websaludmental.com', adminPassword]);

    console.log('✅ Migración completada exitosamente!');
    
    // Mostrar estadísticas de las tablas
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const questionnairesCount = await pool.query('SELECT COUNT(*) FROM questionnaires');
    const contactMessagesCount = await pool.query('SELECT COUNT(*) FROM contact_messages');
    
    console.log('📊 Estadísticas de la base de datos:');
    console.log(`   👥 Usuarios: ${usersCount.rows[0].count}`);
    console.log(`   📋 Cuestionarios: ${questionnairesCount.rows[0].count}`);
    console.log(`   💬 Mensajes de contacto: ${contactMessagesCount.rows[0].count}`);
    
  } catch (error) {
    console.error('❌ Error en la migración:', error);
    throw error;
  }
};

const runMigration = async () => {
  try {
    await createTables();
    process.exit(0);
  } catch (error) {
    console.error('💥 Error fatal en la migración:', error);
    process.exit(1);
  }
};

runMigration();
