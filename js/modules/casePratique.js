/**
 * OPJ EXAMEN — Cas Pratiques (EP3 / Écrit)
 * 10 cas pratiques avec scénarios, questions et corrigés détaillés.
 */

let cpState = {
  currentId: null,
  currentQ: null,
  mode: 'list' // 'list' | 'subject' | 'answer' | 'correction'
};

/**
 * Calcule le nombre de cas pratiques consultés.
 */
function getConsultedCount() {
  const submitted = window.AppState.getState('progress.casePratiques.submitted') || [];
  return new Set(submitted.map(s => s.id.split('-q')[0])).size;
}

/**
 * Rendu de la liste des cas pratiques.
 */
function renderList(container) {
  const cas = window.CAS_PRATIQUES || [];
  const submitted = window.AppState.getState('progress.casePratiques.submitted') || [];
  const isPro = (window.AppState.getState('pro') || {}).isActive === true;
  const consultedIds = new Set(submitted.map(s => s.id.split('-q')[0]));

  const free = cas.filter(c => !c.isPro);
  const pro = cas.filter(c => c.isPro);

  container.innerHTML = `
    <div class="cp-list-screen">
      <div class="cp-list-header">
        <h1 class="cp-title">Cas Pratiques</h1>
        <p class="cp-subtitle">Entraînement à l'épreuve écrite</p>
      </div>

      <div class="cp-stats-bar">
        <div class="cp-stat">
          <span class="cp-stat-num">${consultedIds.size}</span>
          <span class="cp-stat-label">Traités</span>
        </div>
        <div class="cp-stat">
          <span class="cp-stat-num">${cas.length}</span>
          <span class="cp-stat-label">Total</span>
        </div>
        <div class="cp-stat">
          <span class="cp-stat-num">${cas.reduce((s,c) => s + c.questions.length, 0)}</span>
          <span class="cp-stat-label">Questions</span>
        </div>
      </div>

      <div class="cp-tip-banner">
        <span>💡</span>
        <p>Lis le scénario attentivement, réponds sans regarder le corrigé, puis compare.</p>
      </div>

      <div class="cp-list-section">
        <h2 class="cp-section-title">Disponibles gratuitement</h2>
        ${free.map(c => renderCasCard(c, consultedIds.has(c.id), false)).join('')}
      </div>

      ${pro.length > 0 ? `
        <div class="cp-list-section">
          <h2 class="cp-section-title">
            PRO
            ${!isPro ? '<span class="cp-pro-badge">🔒 Abonnement requis</span>' : ''}
          </h2>
          ${pro.map(c => renderCasCard(c, consultedIds.has(c.id), !isPro)).join('')}
        </div>
      ` : ''}
    </div>
  `;

  container.querySelectorAll('[data-cp-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-cp-open');
      const locked = btn.hasAttribute('data-cp-locked');
      if (locked) { window.Paywall?.showModal?.('pro'); return; }
      const cas = window.CAS_PRATIQUES?.find(c => c.id === id);
      if (!cas) return;
      cpState.currentId = id;
      cpState.mode = 'subject';
      renderSubject(container, cas);
    });
  });
}

function renderCasCard(cas, done, locked) {
  const diffLabels = { 1: '⭐ Facile', 2: '⭐⭐ Moyen', 3: '⭐⭐⭐ Difficile' };
  return `
    <button type="button" class="cp-card ${done ? 'cp-card-done' : ''} ${locked ? 'cp-card-locked' : ''}"
      data-cp-open="${cas.id}" ${locked ? 'data-cp-locked' : ''}>
      <div class="cp-card-top">
        <span class="badge badge-ep2">${cas.epreuve.toUpperCase()}</span>
        <span class="cp-card-diff">${diffLabels[cas.difficulte] || ''}</span>
        ${done ? '<span class="cp-done-chip">✓ Traité</span>' : ''}
        ${locked ? '<span class="cp-lock-chip">🔒 PRO</span>' : ''}
      </div>
      <p class="cp-card-title">${cas.titre}</p>
      <p class="cp-card-meta">⏱ ${cas.dureeEstimee} min · ${cas.questions.length} question${cas.questions.length > 1 ? 's' : ''}</p>
    </button>
  `;
}

/**
 * Rendu du sujet (scénario + questions).
 */
function renderSubject(container, cas) {
  container.innerHTML = `
    <div class="cp-subject-screen">
      <div class="cp-subject-header">
        <button type="button" class="btn-back-icon" id="cp-back-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <span class="badge badge-ep2">${cas.epreuve.toUpperCase()}</span>
          <h1 class="cp-subject-title">${cas.titre}</h1>
        </div>
      </div>

      <div class="cp-subject-body">
        <div class="cp-scenario">
          <h2 class="cp-scenario-title">📋 Scénario</h2>
          <div class="cp-scenario-text">${cas.scenario.replace(/\n/g, '<br>')}</div>
        </div>

        <div class="cp-questions-list">
          <h2 class="cp-questions-title">Questions</h2>
          ${cas.questions.map(q => `
            <div class="cp-q-preview">
              <div class="cp-q-num">Q${q.num}</div>
              <div class="cp-q-body">
                <p class="cp-q-enonce">${q.enonce}</p>
                <p class="cp-q-bareme">Barème : ${q.bareme} point${q.bareme > 1 ? 's' : ''}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cp-subject-actions">
          <p class="cp-subject-tip">💡 Prends le temps de traiter chaque question avant de consulter les corrigés.</p>
          <button type="button" class="btn btn-primary btn-lg btn-full" id="cp-correction-btn">
            Voir les corrigés détaillés →
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#cp-back-btn')?.addEventListener('click', () => {
    cpState.mode = 'list';
    render(container);
  });

  container.querySelector('#cp-correction-btn')?.addEventListener('click', () => {
    window.AppState.dispatch('SUBMIT_CAS_PRATIQUE', {
      id: cas.id + '-consulted',
      text: 'consulted'
    });
    window.AppState.dispatch('ADD_XP', { amount: 20 });
    window.AppState.dispatch('INCREMENT_STREAK');
    cpState.mode = 'correction';
    renderCorrection(container, cas);
  });
}

/**
 * Rendu du corrigé complet.
 */
function renderCorrection(container, cas) {
  container.innerHTML = `
    <div class="cp-correction-screen">
      <div class="cp-subject-header">
        <button type="button" class="btn-back-icon" id="cp-correction-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <p class="cp-correction-label">CORRIGÉ</p>
          <h1 class="cp-subject-title">${cas.titre}</h1>
        </div>
      </div>

      <div class="cp-correction-body">
        ${cas.questions.map(q => `
          <div class="cp-correction-q">
            <div class="cp-correction-q-header">
              <span class="cp-correction-num">Question ${q.num}</span>
              <span class="cp-correction-bareme">${q.bareme} pt${q.bareme > 1 ? 's' : ''}</span>
            </div>
            <p class="cp-correction-enonce">${q.enonce}</p>
            <div class="cp-correction-content">
              ${renderCorrectionText(q.corrige)}
            </div>
          </div>
        `).join('')}

        <div class="cp-correction-footer">
          <p class="cp-correction-xp">+20 XP gagnés pour ce cas pratique !</p>
          <button type="button" class="btn btn-secondary btn-full" id="cp-back-list-btn">
            ← Retour aux cas pratiques
          </button>
        </div>
      </div>
    </div>
  `;

  container.querySelector('#cp-correction-back')?.addEventListener('click', () => {
    cpState.mode = 'subject';
    const cas = window.CAS_PRATIQUES?.find(c => c.id === cpState.currentId);
    if (cas) renderSubject(container, cas);
  });

  container.querySelector('#cp-back-list-btn')?.addEventListener('click', () => {
    cpState.mode = 'list';
    render(container);
  });
}

/**
 * Transforme le texte de corrigé en HTML structuré.
 */
function renderCorrectionText(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    if (!line.trim()) { if (inList) { html += '</ul>'; inList = false; } continue; }
    if (line.startsWith('**') && line.endsWith('**')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p class="cp-corrige-heading">${mdInline(line)}</p>`;
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList) { html += '<ul class="cp-corrige-list">'; inList = true; }
      html += `<li>${mdInline(line.slice(2))}</li>`;
    } else if (/^\d+\.\s/.test(line)) {
      if (!inList) { html += '<ol class="cp-corrige-list">'; inList = true; }
      html += `<li>${mdInline(line.replace(/^\d+\.\s/, ''))}</li>`;
    } else if (line.startsWith('⚠️') || line.startsWith('📌')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<div class="cp-corrige-warning">${mdInline(line)}</div>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${mdInline(line)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

function mdInline(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Point d'entrée principal.
 */
function render(container) {
  if (cpState.mode === 'correction' && cpState.currentId) {
    const cas = window.CAS_PRATIQUES?.find(c => c.id === cpState.currentId);
    if (cas) { renderCorrection(container, cas); return; }
  }
  if (cpState.mode === 'subject' && cpState.currentId) {
    const cas = window.CAS_PRATIQUES?.find(c => c.id === cpState.currentId);
    if (cas) { renderSubject(container, cas); return; }
  }
  cpState.mode = 'list';
  renderList(container);
}

function init() {}

window.CasePratique = { init, render };
