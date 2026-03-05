# Migration opj-examen → blocopj

## Prérequis

- **Node.js** (LTS recommandé) installé et disponible dans le PATH.

## Migration des questions QCM

Les questions de l’ancienne app (`opj-examen/index.html`) sont dans les tableaux `QDB`, `QDB_EXTRA2`, `QDB_LESSONS`, `QDB_V10`. Le script les extrait, déduplique, associe chaque question à une épreuve et un module, puis génère les fichiers de données blocopj.

### Exécution

Depuis la racine du projet **blocopj** :

```bash
node scripts/migrate-questions-from-opj-examen.js
```

- **Entrée** : `../opj-examen/index.html` (ou `c:\Users\keked\opj-examen\index.html` si le script est lancé depuis `blocopj`).
- **Sortie** :
  - `data/questions-ep1.js` (Épreuve 1 — DPG + DPS)
  - `data/questions-ep2.js` (Épreuve 2 — PP)

### Correspondance des tags

| Tag (ancienne app) | Épreuve | Module blocopj   |
|-------------------|--------|------------------|
| PJ, Prescription, Fam | 1 | EP1_DPG |
| Infr              | 1 | EP1_DPS |
| Flagrance, GAV, Perquisition, Mineurs, CDO, Circ, Oral, Preliminaire, flash | 2 | PP_* |

Les questions déjà présentes dans `questions-ep1.js` / `questions-ep2.js` ne sont pas écrasées : le script **remplace** entièrement le contenu des deux fichiers. Pensez à faire une sauvegarde ou un commit avant de lancer la migration si vous avez des questions personnalisées.

## Migration des leçons

Les leçons de l’ancienne app sont dans le tableau `LESSONS` (à partir d’environ la ligne 4503 de `index.html`). Structure ancienne : `id`, `ch`, `ch_name`, `title`, `art`, `ico`, `col`, `status`, `xp`, `cours` (markdown), `qcm_ids`, `min_score`.

Pour les migrer vers `data/lessons/dpg.js`, `dps.js`, `pp.js`, il faut soit :

- adapter le script de migration pour extraire aussi `LESSONS` et écrire les trois fichiers de leçons au format attendu par blocopj,  
- soit copier/coller le contenu après conversion manuelle (id, title, article, content, etc.).

Le module `js/modules/lessons.js` et l’écran d’accueil s’attendent à des leçons avec au moins `id`, `title` et éventuellement `duration` pour l’affichage.
