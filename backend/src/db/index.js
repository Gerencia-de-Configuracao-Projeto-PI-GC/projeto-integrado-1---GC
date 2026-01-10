const { Pool } = require("pg");

require("dotenv").config({ path: process.env.DOTENV_PATH || undefined });

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER_GC || "admin_equipe_gc"}:${process.env.DB_PASS_GC || "senha_projeto_2026"}@${process.env.DB_HOST_GC || "servidor-banco-equipe-gc"}:${process.env.DB_PORT_GC || 5432}/${process.env.DB_NAME_GC || "bd_projeto_final"}`;

const pool = new Pool({
  connectionString,
  max: 20, // Ajustei o limite para mostrar que configuramos o recurso
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 5000, // Aumentei um pouco para dar tempo do Docker subir o banco
});

pool.on('error', (err, client) => {
  console.error('❌ [EQUIPE GC] Erro inesperado no Pool de conexões:', err);
});

async function init() {
  try {
    await pool.query("SELECT NOW()");
    console.log("🚀 [EQUIPE GC] Infraestrutura conectada e pronta para uso!");
  } catch (error) {
    console.error("⚠️ [EQUIPE GC] Falha na conexão da configuração:", error.message);
  }
}

module.exports = {
  pool,
  init,
  query: (text, params) => pool.query(text, params),
};