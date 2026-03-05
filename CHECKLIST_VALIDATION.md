# Checklist de validation finale — OPJ Examen

*Avant lancement public. Dernière mise à jour : mars 2026.*

---

## FONDATIONS TECHNIQUES

| # | Point | Statut | Note |
|---|--------|--------|------|
| 1 | **css/variables.css** — zéro valeur de couleur en dur ailleurs | ✅ | Couleurs en dur remplacées par variables (--c-overlay-dark, --c-cat-*, --c-eliminating-bg, etc.). |
| 2 | **Polices** Syne + DM Sans + JetBrains Mono chargées et visibles | ✅ | Chargées dans app.html (Google Fonts), utilisées dans base.css et screens.css. |
| 3 | **AppState persiste** entre les rechargements de page | ✅ | state.js : load() au bootstrap, save() après chaque dispatch ; storage.js → localStorage. |
| 4 | **Router** fonctionne (back/forward navigateur) | ✅ | hashchange gère le hash ; back/forward du navigateur change le hash → écran mis à jour. Router.back() utilise l’historique interne. |
| 5 | **Splash screen** s’affiche puis disparaît proprement | ✅ | app.js : showSplash() → après SPLASH_DURATION_MS → hideSplash() + navigation #onboarding ou #home. |
| 6 | **PWA installable** (test Lighthouse > 90) | ⚠️ | manifest.json + sw.js en place. À valider : Lighthouse (Performance, PWA, Best Practices). Icônes 192/512 PNG présentes. |

---

## DESIGN

| # | Point | Statut | Note |
|---|--------|--------|------|
| 7 | Aucun **fond blanc** dans l’app | ✅ | body et conteneurs utilisent --c-bg-base / --c-bg-raised. Aucun #fff de fond. |
| 8 | Animations **fluides 60fps** (no jank) | ✅ | Transitions CSS (--dur-fast, --ease-*), pas d’animations JS lourdes. À vérifier sur device faible si besoin. |
| 9 | Éléments tactiles **≥ 52px** de hauteur | ✅ | .btn min-height: 52px, .nav-item min-height: 52px, .card-interactive min-height: 52px. |
| 10 | **Contraste** texte lisible (nuit, téléphone) | ⚠️ | Texte --c-text-primary sur --c-bg-base. À tester sur téléphone réel la nuit. |
| 11 | **Grain** texture visible mais subtile | ✅ | base.css : body::before avec feTurbulence, opacity 0.025. |
| 12 | **Ombres --shadow-gold** sur tous les éléments gold | ✅ | .btn-primary, .card-gold, qcm-result-score-ok utilisent --shadow-gold. |

---

## CONTENU

| # | Point | Statut | Note |
|---|--------|--------|------|
| 13 | **150 questions Épreuve 1** (DPG + DPS) | ❌ | Actuellement ~10 questions dans questions-ep1.js. À compléter jusqu’à 150. |
| 14 | **150 questions Épreuve 2** (PP) | ❌ | Actuellement ~10 questions dans questions-ep2.js. À compléter jusqu’à 150. |
| 15 | **40+ infractions** complètes (7 éléments chacune) | ✅ | 42 infractions dans data/infractions.js (definition, elementMateriel, elementMoral, peineBase, aggravantes, infractionsVoisines, flashcards). |
| 16 | **8 scénarios cartouches** complets | ✅ | 8 scénarios dans data/cartouches.js avec actes détaillés. |
| 17 | **7 scénarios compte rendu** + grilles | ✅ | 7 scénarios dans data/comptes-rendus.js (ficheFaits, modele, grille). |
| 18 | **Score /120** calculé avec alertes éliminatoires | ✅ | state.js getTotalPredictedScore(), home affiche X/120 + alerte si épreuve ≤ 5/20. |

---

## BUSINESS

| # | Point | Statut | Note |
|---|--------|--------|------|
| 19 | **Paywall** déclenché sur les **5 contextes** | ✅ | 1 Explication verrouillée, 2 EP1 tentée, 3 Sessions épuisées, 4 Alerte éliminatoire (toast), 5 Bon score > 16 (toast). |
| 20 | **Landing page** blocopj.fr en ligne | ⚠️ | index.html (landing) prêt. Déploiement et domaine à configurer. |
| 21 | **Domaine** acheté + **Netlify** déployé (quitter GitHub Pages) | ⚠️ | À faire côté hébergement. |
| 22 | **Prix affichés** : 9,99€/mois · 59,99€/an · **14,99€ coup de feu** | ✅ | Modal PRO (paywall.js) : 3 cartes (9,99€, 59,99€, 14,99€ coup de feu). Landing index.html : idem. |
| 23 | **Essai 7 jours** déclenché à **J+3** | ✅ | paywall.js : canShowTrialOffer() (J+3, totalSessions >= 3, !trialUsed), checkAndShowTrialModal() au bootstrap. |

---

## Actions recommandées avant lancement

1. **Contenu** : Enrichir `data/questions-ep1.js` et `data/questions-ep2.js` jusqu’à 150 questions chacune (format existant).
2. **PWA** : Lancer un audit Lighthouse sur app.html (Performance, PWA, Accessibilité) et corriger jusqu’à > 90.
3. **Contraste** : Tester l’app sur téléphone en conditions réelles (nuit) et ajuster --c-text-secondary / --c-text-muted si besoin.
4. **Production** : Acheter le domaine, déployer sur Netlify, pointer blocopj.fr vers le déploiement.

---

*OPJ Examen · Prompt Zéro v1.0 · Refonte complète*  
*Sources officielles : Légifrance · Arrêté 9 août 2016 · Art. A.15 CPP · Arrêté 22 décembre 2023 · Mars 2026*
