const { Pool } = require("pg");
require("dotenv").config({ path: process.env.DOTENV_PATH || undefined });

const connectionString =
  process.env.DATABASE_URL ||
      `postgresql://${process.env.DB_USER || 'user_gc'}:${process.env.DB_PASS || 'password_gc'}@${process.env.DB_HOST || 'postgres'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'db_projeto'}`

const pool = new Pool({
  connectionString,
  max: 50,                 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000, 
});

pool.on('error', (err, client) => {
  console.error('Erro inesperado no Pool de conexões:', err);
});

async function init() {
  try {
    await pool.query("SELECT NOW()");
    console.log("Banco de dados conectado com sucesso");
  } catch (error) {
    console.error("Falha ao conectar no Banco de Dados:", error.message);
  }
}

module.exports = {
  pool,
  init,
  query: (text, params) => pool.query(text, params),
};