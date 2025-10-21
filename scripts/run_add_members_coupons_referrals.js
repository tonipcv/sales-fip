/*
  Node script to run SQL migration for members/coupons/referrals using Prisma connection.
  Usage:
    node scripts/run_add_members_coupons_referrals.js
*/

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  const prisma = new PrismaClient({ log: ['error'] });
  const sqlPath = path.join(__dirname, 'migrations', 'add_members_coupons_referrals.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log(`[migration] Executando SQL em ${sqlPath} ...`);
  try {
    // Split into DO $$ ... END$$; blocks to avoid multiple statements in one prepared exec
    const blocks = sql.match(/DO\s+\$\$[\s\S]*?END\$\$;/g) || [];
    if (blocks.length === 0) {
      // If there are no DO blocks, attempt to run as-is
      await prisma.$executeRawUnsafe(sql);
      console.log('[migration] OK (single statement).');
    } else {
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        console.log(`[migration] Executando bloco ${i + 1}/${blocks.length} ...`);
        await prisma.$executeRawUnsafe(block);
      }
      console.log('[migration] OK.');
    }
  } catch (err) {
    console.error('[migration] Falhou:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
