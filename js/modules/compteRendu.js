/**
 * OPJ EXAMEN — Simulation compte rendu parquet
 * Phase briefing (fiche faits, chrono, notes), phase compte rendu (PN oral / GN écrit), phase résultats.
 */
 
const CR_DIFF_LABELS = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' };
const SECTIONS = [
  { key: 'identification', label: 'Identification', icon: '☐' },
  { key: 'faits', label: 'Rappel des faits', icon: '☐' },
  { key: 'qualification', label: 'Qualification pénale', icon: '☐' },
  { key: 'actes', label: 'Actes accomplis', icon: '☐' },
  { key: 'situation', label: 'Situation du mis en cause', icon: '☐' },
  { key: 'propositions', label: 'Propositions', icon: '☐' }
];

const BRIEFING_MIN_SEC = 2 * 60; // 2 min en mode examen
const EXAM_DURATION_SEC = 40 * 60; // 40 min

function isPro() {
  return (window.AppState.getState('pro') || {}).isActive === true;
}

function getCorps() {
  return (window.AppState.getState('user') || {}).corps || 'PN';
}

/**
 * Évalue le texte utilisateur par rapport au modèle (critères de la grille).
 * Retourne { total, maxTotal, bySection: { key: { points, max, criteres: [{ label, present }] } } }
 */
function evaluateGrille(scenario, userContent) {
  const grille = scenario.grille || {};
  const modele = scenario.modele || {};
  let total = 0;
  let maxTotal = 0;
  const bySection = {};

  for (const { key } of SECTIONS) {
    const g = grille[key];
    const modelText = (modele[key] || '').toLowerCase();
    const userText = (userContent[key] || '').toLowerCase().trim();
    if (!g) continue;
    const maxPoints = g.maxPoints || 0;
    const criteres = (g.criteres || []).map((c) => {
      const present = userText.length >= 20 && modelText.length > 0
        ? (c.toLowerCase().split(/\s+/).filter((w) => w.length > 2).some((w) => userText.includes(w)) || userText.length > maxPoints * 15)
        : false;
      return { label: c, present };
    });
    const points = Math.min(maxPoints, criteres.filter((c) => c.present).length * Math.ceil(maxPoints / criteres.length) || 0);
    total += points;
    maxTotal += maxPoints;
    bySection[key] = { points, maxPoints, criteres };
  }

  return { total: Math.min(20, Math.round((total / Math.max(1, maxTotal)) * 20)), maxTotal: 20, bySection };
}

/**
 * Rendu principal.
 */
function render(container, params) {
  if (!params) params = {};
  const { params: p } = window.Router.getCurrentRoute();
  const id = p?.id || params.id;
  const phase = p?.phase || params.phase;

  if (!id) {
    renderList(container);
    return;
  }

  const scenario = (window.COMPTES_RENDUS || []).find((c) => c.id === id);
  if (!scenario) {
    window.Router.navigate('#compte-rendu');
    return;
  }

  if (phase === 'briefing') {
    renderBriefing(container, scenario);
    return;
  }
  if (phase === 'compte-rendu') {
    renderCompteRendu(container, scenario);
    return;
  }
  if (phase === 'resultats') {
    renderResultats(container, scenario);
    return;
  }

  renderScenarioIntro(container, scenario);
}

function renderList(container) {
  const pro = isPro();
  container.innerHTML = `
    <div class="cr-list">
      <header class="cr-list-header">
        <button type="button" class="btn btn-ghost" data-cr-back>←</button>
        <h1 class="cr-list-title">Compte rendu Parquet</h1>
      </header>
      <p class="cr-list-desc">Simulation de compte rendu oral (PN) ou écrit (GN) au Procureur.</p>
      <div class="cr-cards">
        ${(window.COMPTES_RENDUS || []).map((c) => {
          const locked = c.isPro && !pro;
          return `
            <div class="card card-interactive cr-card ${locked ? 'cr-card-locked' : ''}" data-cr-id="${c.id}">
              ${locked ? '<span class="cr-lock">🔒</span>' : ''}
              <span class="cr-card-title">${c.title}</span>
              <span class="badge cr-diff cr-diff-${c.difficulty}">${CR_DIFF_LABELS[c.difficulty]}</span>
              ${c.isPro ? '<span class="badge cr-pro">PRO</span>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelector('[data-cr-back]')?.addEventListener('click', () => window.Router.back());
  container.querySelectorAll('[data-cr-id]').forEach((el) => {
    if (el.classList.contains('cr-card-locked')) return;
    el.addEventListener('click', () => window.Router.navigate(`#compte-rendu/${el.getAttribute('data-cr-id')}`));
  });
}

function renderScenarioIntro(container, scenario) {
  const pro = isPro();
  const locked = scenario.isPro && !pro;
  if (locked) {
    window.Router.navigate('#compte-rendu');
    return;
  }
  container.innerHTML = `
    <div class="cr-intro">
      <header class="cr-intro-header">
        <button type="button" class="btn btn-ghost" data-cr-back>←</button>
        <h1 class="cr-intro-title">${scenario.title}</h1>
      </header>
      <span class="badge cr-diff cr-diff-${scenario.difficulty}">${CR_DIFF_LABELS[scenario.difficulty]}</span>
      <p class="cr-intro-desc">${scenario.ficheFaits?.slice(0, 120) || ''}…</p>
      <button type="button" class="btn btn-primary btn-lg" data-cr-start>Commencer le briefing</button>
    </div>
  `;
  container.querySelector('[data-cr-back]')?.addEventListener('click', () => window.Router.navigate('#compte-rendu'));
  container.querySelector('[data-cr-start]')?.addEventListener('click', () => window.Router.navigate(`#compte-rendu/${scenario.id}/briefing`));
}

function renderBriefing(container, scenario) {
  const examMode = false; // TODO: depuis settings ou query
  const durationSec = examMode ? EXAM_DURATION_SEC : 0;
  const minReadingSec = examMode ? BRIEFING_MIN_SEC : 0;
  let elapsedSec = 0;
  let readingDone = !minReadingSec;
  let startBtnEnabled = !minReadingSec;

  const updateChrono = () => {
    elapsedSec++;
    if (minReadingSec && elapsedSec >= minReadingSec && !startBtnEnabled) {
      startBtnEnabled = true;
      const btn = container.querySelector('[data-cr-start-cr]');
      if (btn) { btn.disabled = false; btn.textContent = 'Commencer le compte rendu →'; }
    }
    const chronoEl = container.querySelector('.cr-briefing-chrono');
    if (chronoEl) chronoEl.textContent = durationSec ? `${Math.floor((durationSec - elapsedSec) / 60)}:${String((durationSec - elapsedSec) % 60).padStart(2, '0')}` : '—';
  };

  let chronoInterval = null;
  container.innerHTML = `
    <div class="cr-briefing">
      <header class="cr-briefing-header">
        <button type="button" class="btn btn-ghost" data-cr-back>←</button>
        <h1 class="cr-briefing-title">${scenario.title}</h1>
        <span class="badge cr-diff cr-diff-${scenario.difficulty}">${CR_DIFF_LABELS[scenario.difficulty]}</span>
        <div class="cr-briefing-chrono-wrap">
          <span class="cr-briefing-chrono" aria-label="Temps restant">${durationSec ? '40:00' : 'Sans limite'}</span>
        </div>
      </header>
      <div class="cr-briefing-fiche">
        <h2>Fiche des faits</h2>
        <div class="cr-briefing-fiche-text">${(scenario.ficheFaits || '').replace(/\n/g, '<br>')}</div>
      </div>
      <div class="cr-briefing-notes">
        <label for="cr-notes">Bloc-notes</label>
        <textarea id="cr-notes" class="input cr-notes-textarea" placeholder="Prends tes notes ici..." rows="4"></textarea>
      </div>
      <button type="button" class="btn btn-primary btn-lg" data-cr-start-cr ${!startBtnEnabled ? 'disabled' : ''}>
        ${!startBtnEnabled ? `Attendre ${Math.ceil(minReadingSec / 60)} min de lecture…` : 'Commencer le compte rendu →'}
      </button>
    </div>
  `;

  container.querySelector('[data-cr-back]')?.addEventListener('click', () => window.Router.navigate(`#compte-rendu/${scenario.id}`));
  container.querySelector('[data-cr-start-cr]')?.addEventListener('click', () => {
    if (chronoInterval) clearInterval(chronoInterval);
    window.Router.navigate(`#compte-rendu/${scenario.id}/compte-rendu`);
  });

  if (durationSec) {
    chronoInterval = setInterval(updateChrono, 1000);
  }
}

function renderCompteRendu(container, scenario) {
  const corps = getCorps();
  const isOral = corps === 'PN';
  const userContent = {};
  SECTIONS.forEach((s) => { userContent[s.key] = ''; });

  if (isOral) {
    container.innerHTML = `
      <div class="cr-compte cr-compte-oral">
        <header class="cr-oral-header">
          <button type="button" class="btn btn-ghost cr-oral-close" data-cr-back>×</button>
          <div class="cr-oral-phone-ui">
            <div class="cr-oral-phone-icon" aria-hidden="true">📞</div>
            <p class="cr-oral-status">En communication avec le Parquet</p>
          </div>
        </header>
        <p class="cr-oral-hint">Décris oralement ton compte rendu (ou saisis ci-dessous pour la correction).</p>
        <div class="cr-compte-sections">
          ${SECTIONS.map((s) => `
            <details class="cr-section" open>
              <summary>${s.icon} ${s.label}</summary>
              <textarea class="input cr-section-input" data-cr-section="${s.key}" placeholder="Saisie pour évaluation…" rows="3"></textarea>
            </details>
          `).join('')}
        </div>
        <button type="button" class="btn btn-primary btn-lg" data-cr-submit>Valider et voir les résultats</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="cr-compte cr-compte-ecrit">
        <header class="cr-ecrit-header">
          <button type="button" class="btn btn-ghost" data-cr-back>←</button>
          <h1 class="cr-ecrit-title">Compte rendu écrit</h1>
          <p class="cr-ecrit-sub">${scenario.title}</p>
        </header>
        <div class="cr-compte-sections">
          ${SECTIONS.map((s) => `
            <details class="cr-section">
              <summary>${s.icon} ${s.label}</summary>
              <textarea class="input cr-section-input" data-cr-section="${s.key}" placeholder="Rédige ici…" rows="4"></textarea>
            </details>
          `).join('')}
        </div>
        <button type="button" class="btn btn-primary btn-lg" data-cr-submit>Valider et voir les résultats</button>
      </div>
    `;
  }

  container.querySelector('[data-cr-back]')?.addEventListener('click', () => window.Router.navigate(`#compte-rendu/${scenario.id}/briefing`));
  container.querySelectorAll('[data-cr-section]').forEach((el) => {
    el.addEventListener('input', () => { userContent[el.getAttribute('data-cr-section')] = el.value; });
  });

  container.querySelector('[data-cr-submit]')?.addEventListener('click', () => {
    container.querySelectorAll('[data-cr-section]').forEach((el) => { userContent[el.getAttribute('data-cr-section')] = el.value; });
    const result = evaluateGrille(scenario, userContent);
    sessionStorage.setItem('cr_last_result', JSON.stringify({ scenarioId: scenario.id, result, userContent }));
    window.AppState.dispatch('RECORD_SESSION_RESULT', { epreuve: 'ep3', correct: result.total, total: 20, score: result.total });
    window.Router.navigate(`#compte-rendu/${scenario.id}/resultats`);
  });
}

function renderResultats(container, scenario) {
  let raw = '{}';
  try {
    raw = sessionStorage.getItem('cr_last_result') || '{}';
  } catch (_) {}
  const data = JSON.parse(raw);
  if (data.scenarioId !== scenario.id) {
    window.Router.navigate(`#compte-rendu/${scenario.id}/compte-rendu`);
    return;
  }
  const result = data.result || { total: 0, maxTotal: 20, bySection: {} };
  const userContent = data.userContent || {};

  const score20 = result.total != null ? result.total : 0;

  container.innerHTML = `
    <div class="cr-resultats">
      <header class="cr-resultats-header">
        <button type="button" class="btn btn-ghost" data-cr-back>←</button>
        <h1 class="cr-resultats-title">Résultats</h1>
      </header>
      <div class="cr-resultats-score-wrap">
        <svg class="cr-score-circle" viewBox="0 0 100 100" aria-hidden="true">
          <circle class="cr-score-bg" cx="50" cy="50" r="45"/>
          <circle class="cr-score-fill" cx="50" cy="50" r="45" stroke-dasharray="${(score20 / 20) * 283} 283"/>
        </svg>
        <span class="cr-score-value">${score20}/20</span>
      </div>
      <div class="cr-resultats-detail">
        ${SECTIONS.map((s) => {
          const sec = (result.bySection || {})[s.key];
          const max = sec?.maxPoints || 0;
          const pts = sec?.points || 0;
          const pct = max ? (pts / max) * 100 : 0;
          return `
            <div class="cr-resultats-section">
              <div class="cr-resultats-section-head">
                <span>${s.label}</span>
                <span class="mono">${pts}/${max}</span>
              </div>
              <div class="cr-resultats-bar-wrap">
                <div class="cr-resultats-bar-fill" style="width:${pct}%"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <details class="cr-resultats-modele">
        <summary>Compte rendu modèle</summary>
        <div class="cr-modele-content">
          ${SECTIONS.map((s) => {
            const modelText = (scenario.modele || {})[s.key] || '';
            const userText = (userContent[s.key] || '').trim();
            const hasContent = userText.length > 10;
            return `
              <section class="cr-modele-section">
                <h4>${s.label}</h4>
                <p class="cr-modele-text">${modelText.replace(/\n/g, '<br>')}</p>
                ${hasContent ? '<p class="cr-modele-feedback cr-modele-you">✓ Éléments présents</p>' : '<p class="cr-modele-feedback cr-modele-missing">✗ À compléter</p>'}
              </section>
            `;
          }).join('')}
        </div>
      </details>
      <button type="button" class="btn btn-primary" data-cr-done>Retour aux scénarios</button>
    </div>
  `;

  container.querySelector('[data-cr-back]')?.addEventListener('click', () => window.Router.navigate(`#compte-rendu/${scenario.id}`));
  container.querySelector('[data-cr-done]')?.addEventListener('click', () => window.Router.navigate('#compte-rendu'));
}

function init() {}
window.CompteRendu = { render, init };
