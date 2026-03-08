/**
 * OPJ EXAMEN — Partage
 * Génération de carte de score via Canvas + Web Share API.
 */

/**
 * Génère une image de score via Canvas et déclenche le partage natif.
 */
async function shareScore(score, total, epreuve) {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  // Fond dégradé sombre
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#060D18');
  bg.addColorStop(1, '#0D1829');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texture grain (simulée par bruit)
  ctx.globalAlpha = 0.025;
  for (let x = 0; x < canvas.width; x += 4) {
    for (let y = 0; y < canvas.height; y += 4) {
      const v = Math.random() * 255;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 4, 4);
    }
  }
  ctx.globalAlpha = 1;

  // Bordure or
  ctx.strokeStyle = 'rgba(245,166,35,0.3)';
  ctx.lineWidth = 2;
  ctx.roundRect(12, 12, canvas.width - 24, canvas.height - 24, 20);
  ctx.stroke();

  // Logo + titre
  ctx.fillStyle = '#F5A623';
  ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('⚖️ OPJ EXAMEN', 48, 64);

  ctx.fillStyle = '#4A6080';
  ctx.font = '16px system-ui, sans-serif';
  ctx.fillText('La référence pour la qualification OPJ', 48, 90);

  // Score principal
  const scoreDisplay = typeof score === 'number' ? score.toFixed(1) : score;
  const scoreColor = score >= 14 ? '#34D399' : score >= 7 ? '#F5A623' : '#F87171';

  ctx.fillStyle = scoreColor;
  ctx.font = 'bold 96px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(scoreDisplay, canvas.width / 2, 230);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '28px system-ui, sans-serif';
  ctx.fillText('/ 20', canvas.width / 2, 270);

  // Épreuve
  ctx.fillStyle = '#EDF2F7';
  ctx.font = 'bold 18px system-ui, sans-serif';
  ctx.fillText(epreuve || 'Session QCM', canvas.width / 2, 310);

  // Message
  const msg = score >= 18 ? '🏆 Score parfait !' : score >= 14 ? '✅ Admis !' : score >= 7 ? '📚 Continue l\'entraînement' : '💪 Pas encore — reviens !';
  ctx.fillStyle = scoreColor;
  ctx.font = '20px system-ui, sans-serif';
  ctx.fillText(msg, canvas.width / 2, 345);

  // Ligne séparatrice basse
  ctx.strokeStyle = 'rgba(245,166,35,0.2)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(48, 370);
  ctx.lineTo(canvas.width - 48, 370);
  ctx.stroke();

  // URL
  ctx.fillStyle = '#4A6080';
  ctx.font = '14px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('opjexamen.fr', canvas.width / 2, 395);

  return canvas;
}

/**
 * Partage via Web Share API ou copie vers clipboard.
 */
async function share(options = {}) {
  const { score, total, epreuve, text } = options;

  const shareText = text || `Score OPJ Examen : ${typeof score === 'number' ? score.toFixed(1) : score}/20 — ${epreuve || 'Session QCM'}`;

  try {
    if (navigator.share) {
      const canvas = await shareScore(score, total, epreuve);
      if (canvas) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const file = new File([blob], 'score-opj.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'OPJ Examen — Mon score',
            text: shareText,
            files: [file]
          });
          return;
        }
      }
      await navigator.share({
        title: 'OPJ Examen — Mon score',
        text: shareText,
        url: 'https://opjexamen.fr'
      });
    } else {
      await navigator.clipboard.writeText(shareText);
      showCopiedToast();
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      try {
        await navigator.clipboard.writeText(shareText);
        showCopiedToast();
      } catch (_) {}
    }
  }
}

function showCopiedToast() {
  const container = document.getElementById('toast-container') || document.body;
  const toast = document.createElement('div');
  toast.className = 'badge-toast anim-fadeup';
  toast.textContent = '✓ Copié dans le presse-papier !';
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function init() {}

window.Share = { init, share };
