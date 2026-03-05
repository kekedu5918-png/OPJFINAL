/**
 * OPJ EXAMEN — Module Cartouches
 * Liste des scénarios, mode apprentissage (timeline + drawer), mode construction (PRO), timeline GAV.
 */
 
const DIFF_LABELS = { 1: 'Facile', 2: 'Moyen', 3: 'Difficile' };

function getProgress(scenarioId) {
  const progress = window.AppState.getState('progress.cartouches') || {};
  const learned = (progress.learned || []).includes(scenarioId);
  const built = (progress.built || []).includes(scenarioId);
  return { learned, built };
}

function isPro() {
  return (window.AppState.getState('pro') || {}).isActive === true;
}

/**
 * Rendu principal : liste, détail scénario, learn, build ou timeline GAV.
 */
function render(container, params) {
  if (!params) params = {};
  const { name, params: p } = window.Router.getCurrentRoute();
  const id = p?.id || params.id;
  const mode = p?.mode || params.mode;

  if (name === 'cartouches' && id === 'gav-timeline') {
    renderGavTimeline(container);
    return;
  }

  const scenario = (window.CARTOUCHES || []).find((c) => c.id === id);

  if (!id) {
    renderList(container);
    return;
  }
  if (!scenario) {
    window.Router.navigate('#cartouches');
    return;
  }
  if (mode === 'build') {
    if (scenario.isPro && !isPro()) {
      window.Router.navigate(`#cartouches/${id}`);
      return;
    }
    renderBuild(container, scenario);
    return;
  }
  if (mode === 'learn') {
    renderLearn(container, scenario);
    return;
  }

  renderScenarioDetail(container, scenario);
}

function renderList(container) {
  const pro = isPro();
  container.innerHTML = `
    <div class="cartouches-list">
      <header class="cartouches-list-header">
        <button type="button" class="btn btn-ghost cartouches-back" data-cart-back aria-label="Retour">←</button>
        <h1 class="cartouches-list-title">Cartouches</h1>
        <button type="button" class="btn btn-ghost cartouches-gav-link" data-cart-gav>Timeline GAV</button>
      </header>
      <p class="cartouches-list-desc">Scénarios de procédure : ordre des actes en flagrance, GAV, perquisitions.</p>
      <div class="cartouches-cards">
        ${(window.CARTOUCHES || []).map((c) => {
          const { learned } = getProgress(c.id);
          const locked = c.isPro && !pro;
          const pct = learned ? 100 : 0;
          return `
            <div class="card card-interactive cartouche-card ${locked ? 'cartouche-card-locked' : ''}" data-cart-id="${c.id}">
              ${locked ? '<span class="cartouche-lock">🔒</span>' : ''}
              <span class="cartouche-card-title">${c.title}</span>
              <span class="badge cartouche-diff cartouche-diff-${c.difficulty}">${DIFF_LABELS[c.difficulty] || c.difficulty}</span>
              ${c.isPro ? '<span class="badge cartouche-pro">PRO</span>' : ''}
              <div class="cartouche-progress-ring" aria-hidden="true">
                <svg viewBox="0 0 36 36" class="cartouche-ring-svg">
                  <path class="cartouche-ring-bg" d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" />
                  <path class="cartouche-ring-fill" stroke-dasharray="${pct}, 100" d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31" />
                </svg>
                <span class="cartouche-ring-value">${pct}%</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelector('[data-cart-back]')?.addEventListener('click', () => window.Router.back());
  container.querySelector('[data-cart-gav]')?.addEventListener('click', () => window.Router.navigate('#cartouches/gav-timeline'));
  container.querySelectorAll('[data-cart-id]').forEach((el) => {
    if (el.classList.contains('cartouche-card-locked')) return;
    el.addEventListener('click', () => window.Router.navigate(`#cartouches/${el.getAttribute('data-cart-id')}`));
  });
}

function renderScenarioDetail(container, scenario) {
  const pro = isPro();
  const canBuild = !scenario.isPro || pro;
  container.innerHTML = `
    <div class="cartouches-detail">
      <header class="cartouches-detail-header">
        <button type="button" class="btn btn-ghost" data-cart-back>← Retour</button>
      </header>
      <h1 class="cartouches-detail-title">${scenario.title}</h1>
      <span class="badge cartouche-diff cartouche-diff-${scenario.difficulty}">${DIFF_LABELS[scenario.difficulty]}</span>
      ${scenario.isPro ? '<span class="badge cartouche-pro">PRO</span>' : ''}
      <p class="cartouches-detail-desc">${scenario.description}</p>
      <div class="cartouches-detail-actions">
        <button type="button" class="btn btn-primary btn-lg" data-cart-mode="learn">Mode apprentissage</button>
        <button type="button" class="btn btn-secondary btn-lg ${!canBuild ? 'cartouche-btn-locked' : ''}" data-cart-mode="build">
          Mode construction ${scenario.isPro && !pro ? '🔒 PRO' : ''}
        </button>
      </div>
    </div>
  `;

  container.querySelector('[data-cart-back]')?.addEventListener('click', () => window.Router.back());
  container.querySelector('[data-cart-mode="learn"]')?.addEventListener('click', () => window.Router.navigate(`#cartouches/${scenario.id}/learn`));
  container.querySelector('[data-cart-mode="build"]')?.addEventListener('click', () => {
    if (canBuild) window.Router.navigate(`#cartouches/${scenario.id}/build`);
  });
}

function renderLearn(container, scenario) {
  const actes = scenario.actes || [];
  let currentIndex = 0;
  let drawerOpen = false;

  function openDrawer(index) {
    currentIndex = index;
    drawerOpen = true;
    const acte = actes[index];
    if (!acte) return;
    const drawer = container.querySelector('.cartouches-learn-drawer');
    if (!drawer) return;
    drawer.innerHTML = `
      <div class="cartouches-drawer-inner">
        <button type="button" class="btn btn-ghost cartouches-drawer-close" data-cart-drawer-close>×</button>
        <h3 class="cartouches-drawer-title">Acte ${acte.numero} — ${acte.nature}</h3>
        <p class="cartouches-drawer-meta"><span class="mono">${acte.article}</span> · ${acte.delai}</p>
        <section class="cartouches-drawer-section">
          <h4>Pourquoi cet acte ?</h4>
          <p>${acte.explication}</p>
        </section>
        <section class="cartouches-drawer-section">
          <h4>Si oublié</h4>
          <p class="cartouches-drawer-si">${acte.siOublie}</p>
        </section>
        <div class="cartouches-drawer-nav">
          <button type="button" class="btn btn-ghost" data-cart-drawer-prev ${currentIndex <= 0 ? 'disabled' : ''}>← Précédent</button>
          <button type="button" class="btn btn-primary" data-cart-drawer-next ${currentIndex >= actes.length - 1 ? 'disabled' : ''}>Suivant →</button>
        </div>
      </div>
    `;
    drawer.classList.add('cartouches-drawer-open');
    drawer.querySelector('[data-cart-drawer-close]')?.addEventListener('click', () => { drawer.classList.remove('cartouches-drawer-open'); drawerOpen = false; });
    drawer.querySelector('[data-cart-drawer-prev]')?.addEventListener('click', () => { if (currentIndex > 0) openDrawer(currentIndex - 1); });
    drawer.querySelector('[data-cart-drawer-next]')?.addEventListener('click', () => { if (currentIndex < actes.length - 1) openDrawer(currentIndex + 1); });
  }

  container.innerHTML = `
    <div class="cartouches-learn">
      <header class="cartouches-learn-header">
        <button type="button" class="btn btn-ghost" data-cart-back>←</button>
        <h1 class="cartouches-learn-title">${scenario.title}</h1>
      </header>
      <div class="cartouches-learn-timeline">
        ${actes.map((a, i) => `
          <div class="cartouches-timeline-item" data-cart-acte-index="${i}">
            <div class="cartouches-timeline-bubble">${a.numero}</div>
            <div class="cartouches-timeline-content">
              <span class="cartouches-timeline-nature">${a.nature}</span>
              <span class="cartouches-timeline-delai mono">${a.delai}</span>
              <span class="cartouches-timeline-article mono">${a.article}</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="cartouches-learn-drawer" aria-hidden="true"></div>
    </div>
  `;

  container.querySelector('[data-cart-back]')?.addEventListener('click', () => {
    window.AppState.dispatch('COMPLETE_CARTOUCHE', { id: scenario.id, built: false });
    window.Router.navigate(`#cartouches/${scenario.id}`);
  });
  container.querySelectorAll('[data-cart-acte-index]').forEach((el) => {
    el.addEventListener('click', () => openDrawer(parseInt(el.getAttribute('data-cart-acte-index'), 10)));
  });
}

function renderBuild(container, scenario) {
  const actes = [...(scenario.actes || [])];
  const shuffled = actes.map((a, i) => ({ ...a, originalIndex: i })).sort(() => Math.random() - 0.5);
  const total = actes.length;
  const slots = Array(total).fill(null);
  let completed = false;

  function getSlotState(index) {
    const placed = slots[index];
    if (!placed) return null;
    const correct = placed.originalIndex === index;
    return { correct, acte: placed };
  }

  function renderSlots() {
    const wrap = container.querySelector('.cartouches-build-slots');
    if (!wrap) return;
    wrap.innerHTML = slots.map((_, i) => {
      const state = getSlotState(i);
      const correctClass = state?.correct === true ? 'cartouches-slot-correct' : state?.correct === false ? 'cartouches-slot-incorrect' : '';
      return `
        <div class="cartouches-build-slot ${correctClass}" data-cart-slot="${i}" data-cart-droppable>
          <span class="cartouches-slot-num">${i + 1}</span>
          ${state ? `<span class="cartouches-slot-label">${state.acte.nature}</span><span class="cartouches-slot-feedback">${state.correct ? '✓' : '✗'}</span>` : '<span class="cartouches-slot-placeholder">Déposer ici</span>'}
        </div>
      `;
    }).join('');
    // Re-attach drop handlers
    wrap.querySelectorAll('[data-cart-droppable]').forEach((slotEl) => {
      const idx = parseInt(slotEl.getAttribute('data-cart-slot'), 10);
      slotEl.addEventListener('dragover', (e) => { e.preventDefault(); slotEl.classList.add('cartouches-drop-over'); });
      slotEl.addEventListener('dragleave', () => slotEl.classList.remove('cartouches-drop-over'));
      slotEl.addEventListener('drop', (e) => {
        e.preventDefault();
        slotEl.classList.remove('cartouches-drop-over');
        const bankIndex = e.dataTransfer.getData('text/plain');
        if (bankIndex === '') return;
        const bi = parseInt(bankIndex, 10);
        const acte = shuffled[bi];
        if (!acte || slots[idx]) return;
        slots[idx] = acte;
        renderSlots();
        renderBank();
        if (slots.every(Boolean)) {
          completed = true;
          window.AppState.dispatch('COMPLETE_CARTOUCHE', { id: scenario.id, built: true });
          showBuildResult();
        }
      });
    });
  }

  function renderBank() {
    const wrap = container.querySelector('.cartouches-build-bank');
    if (!wrap) return;
    wrap.innerHTML = shuffled.map((a, i) => {
      const used = slots.some((s) => s && s.originalIndex === a.originalIndex);
      return `
        <div class="card cartouches-bank-card ${used ? 'cartouches-bank-used' : ''}" data-cart-bank-index="${i}" draggable="${!used}" data-cart-draggable>
          <span class="cartouches-bank-nature">${a.nature}</span>
          <span class="cartouches-bank-article mono">${a.article}</span>
        </div>
      `;
    }).join('');
    wrap.querySelectorAll('[data-cart-draggable]').forEach((el) => {
      if (el.getAttribute('draggable') !== 'true') return;
      el.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', el.getAttribute('data-cart-bank-index')));
    });
  }

  function showBuildResult() {
    const correctCount = slots.filter((s, i) => s && s.originalIndex === i).length;
    const modelHtml = actes.map((a, i) => `${i + 1}. ${a.nature} (${a.article})`).join('<br>');
    const resultEl = document.createElement('div');
    resultEl.className = 'cartouches-build-result';
    resultEl.innerHTML = `
      <h3>Résultat</h3>
      <p class="cartouches-build-score">${correctCount}/${total}</p>
      <details class="cartouches-build-model">
        <summary>Voir le modèle complet</summary>
        <div class="cartouches-build-model-content">${modelHtml}</div>
      </details>
      <button type="button" class="btn btn-primary" data-cart-build-back>Retour</button>
    `;
    container.querySelector('.cartouches-build-body')?.appendChild(resultEl);
    resultEl.querySelector('[data-cart-build-back]')?.addEventListener('click', () => window.Router.navigate(`#cartouches/${scenario.id}`));
  }

  container.innerHTML = `
    <div class="cartouches-build">
      <header class="cartouches-build-header">
        <button type="button" class="btn btn-ghost" data-cart-back>←</button>
        <h1 class="cartouches-build-title">${scenario.title}</h1>
        <p class="cartouches-build-sub">Reconstitue l'ordre des actes (glisser-déposer).</p>
      </header>
      <div class="cartouches-build-body">
        <div class="cartouches-build-slots"></div>
        <div class="cartouches-build-bank"></div>
      </div>
    </div>
  `;

  container.querySelector('[data-cart-back]')?.addEventListener('click', () => window.Router.navigate(`#cartouches/${scenario.id}`));
  renderSlots();
  renderBank();
}

function renderGavTimeline(container) {
  const milestones = [
    { t: 'T0', label: 'Début GAV', obligation: 'Décision de placement (Art. 62-2 CPP). Notification des droits (63-1).', article: 'Art. 62-2, 63-1 CPP' },
    { t: 'T24h', label: '24 h', obligation: 'Prolongation possible par le Procureur. Sinon libération.', article: 'Art. 63 CPP' },
    { t: 'T48h', label: '48 h', obligation: 'Prolongation possible (crime ≥ 5 ans). Sinon libération.', article: 'Art. 63-2 CPP' },
    { t: 'T72h', label: '72 h', obligation: 'En CO/terrorisme : prolongation par le JLD possible.', article: 'Art. 706-88, 706-73 CPP' },
    { t: 'T96h', label: '96 h', obligation: 'Délai max courant en criminalité organisée / terrorisme.', article: 'Art. 706-88 CPP' }
  ];

  container.innerHTML = `
    <div class="cartouches-gav">
      <header class="cartouches-gav-header">
        <button type="button" class="btn btn-ghost" data-cart-back>← Retour</button>
        <h1 class="cartouches-gav-title">Timeline GAV</h1>
        <p class="cartouches-gav-desc">Repères des délais (classique, crime, CO/terrorisme).</p>
      </header>
      <div class="cartouches-gav-svg-wrap">
        <svg class="cartouches-gav-svg" viewBox="0 0 400 80" aria-hidden="true">
          <line class="cartouches-gav-line" x1="20" y1="40" x2="380" y2="40" stroke="var(--c-border-mid)" stroke-width="2"/>
          ${milestones.map((m, i) => {
            const x = 20 + (360 * i) / (milestones.length - 1);
            return `<g class="cartouches-gav-milestone" data-cart-milestone="${i}">
              <circle cx="${x}" cy="40" r="12" class="cartouches-gav-dot"/>
              <text x="${x}" y="28" text-anchor="middle" class="cartouches-gav-text-t">${m.t}</text>
              <text x="${x}" y="58" text-anchor="middle" class="cartouches-gav-text-label">${m.label}</text>
            </g>`;
          }).join('')}
        </svg>
      </div>
      <div class="cartouches-gav-popup" id="cart-gav-popup" role="dialog" aria-hidden="true"></div>
    </div>
  `;

  container.querySelector('[data-cart-back]')?.addEventListener('click', () => window.Router.navigate('#cartouches'));

  const popup = container.querySelector('#cart-gav-popup');
  container.querySelectorAll('[data-cart-milestone]').forEach((el) => {
    el.addEventListener('click', () => {
      const i = parseInt(el.getAttribute('data-cart-milestone'), 10);
      const m = milestones[i];
      if (!m || !popup) return;
      popup.innerHTML = `
        <div class="cartouches-gav-popup-inner">
          <strong>${m.t} — ${m.label}</strong>
          <p>${m.obligation}</p>
          <span class="mono">${m.article}</span>
          <button type="button" class="btn btn-ghost cartouches-gav-popup-close">Fermer</button>
        </div>
      `;
      popup.setAttribute('aria-hidden', 'false');
      popup.classList.add('cartouches-gav-popup-open');
      popup.querySelector('.cartouches-gav-popup-close')?.addEventListener('click', () => {
        popup.classList.remove('cartouches-gav-popup-open');
        popup.setAttribute('aria-hidden', 'true');
      });
    });
  });
}

function init() {
  // Routes enregistrées dans app.js
}
window.Cartouches = { render, init };
