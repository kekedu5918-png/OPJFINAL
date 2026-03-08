/**
 * OPJ EXAMEN — Module Leçons (Apprendre)
 * Catalogue DPG / DPS / PP, lecteur de leçon, quiz intégré, progression.
 */

const LESSON_MODULES = [
  {
    id: 'dpg',
    label: 'Droit Pénal Général',
    short: 'DPG',
    epreuve: 'EP1',
    color: 'var(--c-ep1)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    dataKey: 'LESSONS_DPG'
  },
  {
    id: 'dps',
    label: 'Droit Pénal Spécial',
    short: 'DPS',
    epreuve: 'EP1',
    color: 'var(--c-ep1)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    dataKey: 'LESSONS_DPS'
  },
  {
    id: 'pp',
    label: 'Procédure Pénale',
    short: 'PP',
    epreuve: 'EP2',
    color: 'var(--c-ep2)',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    dataKey: 'LESSONS_PP'
  }
];

/**
 * Rendu Markdown simplifié : bold, table, listes, sauts de ligne.
 */
function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^(.*)$/, '<p>$1</p>')
    .replace(/\| ([^|]+) \|/g, (_, row) => {
      const cells = row.split(' | ').map(c => `<td>${c}</td>`).join('');
      return `<tr>${cells}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/gs, m => `<table class="lesson-table">${m}</table>`)
    .replace(/<p>(<table)/g, '$1')
    .replace(/(<\/table>)<\/p>/g, '$1');
}

/**
 * Rendu simple d'un bloc markdown avec tables.
 */
function mdToHtml(raw) {
  if (!raw) return '';
  const lines = raw.split('\n');
  let html = '';
  let inTable = false;
  let inList = false;
  let listType = 'ul';
  let tableRows = [];

  const flushTable = () => {
    if (tableRows.length) {
      html += '<div class="lesson-table-wrap"><table class="lesson-table">';
      tableRows.forEach((row, i) => {
        const cells = row.split('|').map(c => c.trim()).filter(c => c);
        if (i === 0) {
          html += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
        } else if (!row.match(/^[\s|:-]+$/)) {
          html += '<tr>' + cells.map(c => `<td>${mdInline(c)}</td>`).join('') + '</tr>';
        }
      });
      html += '</tbody></table></div>';
      tableRows = [];
      inTable = false;
    }
  };

  const flushList = () => {
    if (inList) { html += `</${listType}>`; inList = false; }
  };

  for (const line of lines) {
    // Tables: uniquement si la ligne contient | ET ne contient pas de texte courant
    if (line.match(/^\s*\|/) || (line.includes('|') && line.match(/\|.*\|/))) {
      flushList();
      inTable = true;
      tableRows.push(line);
      continue;
    }
    if (inTable) flushTable();

    // Mémos clés (encadré doré)
    if (line.startsWith('📌') || line.toLowerCase().startsWith('**mémo') || line.toLowerCase().startsWith('**moyen mnémotechnique')) {
      flushList();
      html += `<div class="lesson-memo">${mdInline(line)}</div>`;
    }
    // Pièges (encadré rouge/orange)
    else if (line.startsWith('⚠️') || line.toLowerCase().includes('piège') && line.startsWith('**')) {
      flushList();
      html += `<div class="lesson-trap">${mdInline(line)}</div>`;
    }
    // Info/conseil (encadré bleu)
    else if (line.startsWith('🔑') || line.startsWith('💡') || line.startsWith('📖')) {
      flushList();
      html += `<div class="lesson-info">${mdInline(line)}</div>`;
    }
    // Listes non ordonnées
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!inList || listType !== 'ul') { if (inList) flushList(); html += '<ul class="lesson-list">'; inList = true; listType = 'ul'; }
      html += `<li>${mdInline(line.slice(2))}</li>`;
    }
    // Listes ordonnées
    else if (/^\d+\.\s/.test(line)) {
      if (!inList || listType !== 'ol') { if (inList) flushList(); html += '<ol class="lesson-list">'; inList = true; listType = 'ol'; }
      html += `<li>${mdInline(line.replace(/^\d+\.\s/, ''))}</li>`;
    }
    // Lignes vides
    else if (line.trim() === '') {
      flushList();
    }
    // Texte normal
    else {
      flushList();
      html += `<p>${mdInline(line)}</p>`;
    }
  }
  if (inTable) flushTable();
  if (inList) flushList();

  return html;
}

function mdInline(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/**
 * Récupère toutes les leçons d'un module.
 */
function getLessons(moduleId) {
  const mod = LESSON_MODULES.find(m => m.id === moduleId);
  if (!mod) return [];
  return window[mod.dataKey] || [];
}

/**
 * Récupère le nombre de leçons complétées pour un module.
 */
function getCompletedCount(moduleId) {
  const lessons = getLessons(moduleId);
  const completed = window.AppState.getState('progress.lessons.completed') || [];
  return lessons.filter(l => completed.includes(l.id)).length;
}

/**
 * Rendu de la liste de leçons d'un module.
 */
function renderLessonList(container, moduleId) {
  const mod = LESSON_MODULES.find(m => m.id === moduleId);
  const lessons = getLessons(moduleId);
  const completed = window.AppState.getState('progress.lessons.completed') || [];
  const isPro = (window.AppState.getState('pro') || {}).isActive === true;
  const completedCount = lessons.filter(l => completed.includes(l.id)).length;
  const pct = lessons.length ? Math.round((completedCount / lessons.length) * 100) : 0;

  container.innerHTML = `
    <div class="lesson-list-screen">
      <div class="lesson-list-header">
        <button type="button" class="btn-back-icon" data-lesson-back="learn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div>
          <p class="lesson-list-epreuve">${mod.epreuve}</p>
          <h1 class="lesson-list-title">${mod.label}</h1>
        </div>
      </div>
      <div class="lesson-progress-bar-wrap">
        <div class="lesson-progress-bar-track">
          <div class="lesson-progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="lesson-progress-txt">${completedCount} / ${lessons.length} leçons</span>
      </div>
      <div class="lesson-list-items">
        ${lessons.map((lesson, i) => {
          const isCompleted = completed.includes(lesson.id);
          const isLocked = lesson.isPro && !isPro;
          return `
            <button type="button" class="lesson-item-card ${isCompleted ? 'lesson-item-done' : ''} ${isLocked ? 'lesson-item-locked' : ''}" 
              data-lesson-open="${lesson.id}" data-lesson-module="${moduleId}" ${isLocked ? 'data-lesson-pro="1"' : ''}>
              <div class="lesson-item-num">${isCompleted ? '✓' : i + 1}</div>
              <div class="lesson-item-body">
                <p class="lesson-item-title">${lesson.title}</p>
                <p class="lesson-item-meta">
                  <span>⏱ ${lesson.duration} min</span>
                  ${lesson.tags ? lesson.tags.slice(0,2).map(t => `<span class="lesson-tag">${t}</span>`).join('') : ''}
                  ${isLocked ? '<span class="lesson-lock-badge">🔒 PRO</span>' : ''}
                </p>
              </div>
              <svg class="lesson-item-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelector('[data-lesson-back]')?.addEventListener('click', () => {
    window.Router.navigate('#learn', { direction: 'back' });
  });

  container.querySelectorAll('[data-lesson-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.hasAttribute('data-lesson-pro')) {
        window.Paywall?.showModal?.('pro');
        return;
      }
      const lessonId = btn.getAttribute('data-lesson-open');
      const mod = btn.getAttribute('data-lesson-module');
      window.Router.navigate(`#lesson/${mod}-${lessonId}`);
    });
  });
}

/**
 * Rendu de la leçon complète.
 */
function renderLesson(container, params) {
  const raw = (params?.id || '').split('-');
  const moduleId = raw[0];
  const lessonId = raw.slice(1).join('-');
  const lessons = getLessons(moduleId);
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) {
    container.innerHTML = `<div class="lesson-error"><p>Leçon introuvable.</p><button class="btn btn-secondary" data-lesson-back>← Retour</button></div>`;
    container.querySelector('[data-lesson-back]')?.addEventListener('click', () => window.Router.navigate('#learn', { direction: 'back' }));
    return;
  }

  const completed = window.AppState.getState('progress.lessons.completed') || [];
  const isCompleted = completed.includes(lesson.id);
  const mod = LESSON_MODULES.find(m => m.id === moduleId);

  container.innerHTML = `
    <div class="lesson-reader">
      <div class="lesson-reader-header">
        <button type="button" class="btn-back-icon" data-lesson-back="${moduleId}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <div class="lesson-reader-meta">
          <span class="badge ${moduleId === 'pp' ? 'badge-ep2' : 'badge-ep1'}">${mod?.epreuve}</span>
          <span class="lesson-reader-duration">⏱ ${lesson.duration} min</span>
        </div>
      </div>

      <div class="lesson-reader-content">
        <h1 class="lesson-reader-title">${lesson.title}</h1>
        ${lesson.tags ? `<div class="lesson-tags">${lesson.tags.map(t => `<span class="lesson-tag-pill">${t}</span>`).join('')}</div>` : ''}

        <div class="lesson-sections">
          ${lesson.sections.map(sec => `
            <section class="lesson-section">
              <h2 class="lesson-section-title">${sec.heading}</h2>
              <div class="lesson-section-body">${mdToHtml(sec.body)}</div>
            </section>
          `).join('')}
        </div>

        ${lesson.quiz && lesson.quiz.length > 0 ? `
          <div class="lesson-quiz">
            <h2 class="lesson-quiz-title">🧠 Auto-évaluation</h2>
            <div class="lesson-quiz-items">
              ${lesson.quiz.map((q, i) => `
                <div class="lesson-quiz-item" data-lesson-quiz="${i}">
                  <p class="lesson-quiz-q">${q.q}</p>
                  <button type="button" class="btn btn-ghost btn-sm lesson-quiz-reveal" data-quiz-reveal="${i}">Voir la réponse</button>
                  <div class="lesson-quiz-answer" id="lqa-${i}" style="display:none;">
                    <p>${q.a}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="lesson-complete-wrap">
          ${isCompleted ? `
            <div class="lesson-done-badge">✓ Leçon terminée · +30 XP</div>
          ` : `
            <button type="button" class="btn btn-primary btn-lg btn-full" id="lesson-complete-btn">
              Marquer comme terminée → +30 XP
            </button>
          `}
        </div>
      </div>
    </div>
  `;

  container.querySelector('[data-lesson-back]')?.addEventListener('click', () => {
    window.Router.navigate(`#learn`, { direction: 'back' });
  });

  container.querySelectorAll('[data-quiz-reveal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-quiz-reveal');
      const ans = container.querySelector(`#lqa-${idx}`);
      if (ans) {
        ans.style.display = ans.style.display === 'none' ? 'block' : 'none';
        btn.textContent = ans.style.display === 'none' ? 'Voir la réponse' : 'Masquer';
      }
    });
  });

  const completeBtn = container.querySelector('#lesson-complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', () => {
      window.AppState.dispatch('COMPLETE_LESSON', { id: lesson.id });
      window.AppState.dispatch('ADD_XP', { amount: 30 });
      window.AppState.dispatch('INCREMENT_STREAK');
      completeBtn.closest('.lesson-complete-wrap').innerHTML = `
        <div class="lesson-done-badge anim-fadeup">✓ Leçon terminée · +30 XP</div>
      `;
    });
  }
}

/**
 * Rendu du catalogue (écran "Apprendre" — route #learn).
 */
function renderCatalog(container) {
  const isPro = (window.AppState.getState('pro') || {}).isActive === true;
  const completed = window.AppState.getState('progress.lessons.completed') || [];
  const allLessons = LESSON_MODULES.flatMap(m => getLessons(m.id));
  const totalCompleted = completed.filter(id => allLessons.some(l => l.id === id)).length;
  const totalLessons = allLessons.length;
  const globalPct = totalLessons ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  container.innerHTML = `
    <div class="learn-screen">
      <div class="learn-header">
        <h1 class="learn-title">Apprendre</h1>
        <p class="learn-subtitle">${totalCompleted} / ${totalLessons} leçons complétées</p>
        <div class="learn-global-bar">
          <div class="learn-global-fill" style="width:${globalPct}%"></div>
        </div>
      </div>

      <div class="learn-modules">
        ${LESSON_MODULES.map(mod => {
          const lessons = getLessons(mod.id);
          const count = getCompletedCount(mod.id);
          const pct = lessons.length ? Math.round((count / lessons.length) * 100) : 0;
          const proCount = lessons.filter(l => l.isPro).length;
          return `
            <button type="button" class="learn-module-card" data-learn-module="${mod.id}">
              <div class="learn-module-icon" style="color:${mod.color}">${mod.icon}</div>
              <div class="learn-module-body">
                <div class="learn-module-top">
                  <span class="badge ${mod.id === 'pp' ? 'badge-ep2' : 'badge-ep1'}">${mod.epreuve}</span>
                  ${proCount > 0 && !isPro ? `<span class="learn-pro-badge">🔒 ${proCount} PRO</span>` : ''}
                </div>
                <p class="learn-module-label">${mod.label}</p>
                <p class="learn-module-count">${lessons.length} leçons · ${count} terminées</p>
                <div class="learn-module-bar">
                  <div class="learn-module-fill" style="width:${pct}%; background:${mod.color}"></div>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          `;
        }).join('')}
      </div>

      <div class="learn-tips">
        <div class="card learn-tip-card">
          <p class="learn-tip-icon">💡</p>
          <p class="learn-tip-text">Complète chaque leçon pour gagner 30 XP. Les leçons suivent la progression de l'examen officiel.</p>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('[data-learn-module]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modId = btn.getAttribute('data-learn-module');
      window.Router.navigate(`#lesson/${modId}`);
    });
  });
}

/**
 * Point d'entrée principal (route #learn et #lesson/*).
 */
function render(container, params) {
  const route = window.Router.getCurrentRoute();
  if (route.name === 'learn') {
    renderCatalog(container);
    return;
  }
  if (route.name === 'lesson') {
    const id = params?.id || route.params?.id;
    if (!id) { renderCatalog(container); return; }
    const parts = id.split('-');
    const moduleId = parts[0];
    if (LESSON_MODULES.some(m => m.id === moduleId) && parts.length === 1) {
      renderLessonList(container, moduleId);
    } else {
      renderLesson(container, { id });
    }
  }
}

function init() {}

window.Lessons = { init, render };
