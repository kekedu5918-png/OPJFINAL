/**
 * OPJ EXAMEN — Diagnostic et analyse des résultats
 * Points forts/faibles par épreuve, courbe de progression, recommandations.
 */

const THRESHOLDS = {
  excellent: 16,
  good: 13,
  medium: 10,
  danger: 7,
  eliminating: 5
};

/**
 * Récupère les sessions pour une épreuve.
 */
function getSessions(epreuve, part) {
  const progress = window.AppState.getState('progress') || {};
  if (epreuve === 'ep1') {
    const p = part === 'dpg' ? progress.ep1?.dpg : progress.ep1?.dps;
    return (p?.sessions || []).map(s => ({ ...s, part }));
  }
  if (epreuve === 'ep2') return (progress.ep2?.pp?.sessions || []).map(s => ({ ...s, part: 'pp' }));
  if (epreuve === 'ep3') return (progress.ep3?.simulations || []).map(s => ({ ...s, part: 'ep3' }));
  return [];
}

/**
 * Calcule la tendance (dernier score vs moyenne générale).
 */
function getTrend(sessions) {
  if (sessions.length < 2) return null;
  const scores = sessions.map(s => s.score ?? (s.correct / Math.max(1, s.total)) * 20);
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const last = scores[scores.length - 1];
  return last > avg + 0.5 ? 'up' : last < avg - 0.5 ? 'down' : 'stable';
}

/**
 * Couleur et libellé selon le score.
 */
function scoreToLevel(score) {
  if (score === null || score === undefined) return { label: '—', cls: 'diag-level-na' };
  if (score >= THRESHOLDS.excellent) return { label: 'Excellent', cls: 'diag-level-green' };
  if (score >= THRESHOLDS.good) return { label: 'Bien', cls: 'diag-level-blue' };
  if (score >= THRESHOLDS.medium) return { label: 'Moyen', cls: 'diag-level-yellow' };
  if (score >= THRESHOLDS.danger) return { label: 'Fragile', cls: 'diag-level-orange' };
  if (score >= THRESHOLDS.eliminating) return { label: 'Danger', cls: 'diag-level-red' };
  return { label: '⚠️ Éliminatoire', cls: 'diag-level-critical' };
}

/**
 * Rendu du graphique en ligne (SVG).
 */
function renderSparkline(sessions, width, height) {
  if (!sessions || sessions.length < 2) {
    return `<div class="diag-no-data">Pas assez de données</div>`;
  }
  const scores = sessions.slice(-15).map(s => s.score ?? (s.correct / Math.max(1, s.total)) * 20);
  const minS = Math.min(...scores);
  const maxS = Math.max(...scores, 20);
  const w = width || 280;
  const h = height || 80;
  const pad = 8;
  const aw = w - pad * 2;
  const ah = h - pad * 2;

  const points = scores.map((s, i) => {
    const x = pad + (i / (scores.length - 1)) * aw;
    const y = pad + ah - ((s - 0) / (20 - 0)) * ah;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = [
    `${pad},${pad + ah}`,
    ...scores.map((s, i) => {
      const x = pad + (i / (scores.length - 1)) * aw;
      const y = pad + ah - ((s - 0) / (20 - 0)) * ah;
      return `${x},${y}`;
    }),
    `${pad + aw},${pad + ah}`
  ].join(' ');

  const lastScore = scores[scores.length - 1];
  const lastX = pad + aw;
  const lastY = pad + ah - ((lastScore) / 20) * ah;

  return `
    <svg viewBox="0 0 ${w} ${h}" class="diag-sparkline">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--c-gold)" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="var(--c-gold)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <line x1="${pad}" y1="${pad + ah * (1 - 14/20)}" x2="${pad + aw}" y2="${pad + ah * (1 - 14/20)}" stroke="var(--c-success)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
      <polygon points="${areaPoints}" fill="url(#sparkGrad)"/>
      <polyline points="${points}" fill="none" stroke="var(--c-gold)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${lastX}" cy="${lastY}" r="4" fill="var(--c-gold)"/>
      <text x="${lastX - 2}" y="${lastY - 8}" fill="var(--c-gold)" font-size="9" text-anchor="middle">${lastScore.toFixed(1)}</text>
    </svg>
  `;
}

/**
 * Génère des recommandations personnalisées.
 */
function generateRecommendations(ep1Score, ep2Score, ep3Score) {
  const recs = [];
  if (ep1Score === null) recs.push({ icon: '📝', text: 'Lance 5 sessions d\'EP1 pour calibrer ton niveau DPG/DPS.' });
  else if (ep1Score < 7) recs.push({ icon: '🚨', text: `EP1 en zone dangereuse (${ep1Score}/20). Concentre-toi sur les cours DPG et DPS en priorité absolue.` });
  else if (ep1Score < 13) recs.push({ icon: '📚', text: `EP1 à ${ep1Score}/20 — Relis les leçons DPS et DPG, refais des sessions difficiles.` });

  if (ep2Score === null) recs.push({ icon: '📝', text: 'Lance 5 sessions d\'EP2 (Procédure Pénale) pour établir une base de référence.' });
  else if (ep2Score < 7) recs.push({ icon: '🚨', text: `EP2 en zone dangereuse (${ep2Score}/20). La PP est l'épreuve coefficient 3 — priorité maximale.` });
  else if (ep2Score < 13) recs.push({ icon: '📚', text: `EP2 à ${ep2Score}/20 — Travaille les modes d'enquête, GAV et instruction.` });

  if (ep3Score === null) recs.push({ icon: '✍️', text: 'Entraîne-toi sur les cas pratiques et compte rendus (EP3).' });
  else if (ep3Score < 10) recs.push({ icon: '✍️', text: `EP3 à ${ep3Score}/20 — Refais les cartouches et simule des comptes rendus d'enquête.` });

  const progress = window.AppState.getState('progress') || {};
  const lessonsCompleted = (progress.lessons?.completed || []).length;
  if (lessonsCompleted < 3) recs.push({ icon: '📖', text: 'Tu as peu de leçons complétées. Commence par les cours fondamentaux (DPG-1, PP-1).' });

  const streak = window.AppState.getState('gamification.streak') || 0;
  if (streak === 0) recs.push({ icon: '🔥', text: 'Crée ta série de jours consécutifs. Même 10 minutes par jour font une vraie différence.' });

  if (recs.length === 0) recs.push({ icon: '🏆', text: `Excellents résultats ! Continue à maintenir le rythme et travaille les questions difficiles.` });

  return recs;
}

/**
 * Rendu du tableau de bord diagnostic.
 */
function render(container) {
  const ep1dpg = getSessions('ep1', 'dpg');
  const ep1dps = getSessions('ep1', 'dps');
  const ep2 = getSessions('ep2', 'pp');
  const ep3 = getSessions('ep3');

  const allEp1 = [...ep1dpg, ...ep1dps];
  const ep1Score = window.AppState.getPredictedScore('ep1');
  const ep2Score = window.AppState.getPredictedScore('ep2');
  const ep3Score = window.AppState.getPredictedScore('ep3');
  const totalScore = window.AppState.getTotalPredictedScore();

  const ep1Level = scoreToLevel(ep1Score);
  const ep2Level = scoreToLevel(ep2Score);
  const ep3Level = scoreToLevel(ep3Score);

  const ep1Trend = getTrend(allEp1);
  const ep2Trend = getTrend(ep2);

  const totalSessions = (window.AppState.getState('gamification.totalSessions') || 0);
  const streak = (window.AppState.getState('gamification.streak') || 0);
  const xp = (window.AppState.getState('gamification.xp') || 0);

  const recs = generateRecommendations(ep1Score, ep2Score, ep3Score);

  const trendIcon = (t) => t === 'up' ? '📈' : t === 'down' ? '📉' : t === 'stable' ? '➡️' : '';

  // État vide : pas encore assez de données
  if (totalSessions < 3 && ep1Score === null && ep2Score === null) {
    container.innerHTML = `
      <div class="diag-screen">
        <div class="diag-header">
          <h1 class="diag-title">Diagnostic</h1>
          <p class="diag-subtitle">Analyse de tes performances</p>
        </div>
        <div class="diag-empty-state">
          <div class="diag-empty-icon">📊</div>
          <h2 class="diag-empty-title">Pas encore de données</h2>
          <p class="diag-empty-sub">Complète au moins <strong>5 sessions QCM</strong> pour voir ton diagnostic complet avec score prévisionnel, courbes de progression et recommandations personnalisées.</p>
          <div class="diag-empty-progress">
            <div class="diag-empty-steps">
              ${[1,2,3,4,5].map(n => `<div class="diag-empty-step ${totalSessions >= n ? 'diag-empty-step-done' : ''}">
                ${totalSessions >= n ? '✓' : n}
              </div>`).join('')}
            </div>
            <p class="diag-empty-count">${totalSessions}/5 sessions complétées</p>
          </div>
          <button type="button" class="btn btn-primary btn-lg btn-full" data-route="train">Lancer une session →</button>
          <button type="button" class="btn btn-ghost btn-full" style="margin-top:var(--s-2)" data-route="learn">Commencer par une leçon</button>
        </div>
      </div>
    `;
    container.querySelectorAll('[data-route]').forEach(btn => {
      btn.addEventListener('click', () => window.Router.navigate(`#${btn.getAttribute('data-route')}`));
    });
    return;
  }

  container.innerHTML = `
    <div class="diag-screen">
      <div class="diag-header">
        <h1 class="diag-title">Diagnostic</h1>
        <p class="diag-subtitle">Analyse de tes performances</p>
      </div>

      ${totalScore !== null ? `
        <div class="diag-score-global">
          <div class="diag-score-circle">
            <svg viewBox="0 0 120 120" class="diag-score-svg">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--c-bg-raised)" stroke-width="8"/>
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--c-gold)" stroke-width="8"
                stroke-dasharray="${2 * Math.PI * 50}"
                stroke-dashoffset="${2 * Math.PI * 50 * (1 - totalScore / 120)}"
                stroke-linecap="round"
                style="transform-origin:center;transform:rotate(-90deg)"/>
            </svg>
            <div class="diag-score-inner">
              <span class="diag-score-num mono">${Math.round(totalScore)}</span>
              <span class="diag-score-den">/120</span>
            </div>
          </div>
          <div class="diag-score-legend">
            <p class="diag-score-label">Score prévisionnel total</p>
            <p class="diag-score-sub">EP1×2 + EP2×3 + EP3×1</p>
            <p class="diag-score-passing ${totalScore >= 60 ? 'diag-pass' : 'diag-fail'}">${totalScore >= 60 ? '✅ Seuil de réussite atteint' : '⚠️ Seuil de réussite non atteint (60/120)'}</p>
          </div>
        </div>
      ` : `
        <div class="diag-no-score">
          <p>📊 Fais au moins 5 sessions par épreuve pour afficher ton score prévisionnel.</p>
        </div>
      `}

      <div class="diag-epreuves">
        ${[
          { label: 'Épreuve 1 — DPG + DPS', score: ep1Score, level: ep1Level, sessions: allEp1, trend: ep1Trend, coeff: 2, id: 'ep1' },
          { label: 'Épreuve 2 — Procédure Pénale', score: ep2Score, level: ep2Level, sessions: ep2, trend: ep2Trend, coeff: 3, id: 'ep2' },
          { label: 'Épreuve 3 — Oral / Écrit', score: ep3Score, level: ep3Level, sessions: ep3, trend: null, coeff: 1, id: 'ep3' }
        ].map(ep => `
          <div class="diag-ep-card">
            <div class="diag-ep-header">
              <div class="diag-ep-left">
                <p class="diag-ep-label">${ep.label}</p>
                <span class="diag-ep-coeff">Coeff. ${ep.coeff}</span>
              </div>
              <div class="diag-ep-right">
                ${ep.score !== null ? `
                  <span class="diag-score-badge ${ep.level.cls}">${ep.score.toFixed(1)}/20</span>
                  ${ep.trend ? `<span class="diag-trend">${trendIcon(ep.trend)}</span>` : ''}
                ` : '<span class="diag-level-na">— pas assez de données</span>'}
              </div>
            </div>
            ${ep.sessions.length > 0 ? renderSparkline(ep.sessions, 280, 80) : '<p class="diag-no-data-txt">Lance tes premières sessions !</p>'}
            <div class="diag-ep-footer">
              <span>${ep.sessions.length} session${ep.sessions.length > 1 ? 's' : ''}</span>
              ${ep.score !== null ? `<span class="${ep.level.cls}">${ep.level.label}</span>` : ''}
              ${ep.score !== null && ep.score <= THRESHOLDS.eliminating ? `<span class="diag-eliminating-badge">⚠️ Note éliminatoire !</span>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="diag-general-stats">
        <h2 class="diag-section-title">Statistiques générales</h2>
        <div class="diag-stats-grid">
          <div class="diag-stat-item">
            <span class="diag-stat-val mono">${totalSessions}</span>
            <span class="diag-stat-lbl">Sessions</span>
          </div>
          <div class="diag-stat-item">
            <span class="diag-stat-val mono">${streak}</span>
            <span class="diag-stat-lbl">Série (jours)</span>
          </div>
          <div class="diag-stat-item">
            <span class="diag-stat-val mono">${xp.toLocaleString()}</span>
            <span class="diag-stat-lbl">XP total</span>
          </div>
          <div class="diag-stat-item">
            <span class="diag-stat-val mono">${(window.AppState.getState('progress.lessons.completed') || []).length}</span>
            <span class="diag-stat-lbl">Leçons</span>
          </div>
        </div>
      </div>

      <div class="diag-recs">
        <h2 class="diag-section-title">Recommandations personnalisées</h2>
        ${recs.map(r => `
          <div class="diag-rec-item">
            <span class="diag-rec-icon">${r.icon}</span>
            <p class="diag-rec-text">${r.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="diag-actions">
        <button type="button" class="btn btn-primary btn-full" data-route="train">Lancer une session QCM →</button>
        <button type="button" class="btn btn-secondary btn-full" data-route="learn">Consulter les leçons</button>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.Router.navigate(`#${btn.getAttribute('data-route')}`);
    });
  });
}

function init() {}

window.Diagnostic = { init, render };
