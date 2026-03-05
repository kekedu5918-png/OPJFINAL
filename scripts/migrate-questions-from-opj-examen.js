/**
 * Migration : extraire les QCM de opj-examen/index.html vers blocopj data/questions-ep1.js et questions-ep2.js
 * Usage : node scripts/migrate-questions-from-opj-examen.js
 */

const fs = require('fs');
const path = require('path');

const SOURCE_HTML = path.join(__dirname, '..', '..', 'opj-examen', 'index.html');
const OUT_EP1 = path.join(__dirname, '..', 'data', 'questions-ep1.js');
const OUT_EP2 = path.join(__dirname, '..', 'data', 'questions-ep2.js');

// Tag → { epreuve: 1|2, module: string }
const TAG_MAP = {
  PJ: { epreuve: 1, module: 'EP1_DPG' },
  Prescription: { epreuve: 1, module: 'EP1_DPG' },
  Infr: { epreuve: 1, module: 'EP1_DPS' },
  Fam: { epreuve: 1, module: 'EP1_DPG' },
  Flagrance: { epreuve: 2, module: 'PP_flagrance' },
  GAV: { epreuve: 2, module: 'PP_GAV' },
  Perquisition: { epreuve: 2, module: 'PP_perquisition' },
  Mineurs: { epreuve: 2, module: 'PP_Mineurs' },
  CDO: { epreuve: 2, module: 'PP_CDO' },
  Circ: { epreuve: 2, module: 'PP_circ' },
  Oral: { epreuve: 2, module: 'PP_oral' },
  Preliminaire: { epreuve: 2, module: 'PP_preliminaire' },
  flash: { epreuve: 2, module: 'PP_oral' },
  Mandats: { epreuve: 2, module: 'PP_oral' },
  Instruction: { epreuve: 2, module: 'PP_oral' },
  CRPC: { epreuve: 2, module: 'PP_oral' },
};

function extractArray(content, arrayName) {
  const pattern = new RegExp(`const\\s+${arrayName}\\s*=\\s*\\[`, 'm');
  const match = content.match(pattern);
  if (!match) return null;
  const startIdx = content.indexOf('[', match.index);
  let depth = 1;
  let i = startIdx + 1;
  let inDouble = false, inSingle = false, escape = false;
  while (i < content.length && depth > 0) {
    const c = content[i];
    if (escape) { escape = false; i++; continue; }
    if (inDouble) {
      if (c === '\\') escape = true;
      else if (c === '"') inDouble = false;
      i++; continue;
    }
    if (inSingle) {
      if (c === '\\') escape = true;
      else if (c === "'") inSingle = false;
      i++; continue;
    }
    if (c === '"') inDouble = true;
    else if (c === "'") inSingle = true;
    else if (c === '[') depth++;
    else if (c === ']') depth--;
    i++;
  }
  if (depth !== 0) return null;
  return content.slice(startIdx, i);
}

function parseArray(arrayStr) {
  try {
    return (0, eval)('(' + arrayStr + ')');
  } catch (e) {
    return [];
  }
}

function toBlocopjItem(raw, id) {
  const tag = raw.tag || 'PJ';
  const mapping = TAG_MAP[tag] || { epreuve: 1, module: 'EP1_DPG' };
  const epreuve = mapping.epreuve;
  const moduleName = mapping.module;
  const difficulty = raw.imp ? 2 : 1;
  const question = (raw.q || '').replace(/\r\n/g, '\n').trim();
  const answers = Array.isArray(raw.o) ? raw.o.map(a => (a || '').replace(/\r\n/g, '\n').trim()) : [];
  const correct = typeof raw.c === 'number' ? raw.c : 0;
  const explanation = (raw.ex || '').replace(/\r\n/g, '\n').trim();
  return {
    id,
    epreuve,
    module: moduleName,
    difficulty,
    question,
    answers,
    correct,
    explanation,
    article: null,
    trap: null,
    isPro: false,
  };
}

function generateId(epreuve, moduleName, index) {
  const prefix = epreuve === 1 ? 'ep1' : 'ep2';
  const mod = moduleName.replace(/^EP1_|^PP_/, '').toLowerCase().replace(/\s+/g, '_');
  return `${prefix}_${mod}_${String(index).padStart(3, '0')}`;
}

function main() {
  if (!fs.existsSync(SOURCE_HTML)) {
    console.error('Fichier source introuvable:', SOURCE_HTML);
    process.exit(1);
  }
  const content = fs.readFileSync(SOURCE_HTML, 'utf8');
  const allRaw = [];
  for (const name of ['QDB', 'QDB_EXTRA2', 'QDB_LESSONS', 'QDB_V10']) {
    const arrStr = extractArray(content, name);
    if (arrStr) {
      const arr = parseArray(arrStr);
      const filtered = arr.filter(x => x && typeof x.q === 'string' && Array.isArray(x.o));
      allRaw.push(...filtered);
      console.log(name, ':', filtered.length, 'questions');
    }
  }
  const seen = new Set();
  const ep1 = [];
  const ep2 = [];
  const moduleCount = { ep1: {}, ep2: {} };
  for (const raw of allRaw) {
    const tag = raw.tag || 'PJ';
    const mapping = TAG_MAP[tag] || { epreuve: 1, module: 'EP1_DPG' };
    const epreuve = mapping.epreuve;
    const moduleName = mapping.module;
    const key = raw.q.slice(0, 80);
    if (seen.has(key)) continue;
    seen.add(key);
    const count = epreuve === 1 ? moduleCount.ep1 : moduleCount.ep2;
    count[moduleName] = (count[moduleName] || 0) + 1;
    const id = generateId(epreuve, moduleName, count[moduleName]);
    const item = toBlocopjItem(raw, id);
    if (epreuve === 1) ep1.push(item); else ep2.push(item);
  }
  console.log('EP1:', ep1.length, '| EP2:', ep2.length);
  const header = `/**
 * OPJ EXAMEN — QCM Épreuve 1 : DPG + DPS
 * Format : id, epreuve, module, difficulty, question, answers, correct, explanation, article, trap, isPro
 * Généré par scripts/migrate-questions-from-opj-examen.js
 */

window.QUESTIONS_EP1 = `;
  const footer = ';\n';
  const header2 = `/**
 * OPJ EXAMEN — QCM Épreuve 2 : Procédure Pénale
 * Format : id, epreuve, module, difficulty, question, answers, correct, explanation, article, trap, isPro
 * Généré par scripts/migrate-questions-from-opj-examen.js
 */

window.QUESTIONS_EP2 = `;
  const footer2 = ';\n';
  const formatItem = (item) => {
    const q = JSON.stringify(item.question);
    const ans = '[\n      ' + item.answers.map(a => JSON.stringify(a)).join(',\n      ') + '\n    ]';
    return `  {
    id: ${JSON.stringify(item.id)},
    epreuve: ${item.epreuve},
    module: ${JSON.stringify(item.module)},
    difficulty: ${item.difficulty},
    question: ${q},
    answers: ${ans},
    correct: ${item.correct},
    explanation: ${JSON.stringify(item.explanation)},
    article: ${item.article == null ? 'null' : JSON.stringify(item.article)},
    trap: ${item.trap == null ? 'null' : JSON.stringify(item.trap)},
    isPro: ${item.isPro}
  }`;
  };
  const body1 = '[\n' + ep1.map(formatItem).join(',\n') + '\n]';
  const body2 = '[\n' + ep2.map(formatItem).join(',\n') + '\n]';
  fs.writeFileSync(OUT_EP1, header + body1 + footer, 'utf8');
  fs.writeFileSync(OUT_EP2, header2 + body2 + footer2, 'utf8');
  console.log('Écrit:', OUT_EP1, OUT_EP2);
}

main();
