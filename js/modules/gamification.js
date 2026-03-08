/**
 * OPJ EXAMEN — Gamification & Profil
 * XP, grades, badges, streak, profil utilisateur, paramètres, leaderboard fictif.
 */

const BADGES_CONFIG = [
  { id: 'first_session', icon: '🎯', label: 'Première session', desc: 'Complète ta première session QCM', condition: s => s.gamification.totalSessions >= 1 },
  { id: 'sessions_10', icon: '💪', label: '10 sessions', desc: 'Complète 10 sessions QCM', condition: s => s.gamification.totalSessions >= 10 },
  { id: 'sessions_50', icon: '🔥', label: '50 sessions', desc: 'Complète 50 sessions QCM', condition: s => s.gamification.totalSessions >= 50 },
  { id: 'streak_3', icon: '⚡', label: 'Série de 3', desc: '3 jours consécutifs', condition: s => s.gamification.streak >= 3 },
  { id: 'streak_7', icon: '🔥', label: 'Semaine de feu', desc: '7 jours consécutifs', condition: s => s.gamification.streak >= 7 },
  { id: 'streak_30', icon: '🏅', label: 'Mois sans relâche', desc: '30 jours consécutifs', condition: s => s.gamification.streak >= 30 },
  { id: 'xp_500', icon: '⭐', label: '500 XP', desc: 'Atteindre 500 XP', condition: s => s.gamification.xp >= 500 },
  { id: 'xp_5000', icon: '🌟', label: '5 000 XP', desc: 'Atteindre 5 000 XP', condition: s => s.gamification.xp >= 5000 },
  { id: 'xp_25000', icon: '💎', label: '25 000 XP', desc: 'Atteindre 25 000 XP', condition: s => s.gamification.xp >= 25000 },
  { id: 'lesson_first', icon: '📖', label: 'Premier cours', desc: 'Complète ta première leçon', condition: s => (s.progress.lessons.completed || []).length >= 1 },
  { id: 'lessons_all_dpg', icon: '📚', label: 'DPG Maîtrisé', desc: 'Toutes les leçons DPG complétées', condition: s => {
    const dpg = window.LESSONS_DPG || [];
    return dpg.length > 0 && dpg.every(l => ((s.progress?.lessons?.completed) || []).includes(l.id));
  }},
  { id: 'perfect_session', icon: '🏆', label: 'Session parfaite', desc: 'Obtiens 20/20 dans une session', condition: () => false }, // Débloqué via QCM
  { id: 'combo_10', icon: '⚡', label: 'Combo ×10', desc: '10 bonnes réponses de suite', condition: () => false }, // Via QCM
  { id: 'infractions_all', icon: '🔍', label: 'Expert Infractions', desc: 'Maîtriser toutes les infractions', condition: s => {
    const inf = window.INFRACTIONS || [];
    const sm2 = (s.progress?.infractions?.sm2) || {};
    return inf.length > 0 && inf.every(i => sm2[`${i.id}_0`]);
  }},
  { id: 'cas_pratique_1', icon: '✍️', label: 'Premier cas', desc: 'Traite ton premier cas pratique', condition: s => ((s.progress?.casePratiques?.submitted) || []).length >= 1 }
];

/**
 * Vérifie et débloque les badges automatiquement.
 */
function checkAndUnlockBadges() {
  const state = window.AppState.getState();
  const alreadyUnlocked = state.gamification.badges || [];
  BADGES_CONFIG.forEach(badge => {
    if (!alreadyUnlocked.includes(badge.id)) {
      try {
        if (badge.condition(state)) {
          window.AppState.dispatch('UNLOCK_BADGE', { id: badge.id });
          showBadgeToast(badge);
        }
      } catch (e) {}
    }
  });
}

/**
 * Toast de badge débloqué.
 */
function showBadgeToast(badge) {
  const container = document.getElementById('toast-container') || document.body;
  const toast = document.createElement('div');
  toast.className = 'badge-toast anim-fadeup';
  toast.innerHTML = `
    <span class="badge-toast-icon">${badge.icon}</span>
    <div>
      <p class="badge-toast-title">Badge débloqué !</p>
      <p class="badge-toast-label">${badge.label}</p>
    </div>
  `;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

/**
 * Génère le heatmap d'activité des 90 derniers jours.
 */
function buildHeatmap() {
  const progress = window.AppState.getState('progress') || {};
  const allDates = new Set();

  const addDates = (sessions) => {
    (sessions || []).forEach(s => {
      const d = (s.date || s.submittedAt || '').slice(0, 10);
      if (d) allDates.add(d);
    });
  };

  addDates(progress.ep1?.dpg?.sessions);
  addDates(progress.ep1?.dps?.sessions);
  addDates(progress.ep2?.pp?.sessions);
  addDates(progress.ep3?.simulations);
  (progress.casePratiques?.submitted || []).forEach(s => {
    const d = (s.submittedAt || '').slice(0, 10);
    if (d) allDates.add(d);
  });

  const today = new Date();
  const days = [];
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  const totalActive = days.filter(d => allDates.has(d)).length;
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const monthLabels = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const m = new Date(week[0]).getMonth();
    if (m !== lastMonth) {
      const name = new Date(week[0]).toLocaleDateString('fr-FR', { month: 'short' });
      monthLabels.push({ wi, name });
      lastMonth = m;
    }
  });

  return `
    <div class="heatmap-section">
      <div class="heatmap-header">
        <p class="heatmap-title">Activité — 90 derniers jours</p>
        <p class="heatmap-count">${totalActive} jour${totalActive > 1 ? 's' : ''} actif${totalActive > 1 ? 's' : ''}</p>
      </div>
      <div class="heatmap-months">
        ${monthLabels.map(m => `<span class="heatmap-month" style="grid-column:${m.wi + 1}">${m.name}</span>`).join('')}
      </div>
      <div class="heatmap-grid">
        ${weeks.map(week => `
          <div class="heatmap-week">
            ${week.map(day => {
              const active = allDates.has(day);
              const isToday = day === today.toISOString().slice(0, 10);
              return `<div class="heatmap-day ${active ? 'heatmap-active' : ''} ${isToday ? 'heatmap-today' : ''}" title="${day}"></div>`;
            }).join('')}
          </div>
        `).join('')}
      </div>
      <div class="heatmap-legend">
        <span>Moins</span>
        <div class="heatmap-day heatmap-legend-day"></div>
        <div class="heatmap-day heatmap-active heatmap-legend-day"></div>
        <span>Plus</span>
      </div>
    </div>
  `;
}

/**
 * Rendu du profil complet.
 */
function renderProfile(container) {
  checkAndUnlockBadges();

  const user = window.AppState.getState('user') || {};
  const gamification = window.AppState.getState('gamification') || {};
  const progress = window.AppState.getState('progress') || {};
  const pro = window.AppState.getState('pro') || {};
  const settings = window.AppState.getState('settings') || {};

  const grade = window.AppState.currentGrade();
  const xpToNext = window.AppState.xpToNextGrade();
  const grades = window.AppState.GRADES_CONFIG;
  const xp = gamification.xp || 0;
  const xpPct = grade ? Math.round(((xp - grade.xpMin) / ((xpToNext ? (xp + xpToNext) : xp + 1) - grade.xpMin)) * 100) : 0;

  const totalSessions = gamification.totalSessions || 0;
  const streak = gamification.streak || 0;
  const badges = gamification.badges || [];
  const weeklyXP = gamification.weeklyXP || 0;

  const ep1Score = window.AppState.getPredictedScore('ep1');
  const ep2Score = window.AppState.getPredictedScore('ep2');
  const ep3Score = window.AppState.getPredictedScore('ep3');
  const totalScore = window.AppState.getTotalPredictedScore();

  const daysLeft = window.AppState.daysUntilExam();
  const lessonsCompleted = (progress.lessons?.completed || []).length;

  container.innerHTML = `
    <div class="profile-screen">

      <!-- Hero profil -->
      <div class="profile-hero">
        <div class="profile-avatar">
          <div class="profile-avatar-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          ${pro.isActive ? '<div class="profile-pro-crown">👑</div>' : ''}
        </div>
        <div class="profile-hero-info">
          <h1 class="profile-name">${user.name || 'Agent'}</h1>
          <p class="profile-corps">${(user.corps || '').toUpperCase() === 'GN' ? 'Gendarmerie Nationale' : (user.corps || '').toUpperCase() === 'PN' ? 'Police Nationale' : 'Police / Gendarmerie'}</p>
          ${pro.isActive ? '<span class="profile-pro-badge">⭐ Abonné PRO</span>' : ''}
          ${daysLeft !== null ? `<p class="profile-exam-days ${daysLeft < 30 ? 'profile-exam-urgent' : ''}">📅 Examen dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}</p>` : ''}
        </div>
      </div>

      <!-- Grade & XP -->
      <div class="profile-grade-card">
        <div class="profile-grade-top">
          <div>
            <p class="profile-grade-name" style="color:${grade?.color || 'var(--c-gold)'}">${grade?.name || 'Gardien Élève'}</p>
            <p class="profile-grade-corps">${grade?.corps || 'CEA'}</p>
          </div>
          <div class="profile-xp-total">
            <span class="mono">${xp.toLocaleString()}</span>
            <span> XP</span>
          </div>
        </div>
        <div class="profile-xp-bar-track">
          <div class="profile-xp-bar-fill" style="width:${Math.min(xpPct, 100)}%;background:${grade?.color || 'var(--c-gold)'}"></div>
        </div>
        <div class="profile-xp-footer">
          <span>Grade ${(grade?.index || 0) + 1}/${grades.length}</span>
          ${xpToNext ? `<span>${xpToNext.toLocaleString()} XP → ${grades[(grade?.index || 0) + 1]?.name}</span>` : '<span>⭐ Grade maximum !</span>'}
        </div>
      </div>

      <!-- Stats rapides -->
      <div class="profile-stats-grid">
        <div class="profile-stat-card">
          <span class="profile-stat-icon">🔥</span>
          <span class="profile-stat-val mono">${streak}</span>
          <span class="profile-stat-lbl">Série</span>
        </div>
        <div class="profile-stat-card">
          <span class="profile-stat-icon">📊</span>
          <span class="profile-stat-val mono">${totalSessions}</span>
          <span class="profile-stat-lbl">Sessions</span>
        </div>
        <div class="profile-stat-card">
          <span class="profile-stat-icon">⭐</span>
          <span class="profile-stat-val mono">${weeklyXP.toLocaleString()}</span>
          <span class="profile-stat-lbl">XP semaine</span>
        </div>
        <div class="profile-stat-card">
          <span class="profile-stat-icon">📖</span>
          <span class="profile-stat-val mono">${lessonsCompleted}</span>
          <span class="profile-stat-lbl">Leçons</span>
        </div>
      </div>

      <!-- Heatmap activité -->
      ${buildHeatmap()}

      <!-- Score prévisionnel -->
      ${totalScore !== null ? `
        <div class="profile-score-section">
          <h2 class="profile-section-title">Score prévisionnel</h2>
          <div class="profile-score-row">
            ${[
              { label: 'EP1', score: ep1Score, coeff: 2 },
              { label: 'EP2', score: ep2Score, coeff: 3 },
              { label: 'EP3', score: ep3Score, coeff: 1 }
            ].map(e => `
              <div class="profile-score-ep">
                <span class="profile-ep-label">${e.label}</span>
                <span class="profile-ep-score mono ${e.score !== null && e.score < 7 ? 'score-danger' : ''}">${e.score !== null ? e.score.toFixed(1) : '—'}</span>
                <span class="profile-ep-coeff">×${e.coeff}</span>
              </div>
            `).join('')}
            <div class="profile-score-total">
              <span class="profile-total-label">Total</span>
              <span class="profile-total-score mono">${Math.round(totalScore)}/120</span>
            </div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" data-route="diagnostic">Voir le diagnostic complet →</button>
        </div>
      ` : ''}

      <!-- Badges -->
      <div class="profile-badges-section">
        <h2 class="profile-section-title">Badges (${badges.length}/${BADGES_CONFIG.length})</h2>
        <div class="profile-badges-grid">
          ${BADGES_CONFIG.map(b => {
            const unlocked = badges.includes(b.id);
            return `
              <div class="profile-badge-item ${unlocked ? 'profile-badge-unlocked' : 'profile-badge-locked'}" title="${b.desc}">
                <span class="profile-badge-icon">${unlocked ? b.icon : '🔒'}</span>
                <span class="profile-badge-label">${b.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Abonnement -->
      <div class="profile-subscription">
        <h2 class="profile-section-title">Abonnement</h2>
        ${pro.isActive ? `
          <div class="profile-pro-active">
            <p>⭐ Abonné PRO — Plan ${pro.plan || 'mensuel'}</p>
            ${pro.expiresAt ? `<p class="profile-pro-expires">Expire le ${new Date(pro.expiresAt).toLocaleDateString('fr-FR')}</p>` : ''}
          </div>
        ` : `
          <div class="profile-free-plan">
            <div class="profile-trial-banner">
              <div class="profile-trial-top">
                <span class="profile-trial-badge">⭐ 7 JOURS GRATUITS</span>
                <span class="profile-trial-price">puis 9,99€/mois</span>
              </div>
              <p class="profile-trial-title">Débloquer EP1 + explications illimitées</p>
              <ul class="profile-trial-list">
                <li>✓ 150 questions EP1 (DPG + DPS)</li>
                <li>✓ Explications juridiques après chaque QCM</li>
                <li>✓ Sessions QCM illimitées</li>
                <li>✓ Mode Examen complet (EP1+EP2)</li>
                <li>✓ Toutes les infractions, cartouches, comptes rendus</li>
              </ul>
              <button type="button" class="btn btn-primary btn-lg btn-full" data-route="pro">
                Commencer l'essai gratuit →
              </button>
              <p class="profile-trial-note">Sans carte bancaire · Annulable à tout moment</p>
            </div>
          </div>
        `}
      </div>

      <!-- Paramètres -->
      <div class="profile-settings">
        <h2 class="profile-section-title">Paramètres</h2>
        <div class="profile-settings-list">
          <label class="profile-setting-row">
            <span>Sons</span>
            <input type="checkbox" class="profile-toggle" id="setting-sound" ${settings.sound ? 'checked' : ''}>
          </label>
          <label class="profile-setting-row">
            <span>Notifications</span>
            <input type="checkbox" class="profile-toggle" id="setting-notif" ${settings.notifications ? 'checked' : ''}>
          </label>
          ${user.examDate ? `
            <div class="profile-setting-row profile-setting-info">
              <span>Date d'examen</span>
              <span>${new Date(user.examDate).toLocaleDateString('fr-FR')}</span>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Danger zone -->
      <div class="profile-danger">
        <button type="button" class="btn btn-ghost btn-sm profile-reset-btn" id="profile-reset-btn">
          Réinitialiser les données
        </button>
      </div>

    </div>
  `;

  container.querySelector('#setting-sound')?.addEventListener('change', e => {
    window.AppState.dispatch('UPDATE_SETTINGS', { sound: e.target.checked });
  });

  container.querySelector('#setting-notif')?.addEventListener('change', e => {
    window.AppState.dispatch('UPDATE_SETTINGS', { notifications: e.target.checked });
    if (e.target.checked && window.Notifications?.maybeAskPermissionAfterSession) {
      window.Notifications.maybeAskPermissionAfterSession().catch(() => {});
    }
  });

  container.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => window.Router.navigate(`#${btn.getAttribute('data-route')}`));
  });

  container.querySelector('#profile-reset-btn')?.addEventListener('click', () => {
    if (confirm('Réinitialiser TOUTES tes données ? Cette action est irréversible.')) {
      window.AppState.dispatch('RESET_ALL');
      window.Router.navigate('#onboarding', { replace: true });
    }
  });
}

/**
 * Point d'entrée.
 */
function render(container) {
  renderProfile(container);
}

/**
 * Vérification automatique des badges (appelée depuis l'extérieur).
 */
function init() {
  window.AppState.subscribe('gamification', () => {
    try { checkAndUnlockBadges(); } catch (e) {}
  });
  window.AppState.subscribe('progress', () => {
    try { checkAndUnlockBadges(); } catch (e) {}
  });
}

window.Gamification = { init, render, checkAndUnlockBadges };
