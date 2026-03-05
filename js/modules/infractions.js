/**
 * OPJ EXAMEN — Module Infractions
 * Liste par catégorie, fiche (7 sections), mode flashcard avec SM-2.
 */
 
const CATEGORIES = [
  { id: 'all', label: 'Tout' },
  { id: 'personnes', label: 'Personnes' },
  { id: 'biens', label: 'Biens' },
  { id: 'nation', label: 'Nation' },
  { id: 'autres', label: 'Autres' },
  { id: 'pro', label: 'PRO' }
];

/**
 * Récupère l'état SM-2 pour une clé (infraction_id ou infraction_id_cardIndex).
 * @param {string} key
 * @returns {{ interval: number, ease: number, due: string }|null}
 */
function getSm2(key) {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  return sm2[key] || null;
}

/**
 * Calcule la prochaine révision SM-2 (simplifié).
 * quality: 1 = Difficile, 3 = Moyen, 5 = Facile
 * @param {object} current - { interval, ease, due }
 * @param {number} quality - 1, 3 ou 5
 * @returns {{ interval: number, ease: number, due: string }}
 */
function sm2Next(current, quality) {
  const ease = current?.ease ?? 2.5;
  let interval = current?.interval ?? 0;
  if (quality <= 1) {
    interval = 1;
  } else if (quality <= 3) {
    interval = interval < 1 ? 1 : Math.round(interval * 1.2);
  } else {
    interval = interval < 1 ? 3 : Math.round(interval * ease);
  }
  const next = new Date();
  next.setDate(next.getDate() + Math.min(interval, 365));
  return { interval, ease: Math.max(1.3, ease + (0.1 - (5 - quality) * 0.08)), due: next.toISOString().slice(0, 10) };
}

/**
 * Maîtrise en % pour une infraction (dérivée du SM-2 des cartes).
 * @param {string} infractionId
 * @param {number} totalCards
 * @returns {number} 0-100
 */
function getMasteryPct(infractionId, totalCards) {
  if (!totalCards) return 0;
  let reviewed = 0;
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  for (let i = 0; i < totalCards; i++) {
    if (sm2[`${infractionId}_${i}`]) reviewed++;
  }
  return Math.round((reviewed / totalCards) * 100);
}

/**
 * Nombre de cartes à revoir aujourd'hui (due <= today).
 * @returns {number}
 */
function getDueCount() {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  const today = new Date().toISOString().slice(0, 10);
  return Object.values(sm2).filter((c) => c && c.due && c.due <= today).length;
}

/**
 * Rendu liste : filtres, search, cards.
 */
function renderList(container) {
  const pro = window.AppState.getState('pro') || {};
  const isPro = pro.isActive === true;
  const filter = sessionStorage.getItem('infractions_filter') || 'all';
  const search = (sessionStorage.getItem('infractions_search') || '').trim().toLowerCase();
  let list = (window.INFRACTIONS || []).filter((i) => {
    if (filter === 'pro') return i.isPro === true;
    if (filter !== 'all' && i.category !== filter) return false;
    if (search && !i.name.toLowerCase().includes(search) && !(i.article || '').toLowerCase().includes(search)) return false;
    return true;
  });

  container.innerHTML = `
    <div class="infra-list">
      <h1 class="infra-list-title">Infractions</h1>
      <div class="infra-filters">
        ${CATEGORIES.map((c) => `<button type="button" class="card card-interactive infra-filter-btn ${filter === c.id ? 'card-gold' : ''}" data-infra-filter="${c.id}">${c.label}</button>`).join('')}
      </div>
      <input type="search" class="input infra-search" placeholder="Rechercher par nom ou article..." value="${search.replace(/"/g, '&quot;')}" data-infra-search>
      <div class="infra-cards">
        ${list.map((i) => {
          const pct = getMasteryPct(i.id, (i.flashcards || []).length);
          const locked = i.isPro && !isPro;
          return `
            <div class="card card-interactive infra-card ${locked ? 'infra-card-locked' : ''}" data-infra-id="${i.id}">
              ${locked ? '<span class="infra-lock">🔒</span>' : ''}
              <span class="infra-card-name">${i.name}</span>
              <span class="infra-card-article mono">${i.article || '—'}</span>
              <span class="badge infra-cat-${i.category}">${i.category}</span>
              <span class="infra-card-mastery mono">${pct}% maîtrise</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-infra-filter]').forEach((el) => {
    el.addEventListener('click', () => {
      sessionStorage.setItem('infractions_filter', el.getAttribute('data-infra-filter'));
      renderList(container);
    });
  });
  container.querySelector('[data-infra-search]')?.addEventListener('input', (e) => {
    sessionStorage.setItem('infractions_search', e.target.value);
    renderList(container);
  });
  container.querySelectorAll('[data-infra-id]').forEach((el) => {
    if (el.classList.contains('infra-card-locked')) return;
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-infra-id');
      sessionStorage.setItem('infractions_view', id);
      renderDetail(container, id);
    });
  });
}

/**
 * Rendu fiche : 7 sections + bouton flashcards.
 */
function renderDetail(container, id) {
  const inf = (window.INFRACTIONS || []).find((i) => i.id === id);
  if (!inf) {
    renderList(container);
    return;
  }
  const pro = window.AppState.getState('pro') || {};
  const isPro = pro.isActive === true;
  const locked = inf.isPro && !isPro;

  const sections = [
    { icon: '📖', title: 'Définition légale', content: inf.definition, class: 'infra-def' },
    { icon: '⚙️', title: 'Élément matériel', content: inf.elementMateriel },
    { icon: '🧠', title: 'Élément moral', content: inf.elementMoral, badge: inf.elementMoral && inf.elementMoral.includes('Intentionnel') ? 'INTENTIONNEL' : 'NON-INTENTIONNEL' },
    { icon: '⚖️', title: 'Peine de base', content: inf.peineBase, class: 'infra-peine' },
    { icon: '⬆️', title: 'Circonstances aggravantes', content: Array.isArray(inf.aggravantes) ? inf.aggravantes.map((a) => `• ${a}`).join('\n') : inf.aggravantes || '—' },
    { icon: '⚠️', title: 'Infractions voisines', content: inf.infractionsVoisines, class: 'infra-voisines' }
  ];

  container.innerHTML = `
    <div class="infra-detail">
      <button type="button" class="btn btn-ghost btn-sm infra-back" data-infra-back>← Retour</button>
      <h1 class="infra-detail-title">${inf.name}</h1>
      <span class="badge infra-cat-${inf.category}">${inf.category}</span>
      <span class="infra-detail-article mono">${inf.article || '—'}</span>
      <div class="infra-sections">
        ${sections.map((s) => `
          <div class="infra-section ${s.class || ''}">
            <h3 class="infra-section-title">${s.icon} ${s.title}</h3>
            ${s.badge ? `<span class="badge infra-moral-badge">${s.badge}</span>` : ''}
            <div class="infra-section-content">${(s.content || '—').replace(/\n/g, '<br>')}</div>
          </div>
        `).join('')}
      </div>
      ${!locked && (inf.flashcards || []).length > 0 ? `<button type="button" class="btn btn-primary btn-lg btn-full" data-infra-flash data-infra-id="${inf.id}">🃏 Réviser en flashcards →</button>` : ''}
    </div>
  `;

  container.querySelector('[data-infra-back]')?.addEventListener('click', () => renderList(container));
  container.querySelector('[data-infra-flash]')?.addEventListener('click', () => {
    const fid = container.querySelector('[data-infra-flash]')?.getAttribute('data-infra-id');
    if (fid) renderFlashcard(container, fid);
  });
}

/**
 * Rendu mode flashcard : carte retournable + boutons SM-2.
 */
function renderFlashcard(container, infractionId) {
  const inf = (window.INFRACTIONS || []).find((i) => i.id === infractionId);
  if (!inf || !(inf.flashcards || []).length) {
    renderDetail(container, infractionId);
    return;
  }
  const cards = inf.flashcards;
  let cardIndex = parseInt(sessionStorage.getItem(`infra_flash_${infractionId}`) || '0', 10);
  if (cardIndex >= cards.length) cardIndex = 0;
  const card = cards[cardIndex];
  const sm2Key = `${infractionId}_${cardIndex}`;
  const sm2 = getSm2(sm2Key);
  const dueStr = sm2?.due ? ` (revoir le ${new Date(sm2.due).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})` : '';

  container.innerHTML = `
    <div class="infra-flash">
      <button type="button" class="btn btn-ghost btn-sm infra-back" data-infra-back-flash>← Retour fiche</button>
      <p class="infra-flash-progress">Carte ${cardIndex + 1} / ${cards.length}${dueStr}</p>
      <div class="infra-flash-card-wrap" data-infra-flip>
        <div class="infra-flash-card">
          <div class="infra-flash-front">
            <p class="infra-flash-q">${card.q}</p>
            <p class="infra-flash-tap">Taper pour retourner</p>
          </div>
          <div class="infra-flash-back">
            <p class="infra-flash-a">${card.a}</p>
            <div class="infra-flash-sm2">
              <button type="button" class="btn btn-danger btn-sm" data-sm2="1">Difficile</button>
              <button type="button" class="btn btn-secondary btn-sm" data-sm2="3">Moyen</button>
              <button type="button" class="btn btn-primary btn-sm" data-sm2="5">Facile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const wrap = container.querySelector('[data-infra-flip]');
  wrap?.addEventListener('click', () => wrap.classList.toggle('infra-flash-flipped'));

  container.querySelector('[data-infra-back-flash]')?.addEventListener('click', () => renderDetail(container, infractionId));

  container.querySelectorAll('[data-sm2]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const quality = parseInt(btn.getAttribute('data-sm2'), 10);
      const next = sm2Next(sm2, quality);
      window.AppState.dispatch('UPDATE_SM2', { [sm2Key]: { ...next, lastReview: new Date().toISOString() } });
      const nextIndex = cardIndex + 1;
      if (nextIndex >= cards.length) {
        sessionStorage.setItem(`infra_flash_${infractionId}`, '0');
        renderDetail(container, infractionId);
      } else {
        sessionStorage.setItem(`infra_flash_${infractionId}`, String(nextIndex));
        renderFlashcard(container, infractionId);
      }
    });
  });
}

/**
 * Point d'entrée.
 * @param {HTMLElement} container
 */
function render(container) {
  const view = sessionStorage.getItem('infractions_view');
  const flashId = sessionStorage.getItem('infractions_flash_id');
  if (flashId) {
    sessionStorage.removeItem('infractions_flash_id');
    renderFlashcard(container, flashId);
    return;
  }
  if (view) {
    renderDetail(container, view);
    return;
  }
  renderList(container);
}
window.Infractions = { render };
