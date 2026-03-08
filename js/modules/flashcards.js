/**
 * OPJ EXAMEN — Flashcards SM-2
 * Répétition espacée pour mémoriser les définitions clés, articles, peines.
 */

/** Flashcards générales (définitions, articles, peines clés) */
const FLASHCARDS_DATA = [
  { id: 'fc-001', category: 'DPG', recto: 'Art. 14 CPP — Les 3 missions de la Police Judiciaire ?', verso: '① Constater les infractions à la loi pénale\n② Rassembler les preuves\n③ Rechercher les auteurs\n\n📌 Mémo : CRP ou 3C' },
  { id: 'fc-002', category: 'DPG', recto: 'Art. 16 CPP — Habilitation OPJ : qui ? durée ? par qui ?', verso: 'Par le Procureur Général\nDurée : 5 ans renouvelables\nSuspension possible jusqu\'à 2 ans' },
  { id: 'fc-003', category: 'DPG', recto: 'Art. 111-1 CP — Classification tripartite des infractions', verso: '① Crime → réclusion/détention criminelle\n② Délit → emprisonnement max 10 ans\n③ Contravention → amende max 3 000 €\n\nCritère : peine ENCOURRUE' },
  { id: 'fc-004', category: 'DPG', recto: 'Délai de prescription de l\'action publique (depuis 2017)', verso: 'Crime : 20 ans\nDélit : 6 ans\nContravention : 1 an\n\nCrimes imprescriptibles : crimes contre l\'humanité, crimes de guerre' },
  { id: 'fc-005', category: 'DPG', recto: 'Éléments constitutifs d\'une infraction', verso: '① Élément LÉGAL : texte qui incrimine\n② Élément MATÉRIEL : l\'acte lui-même\n③ Élément MORAL : l\'intention\n\n📌 Mémo : L-M-M' },
  { id: 'fc-006', category: 'DPG', recto: 'Art. 122-5 CP — Légitime défense : conditions ?', verso: 'L\'acte doit être :\n① Simultané à l\'attaque\n② Nécessaire (pas d\'autre choix)\n③ Proportionné à la menace\n\n⚠️ Présomption nocturne : art. 122-6' },
  { id: 'fc-007', category: 'DPG', recto: 'Art. 121-7 CP — Actes de complicité (3 types)', verso: '① Instigation : provoquer à l\'infraction\n② Instructions : donner des instructions\n③ Aide ou assistance : faciliter l\'acte\n\nPeine du complice = peine de l\'auteur' },
  { id: 'fc-008', category: 'DPG', recto: 'Récidive légale délit→délit : conditions et effets ?', verso: 'Délai : 5 ans après la 1re condamnation définitive\nInfraction identique ou assimilée\nEffet : peine portée au DOUBLE\n\nRécidive crime→crime : perpétuelle' },
  { id: 'fc-009', category: 'DPS', recto: 'Classification des violences volontaires selon l\'ITT', verso: 'Sans ITT → R.624-1 (contravention 1e classe)\nITT ≤ 8j → R.625-1 (contravention 5e)\nITT > 8j → art. 222-11 (délit : 3 ans)\nMutilation → art. 222-9 (crime : 10 ans)\nMort involontaire → art. 222-7 (crime : 15 ans)\n\n📌 ITT = élément LÉGAL' },
  { id: 'fc-010', category: 'DPS', recto: 'Art. 221-1 CP — Meurtre : définition et peine', verso: 'Donner intentionnellement la mort à autrui\nPeine : 30 ans de réclusion criminelle\n\n⚠️ Assassinat (221-3) = meurtre + préméditation = perpétuité' },
  { id: 'fc-011', category: 'DPS', recto: 'Viol vs Agression sexuelle — critère distinctif', verso: 'VIOL (222-23) : pénétration sexuelle OU acte bucco-génital imposé\nAGRESSION SEXUELLE (222-27) : tout autre acte sexuel imposé\n\nDans les deux cas : VCMS (Violence, Contrainte, Menace, Surprise)' },
  { id: 'fc-012', category: 'DPS', recto: 'Art. 311-1 CP — Vol simple : définition, peine', verso: 'Soustraction FRAUDULEUSE de la chose d\'autrui\nPeine : 3 ans + 45 000 €\n\nVol à main armée (311-8) → 15 ans (crime)' },
  { id: 'fc-013', category: 'DPS', recto: 'Art. 313-1 CP — Escroquerie : moyens limitatifs', verso: 'Faux nom / fausse qualité\nAbus de qualité vraie\nManœuvres frauduleuses (mise en scène)\n\n⚠️ Mensonge seul ≠ escroquerie (nécessite mise en scène)' },
  { id: 'fc-014', category: 'DPS', recto: 'Escroquerie vs Abus de confiance — différence clé', verso: 'ESCROQUERIE : victime trompée AVANT la remise\nABUS DE CONFIANCE (314-1) : remise volontaire, détournement APRÈS\n\nPeine abus de confiance : 3 ans + 375 000 €' },
  { id: 'fc-015', category: 'DPS', recto: 'Art. 223-6 CP — Non-assistance à personne en danger', verso: 'S\'abstenir volontairement de porter assistance à une personne en péril\nalors que c\'était possible SANS RISQUE pour soi ou autrui\n\nPeine : 5 ans + 75 000 €\n⚠️ L\'assistance peut être un simple appel aux secours' },
  { id: 'fc-016', category: 'DPS', recto: 'Art. 222-37 CP — Trafic de stupéfiants : peine', verso: 'Détention, transport, offre, cession de stupéfiants\nPeine : 10 ans + 7 500 000 €\n\nEn bande organisée (222-34) → crime : 20-30 ans\nGAV dérogatoire : jusqu\'à 96h' },
  { id: 'fc-017', category: 'PP', recto: 'Art. 53 CPP — Définition de la flagrance', verso: 'Crime ou délit qui se commet actuellement OU qui vient de se commettre\n\nAssimilé :\n① Poursuivi par la clameur publique\n② Trouvé en possession d\'objets faisant présumer sa participation\n\nDurée enquête : 8 jours' },
  { id: 'fc-018', category: 'PP', recto: 'Art. 62-2 CPP — Conditions de placement en GAV (6 objectifs)', verso: '① Exécuter les investigations\n② Empêcher la modification des preuves\n③ Empêcher pression sur témoins/victimes\n④ Empêcher concertation entre suspects\n⑤ Garantir la mise à disposition du magistrat\n⑥ Empêcher la commission de nouvelles infractions' },
  { id: 'fc-019', category: 'PP', recto: 'Durée de la GAV : droit commun vs régimes dérogatoires', verso: 'Droit commun : 24h + 24h (si ≥ 1 an) = 48h max\nStupéfiants/crime organisé : 48h + 48h = 96h\nTerrorisme : 24h × 6 = 144h (6 jours)\n\nDécompte : heure de placement' },
  { id: 'fc-020', category: 'PP', recto: 'Droits de la personne en GAV : les 6 droits immédiats', verso: '① Être informée (faits, durée, droits)\n② Garder le silence\n③ Avocat (dès la 1re heure, entretien 30 min)\n④ Faire prévenir un proche / autorité consulaire\n⑤ Médecin (examen médical)\n⑥ Interprète (si nécessaire)' },
  { id: 'fc-021', category: 'PP', recto: 'Perquisition en flagrance vs en enquête préliminaire', verso: 'FLAGRANCE (art. 56) : sans autorisation / assentiment\n→ De 6h à 21h, présence d\'un témoin\n\nPRÉLIMINAIRE (art. 76) : assentiment de l\'occupant OBLIGATOIRE\n→ ou autorisation du JLD si infraction ≥ 5 ans' },
  { id: 'fc-022', category: 'PP', recto: 'Art. 151 CPP — Commission rogatoire : définition', verso: 'Délégation des pouvoirs du juge d\'instruction à un OPJ\nL\'OPJ agit dans les LIMITES de la CR\nConvère les pouvoirs du JI (GAV, perquisition, audition…)\n\n⚠️ L\'OPJ ne peut faire que ce que la CR autorise' },
  { id: 'fc-023', category: 'PP', recto: 'Mise en examen (art. 80-1 CPP) : conditions', verso: 'Il existe des indices GRAVES OU CONCORDANTS rendant vraisemblable que la personne a commis les faits\n\n⚠️ Aucune inculpation (terme supprimé en 1993)\nPrécédée d\'une audition en qualité de témoin assisté (sauf urgence)' },
  { id: 'fc-024', category: 'PP', recto: 'Détention provisoire : qui décide ? conditions minimales ?', verso: 'Décision du JLD (sur réquisitions du PR)\nConditions :\n① Infraction ≥ 3 ans d\'emprisonnement\n② Indices graves et concordants\n③ Nécessité absolue (art. 144 CPP)\n\nAlternatives : Contrôle judiciaire, ARSE (bracelet)' },
  { id: 'fc-025', category: 'PP', recto: 'CRPC — définition et champ d\'application', verso: 'Comparution sur Reconnaissance Préalable de Culpabilité\n→ Le PR propose une peine, le prévenu accepte\n→ Homologation par un juge du siège\n\n⚠️ Exclut les crimes et certains délits graves (ex : homicides involontaires avec circonstances aggravantes)' },
  { id: 'fc-026', category: 'PP', recto: 'Délai pour faire appel d\'un jugement correctionnel', verso: '10 jours à compter du prononcé du jugement\n\nCassation : 5 jours après l\'arrêt d\'appel (pour délits correctionnels)\nOpposition (défaut) : 10 jours après signification' },
  { id: 'fc-027', category: 'PP', recto: 'CJPM — Présomption d\'irresponsabilité pénale des mineurs', verso: '< 13 ans : présomption IRRÉFRAGABLE d\'irresponsabilité\n13-16 ans : responsabilité atténuée (réfragable)\n16-18 ans : responsabilité de droit commun + atténuation possible\n\nCJPM en vigueur depuis le 30/09/2021' },
  { id: 'fc-028', category: 'PP', recto: 'GAV d\'un mineur de 13 à 16 ans : conditions et durée', verso: 'Condition : infraction punie d\'au moins 5 ans d\'emprisonnement\nDurée : 24h (+ 24h si nécessité + décision PR)\n\nMineur < 13 ans : INTERDIT (sauf rétention ≤ 12h exceptionnelle)\nMineur 16-18 ans : régime de droit commun (24h + 24h)' },
  { id: 'fc-029', category: 'DPG', recto: 'Art. 122-1 CP — Troubles mentaux et responsabilité', verso: 'Al. 1 : trouble ayant ABOLI le discernement → IRRESPONSABILITÉ pénale (acquittement)\nAl. 2 : trouble ayant ALTÉRÉ le discernement → responsabilité ATTÉNUÉE (peine réduite)\n\n⚠️ Apprécié au MOMENT DES FAITS' },
  { id: 'fc-030', category: 'DPS', recto: 'Art. 321-1 CP — Recel : définition et particularité', verso: 'Dissimuler, détenir, transmettre une chose d\'origine criminelle ou délictuelle en le sachant\nOU en bénéficier sciemment\n\nINFRACTION CONTINUE : prescription court à partir du dernier acte de détention\nPeine max : 5 ans + 375 000 € (jamais > peine infraction d\'origine)' },
  { id: 'fc-031', category: 'PP', recto: 'Régime dérogatoire GAV terrorisme (art. 706-88 CPP)', verso: 'Durée totale max : 144 heures (6 jours)\nProlongations : par tranches de 24h, sur décision du JLD\nAccès à l\'avocat différé : jusqu\'à 72h (JLD)\n\nPrescription crimes terroristes : 30 ans (délits : 20 ans)' },
  { id: 'fc-032', category: 'DPG', recto: 'Éléments constitutifs de la tentative (art. 121-5 CP)', verso: '① Commencement d\'exécution (acte non équivoque)\n② Désistement INVOLONTAIRE (ou absence d\'effet)\n\nLa tentative est punie comme l\'infraction consommée pour :\n- Tous les crimes\n- Les délits expressément prévus' },
  { id: 'fc-033', category: 'PP', recto: 'Art. 74 CPP — Mort suspecte ou violente : obligations', verso: 'Information IMMÉDIATE du Procureur de la République\nAutopsie médicolégale ordonnée par le PR (obligatoire si mort violente)\n\nL\'OPJ préserve la scène, ne touche rien, photographie, identifie les témoins' },
  { id: 'fc-034', category: 'DPS', recto: 'Art. 222-33 CP — Harcèlement sexuel : définition 2024', verso: 'Propos ou comportements à connotation sexuelle ou sexiste répétés\nOU acte grave unique\nImposés à autrui et portant atteinte à sa dignité ou créant un environnement intimidant\n\nPeine : 2 ans + 30 000 €' },
  { id: 'fc-035', category: 'DPS', recto: 'Infractions sexuelles : tableau des peines de base', verso: 'Viol (222-23) : 15 ans réclusion\nAgression sexuelle (222-27) : 5 ans + 75 000 €\nAtteinte sexuelle mineur <15 ans (227-25) : 5 ans + 75 000 €\nExhibitionnisme (222-32) : 1 an + 15 000 €\nHarcèlement sexuel (222-33) : 2 ans + 30 000 €' }
];

const SM2_KEY_PREFIX = 'fc_sm2_';

/**
 * État local de la session flashcard.
 */
let fcSession = {
  cards: [],
  index: 0,
  revealed: false,
  correct: 0,
  total: 0
};

/**
 * Récupère l'état SM-2 d'une carte depuis AppState.
 */
function getSm2(cardId) {
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  return sm2[SM2_KEY_PREFIX + cardId] || null;
}

/**
 * Calcule la prochaine révision SM-2.
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
  return {
    interval,
    ease: Math.max(1.3, ease + (0.1 - (5 - quality) * 0.08)),
    due: next.toISOString().slice(0, 10)
  };
}

/**
 * Cartes dues aujourd'hui (SM-2 ou nouvelles).
 */
function getDueCards(filter) {
  const today = new Date().toISOString().slice(0, 10);
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};
  let cards = FLASHCARDS_DATA;
  if (filter && filter !== 'all') cards = cards.filter(c => c.category === filter);

  const due = cards.filter(c => {
    const state = sm2[SM2_KEY_PREFIX + c.id];
    return !state || state.due <= today;
  });
  const notDue = cards.filter(c => {
    const state = sm2[SM2_KEY_PREFIX + c.id];
    return state && state.due > today;
  });

  return [...due, ...notDue];
}

/**
 * Rendu de l'écran sélecteur.
 */
function renderSelector(container) {
  const categories = ['all', 'DPG', 'DPS', 'PP'];
  const today = new Date().toISOString().slice(0, 10);
  const sm2 = window.AppState.getState('progress.infractions.sm2') || {};

  const dueCount = FLASHCARDS_DATA.filter(c => {
    const state = sm2[SM2_KEY_PREFIX + c.id];
    return !state || state.due <= today;
  }).length;

  const masteredCount = FLASHCARDS_DATA.filter(c => {
    const state = sm2[SM2_KEY_PREFIX + c.id];
    return state && state.interval >= 21;
  }).length;

  container.innerHTML = `
    <div class="fc-selector">
      <h1 class="fc-title">Flashcards</h1>
      <p class="fc-subtitle">Répétition espacée (SM-2) — mémorisation long terme</p>

      <div class="fc-stats-row">
        <div class="fc-stat-card">
          <span class="fc-stat-num">${dueCount}</span>
          <span class="fc-stat-label">À réviser</span>
        </div>
        <div class="fc-stat-card">
          <span class="fc-stat-num">${FLASHCARDS_DATA.length}</span>
          <span class="fc-stat-label">Total</span>
        </div>
        <div class="fc-stat-card fc-stat-ok">
          <span class="fc-stat-num">${masteredCount}</span>
          <span class="fc-stat-label">Maîtrisées</span>
        </div>
      </div>

      <div class="fc-filter-section">
        <p class="fc-filter-label">Catégorie</p>
        <div class="fc-filter-row">
          ${categories.map(cat => {
            const count = cat === 'all' ? FLASHCARDS_DATA.length : FLASHCARDS_DATA.filter(c => c.category === cat).length;
            return `<button type="button" class="fc-filter-btn ${(fcSession.filter || 'all') === cat ? 'fc-filter-active' : ''}" data-fc-cat="${cat}">
              ${cat === 'all' ? 'Tout' : cat} <span class="fc-filter-count">${count}</span>
            </button>`;
          }).join('')}
        </div>
      </div>

      <button type="button" class="btn btn-primary btn-lg btn-full" id="fc-start-btn">
        Lancer la session (${dueCount > 0 ? dueCount + ' dues' : 'tout revoir'}) →
      </button>

      <div class="fc-progress-section">
        <h2 class="fc-section-title">Progression par catégorie</h2>
        ${['DPG', 'DPS', 'PP'].map(cat => {
          const cards = FLASHCARDS_DATA.filter(c => c.category === cat);
          const mastered = cards.filter(c => {
            const state = sm2[SM2_KEY_PREFIX + c.id];
            return state && state.interval >= 21;
          }).length;
          const pct = cards.length ? Math.round((mastered / cards.length) * 100) : 0;
          return `
            <div class="fc-cat-progress">
              <div class="fc-cat-top">
                <span class="fc-cat-name">${cat}</span>
                <span class="fc-cat-pct">${pct}%</span>
              </div>
              <div class="fc-cat-bar"><div class="fc-cat-fill" style="width:${pct}%"></div></div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('[data-fc-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      fcSession.filter = btn.getAttribute('data-fc-cat');
      renderSelector(container);
    });
  });

  container.querySelector('#fc-start-btn')?.addEventListener('click', () => {
    const cards = getDueCards(fcSession.filter);
    if (cards.length === 0) return;
    fcSession = {
      cards: cards.slice(0, 20),
      index: 0,
      revealed: false,
      correct: 0,
      total: 0,
      filter: fcSession.filter
    };
    renderCard(container);
  });
}

/**
 * Rendu d'une carte.
 */
function renderCard(container) {
  if (fcSession.index >= fcSession.cards.length) {
    renderResults(container);
    return;
  }

  const card = fcSession.cards[fcSession.index];
  const progress = fcSession.index + 1;
  const total = fcSession.cards.length;
  const pct = ((fcSession.index) / total) * 100;
  const sm2State = getSm2(card.id);
  const interval = sm2State?.interval ?? 0;

  container.innerHTML = `
    <div class="fc-session">
      <div class="fc-session-header">
        <button type="button" class="btn-back-icon" data-fc-quit>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div class="fc-session-progress">
          <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        </div>
        <span class="fc-session-counter mono">${progress}/${total}</span>
      </div>

      <div class="fc-card-wrap" id="fc-card">
        <div class="fc-card ${fcSession.revealed ? 'fc-card-revealed' : ''}">
          <div class="fc-card-face fc-card-front">
            <span class="fc-cat-badge">${card.category}</span>
            <p class="fc-card-text">${card.recto}</p>
            ${interval > 0 ? `<span class="fc-interval-badge">Intervalle : ${interval}j</span>` : '<span class="fc-interval-badge fc-new">Nouvelle</span>'}
          </div>
          <div class="fc-card-face fc-card-back">
            <span class="fc-cat-badge">${card.category}</span>
            <p class="fc-card-back-text">${(card.verso || '').replace(/\n/g, '<br>')}</p>
          </div>
        </div>
      </div>

      ${!fcSession.revealed ? `
        <div class="fc-reveal-wrap">
          <button type="button" class="btn btn-secondary btn-lg btn-full" id="fc-reveal-btn">
            Retourner la carte
          </button>
        </div>
      ` : `
        <div class="fc-grade-wrap">
          <p class="fc-grade-label">Avez-vous su répondre ?</p>
          <div class="fc-grade-row">
            <button type="button" class="fc-grade-btn fc-grade-hard" data-fc-grade="1">
              <span>😓</span><span>Difficile</span><span class="fc-grade-sub">+1j</span>
            </button>
            <button type="button" class="fc-grade-btn fc-grade-ok" data-fc-grade="3">
              <span>🤔</span><span>Moyen</span><span class="fc-grade-sub">+quelques j</span>
            </button>
            <button type="button" class="fc-grade-btn fc-grade-easy" data-fc-grade="5">
              <span>😊</span><span>Facile</span><span class="fc-grade-sub">+${Math.max(3, Math.round((sm2State?.interval ?? 1) * (sm2State?.ease ?? 2.5)))}j</span>
            </button>
          </div>
        </div>
      `}
    </div>
  `;

  container.querySelector('[data-fc-quit]')?.addEventListener('click', () => {
    fcSession = { cards: [], index: 0, revealed: false, correct: 0, total: 0 };
    render(container);
  });

  container.querySelector('#fc-reveal-btn')?.addEventListener('click', () => {
    fcSession.revealed = true;
    const cardEl = container.querySelector('#fc-card .fc-card');
    if (cardEl) cardEl.classList.add('fc-card-revealed');
    renderCard(container);
  });

  container.querySelectorAll('[data-fc-grade]').forEach(btn => {
    btn.addEventListener('click', () => {
      const quality = parseInt(btn.getAttribute('data-fc-grade'), 10);
      const current = getSm2(card.id);
      const next = sm2Next(current, quality);
      const key = SM2_KEY_PREFIX + card.id;
      window.AppState.dispatch('UPDATE_SM2', { [key]: next });
      if (quality >= 3) fcSession.correct++;
      fcSession.total++;
      fcSession.index++;
      fcSession.revealed = false;
      window.AppState.dispatch('ADD_XP', { amount: quality >= 3 ? 5 : 2 });
      renderCard(container);
    });
  });
}

/**
 * Rendu des résultats.
 */
function renderResults(container) {
  const { correct, total } = fcSession;
  const pct = total ? Math.round((correct / total) * 100) : 0;

  container.innerHTML = `
    <div class="fc-results">
      <div class="fc-results-icon">${pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}</div>
      <h1 class="fc-results-title">Session terminée !</h1>
      <div class="fc-results-score">
        <span class="fc-results-num mono">${correct}</span>
        <span class="fc-results-den">/ ${total}</span>
      </div>
      <p class="fc-results-pct">${pct}% de bonnes réponses</p>
      <p class="fc-results-msg">${pct >= 80 ? 'Excellent ! Continue comme ça.' : pct >= 50 ? 'Bien. Revois les cartes difficiles.' : 'Courage ! La répétition fait la maîtrise.'}</p>
      <div class="fc-results-actions">
        <button type="button" class="btn btn-primary btn-lg" id="fc-retry-btn">Rejouer</button>
        <button type="button" class="btn btn-ghost" id="fc-home-btn">← Retour</button>
      </div>
    </div>
  `;

  container.querySelector('#fc-retry-btn')?.addEventListener('click', () => {
    fcSession = { cards: [], index: 0, revealed: false, correct: 0, total: 0 };
    render(container);
  });
  container.querySelector('#fc-home-btn')?.addEventListener('click', () => {
    window.Router.navigate('#home', { direction: 'back' });
  });
}

/**
 * Point d'entrée.
 */
function render(container) {
  renderSelector(container);
}

function init() {}

window.Flashcards = { init, render };
