/**
 * OPJ EXAMEN — Leaderboard micro-groupes
 * 10-20 collègues simulés, basé sur l'effort (XP semaine), reset lundi.
 * Basé sur les données Duolingo : leaderboards effort-based > score-based pour adultes professionnels.
 */

const BRIGADE_NAMES = [
  'A. Martin', 'B. Dupont', 'C. Lefebvre', 'D. Moreau', 'E. Simon',
  'F. Laurent', 'G. Thomas', 'H. Petit', 'I. Robert', 'J. Richard',
  'K. Leroy', 'L. David', 'M. Bertrand', 'N. Morel', 'O. Rousseau',
  'P. Girard', 'Q. Roux', 'R. Fournier', 'S. Blanc', 'T. Garnier'
];

const LEAGUE_TIERS = [
  { name: 'Stagiaire', icon: '🥉', color: '#8B7355', minXP: 0 },
  { name: 'Gardien', icon: '🥈', color: '#94A3B8', minXP: 500 },
  { name: 'Brigadier', icon: '🥇', color: '#F5A623', minXP: 2000 },
  { name: 'Officier', icon: '💎', color: '#60A5FA', minXP: 6000 },
  { name: 'Commandant', icon: '👑', color: '#A78BFA', minXP: 15000 }
];

/**
 * Génère une "brigade" cohérente et stable pour la semaine courante.
 * Le seed basé sur la semaine fait changer les collègues chaque semaine (promotion/relégation).
 */
function getWeekSeed() {
  const d = new Date();
  const year = d.getFullYear();
  const week = Math.floor((d - new Date(year, 0, 1)) / (7 * 24 * 3600 * 1000));
  return year * 100 + week;
}

function seededRand(seed, n) {
  let s = seed;
  const results = [];
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    results.push(s);
  }
  return results;
}

function getCurrentLeague(xp) {
  let tier = LEAGUE_TIERS[0];
  for (const t of LEAGUE_TIERS) {
    if (xp >= t.minXP) tier = t;
  }
  return tier;
}

/**
 * Génère la brigade de la semaine (10-15 membres + l'utilisateur).
 */
function generateBrigade(userWeeklyXP, userName) {
  const seed = getWeekSeed();
  const rands = seededRand(seed, 20);
  const userXP = window.AppState.getState('gamification.xp') || 0;
  const league = getCurrentLeague(userXP);

  // Sélectionne 14 membres pseudo-aléatoires
  const nameIndices = rands.slice(0, 14).map(r => r % BRIGADE_NAMES.length);
  const uniqueNames = [...new Set(nameIndices)].slice(0, 12);

  // XP de la semaine pour chaque membre (pseudo-aléatoire mais cohérent)
  const weekRands = seededRand(seed + 1, uniqueNames.length);
  const members = uniqueNames.map((nameIdx, i) => {
    const base = (weekRands[i] % 600) + 50; // 50-650 XP/semaine
    return {
      name: BRIGADE_NAMES[nameIdx],
      weeklyXP: base,
      isUser: false
    };
  });

  // Ajoute l'utilisateur
  members.push({
    name: userName || 'Toi',
    weeklyXP: userWeeklyXP,
    isUser: true
  });

  // Trie par XP semaine
  members.sort((a, b) => b.weeklyXP - a.weeklyXP);

  return { members, league };
}

/**
 * Jours restants avant le reset du lundi.
 */
function daysUntilReset() {
  const d = new Date();
  const dayOfWeek = d.getDay(); // 0=dim, 1=lun...
  const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  return daysToMonday;
}

/**
 * Rendu du leaderboard dans le profil.
 */
function renderLeaderboard(container) {
  const user = window.AppState.getState('user') || {};
  const weeklyXP = window.AppState.getState('gamification.weeklyXP') || 0;
  const { members, league } = generateBrigade(weeklyXP, user.name || 'Toi');
  const userRank = members.findIndex(m => m.isUser) + 1;
  const daysLeft = daysUntilReset();
  const isPro = (window.AppState.getState('pro') || {}).isActive === true;

  container.innerHTML = `
    <div class="lb-screen">
      <div class="lb-header">
        <h1 class="lb-title">Classement Brigade</h1>
        <p class="lb-sub">Semaine en cours · Reset dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}</p>
      </div>

      <div class="lb-league-banner" style="border-color:${league.color}33;background:${league.color}11">
        <span class="lb-league-icon">${league.icon}</span>
        <div>
          <p class="lb-league-name" style="color:${league.color}">Ligue ${league.name}</p>
          <p class="lb-league-sub">Basé sur l'XP de la semaine · Top 3 = promotion</p>
        </div>
      </div>

      ${!isPro ? `
        <div class="lb-free-notice">
          🔒 Classement global disponible avec PRO · Tu vois ta brigade locale
        </div>
      ` : ''}

      <div class="lb-table">
        ${members.map((m, i) => {
          const rank = i + 1;
          const rankIcon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
          const isPromotion = rank <= 3;
          const isReligation = rank >= members.length - 2;
          return `
            <div class="lb-row ${m.isUser ? 'lb-row-user' : ''} ${isPromotion ? 'lb-row-promo' : ''} ${isReligation ? 'lb-row-releg' : ''}">
              <span class="lb-rank">${rankIcon}</span>
              <span class="lb-name">${m.name}${m.isUser ? ' (Toi)' : ''}</span>
              <div class="lb-xp-bar-wrap">
                <div class="lb-xp-bar" style="width:${Math.min(100, (m.weeklyXP / Math.max(1, members[0].weeklyXP)) * 100)}%"></div>
              </div>
              <span class="lb-xp-val mono">${m.weeklyXP.toLocaleString()} XP</span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="lb-user-rank">
        Tu es <strong>#${userRank}</strong> sur ${members.length} cette semaine
        ${userRank <= 3 ? ' · 🏆 Tu es en zone de promotion !' : userRank >= members.length - 1 ? ' · Remonte le classement cette semaine !' : ''}
      </div>

      <div class="lb-tips">
        <p class="lb-tip">💡 Chaque question répondue = XP · Le classement se base sur l'effort, pas le score</p>
        <p class="lb-tip">🔄 Reset chaque lundi · Top 3 = promotion de ligue</p>
      </div>

      <div class="lb-actions">
        <button type="button" class="btn btn-primary btn-full" data-route="train">Lancer une session →</button>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-route]').forEach(btn => {
    btn.addEventListener('click', () => window.Router.navigate(`#${btn.getAttribute('data-route')}`));
  });
}

function render(container) {
  renderLeaderboard(container);
}

window.Leaderboard = { render };
