/**
 * OPJ EXAMEN — Cours Droit Pénal Spécial (EP1-DPS)
 * Source : Code pénal, Légifrance, annales OPJ
 */

window.LESSONS_DPS = [
  {
    id: 'dps-1',
    title: 'Les atteintes volontaires à l\'intégrité physique',
    duration: 14,
    isPro: false,
    tags: ['violences', 'ITT', 'infractions'],
    sections: [
      {
        heading: 'Les violences volontaires : le rôle clé de l\'ITT',
        body: `L'**Incapacité Totale de Travail (ITT)** est l'**élément LÉGAL** des violences : c'est elle qui détermine la qualification applicable.

**⚠️ PIÈGE FONDAMENTAL** : L'ITT n'est PAS l'élément matériel ni l'élément moral — c'est l'élément LÉGAL (critère de qualification).

| ITT | Qualification | Texte |
|-----|--------------|-------|
| Sans ITT | Contravention 1ère classe | R.624-1 CP |
| ≤ 8 jours | Contravention 5ème classe | R.625-1 CP |
| > 8 jours | Délit (222-11 CP) | art. 222-11 |
| Mutilation / infirmité permanente | Crime (222-9 CP) | art. 222-9 |
| Mort sans intention | Crime (222-7 CP) | art. 222-7 |

**Mémo : 0 · 8 · +8 · mutile · mort = R624 · R625 · 222-11 · 222-9 · 222-7**`
      },
      {
        heading: 'Les circonstances aggravantes des violences',
        body: `Les violences peuvent être qualifiées de **crime** si elles sont accompagnées de certaines circonstances :

**Principales circonstances aggravantes :**
- Sur un **mineur de 15 ans** (ou 15 à 18 ans si en position d'autorité)
- Par un **conjoint, concubin, PACS** ou ex-conjoint (violences conjugales)
- Par un **ascendant** ou toute personne ayant autorité sur la victime
- En **réunion** (plusieurs auteurs)
- Avec **préméditation** (violences aggravées → crime)
- Avec **arme** (vrai ou simulé)
- Sur personne **vulnérable** (âge, maladie, infirmité, grossesse)
- Sur **fonctionnaire** dans l'exercice de ses fonctions
- En **récidive**

**⚠️ Combinaison** : plusieurs aggravantes → peine maximale plus élevée.`
      },
      {
        heading: 'Violences conjugales et intra-familiales',
        body: `**Art. 222-14 CP** : violences commises par le conjoint, concubin ou partenaire de PACS sont aggravées :
- Violence ayant entraîné ITT > 8 jours + circonstances aggravantes conjugales → **5 ans + 75 000 €**
- Sans ITT + aggravante conjugale → **3 ans + 45 000 €**

**Ordonnance de protection** (art. 515-9 CC) : le juge aux affaires familiales peut, en cas de violences alléguées, ordonner des mesures urgentes (éloignement, interdiction de contact…).

**Bracelet anti-rapprochement (BAR)** : mesure de protection électronique instaurée par la loi du 28 décembre 2019.

**EVvictim** (Éloignement Victime - Violence Intra-familiale Conjugale et Territoriale) : protocole national de gestion des auteurs dangereux.`
      },
      {
        heading: 'L\'homicide volontaire (meurtre) et ses qualifications',
        body: `**Meurtre** (art. 221-1 CP) : action de donner intentionnellement la mort à autrui.
- Peine : **30 ans de réclusion criminelle**
- Élément moral : **animus necandi** (intention de tuer)

**Meurtre aggravé** (art. 221-2 CP) : préméditation ou guet-apens → **réclusion criminelle à perpétuité**

**Assassinat** (art. 221-3 CP) : meurtre avec **préméditation** ou **guet-apens** → réclusion criminelle à perpétuité
- **⚠️ L'assassinat = meurtre + préméditation (guet-apens)**

**Empoisonnement** (art. 221-5 CP) : attentat à la vie d'autrui par emploi de substances de nature à entraîner la mort → **30 ans** / perpétuité si aggravantes

**Homicide involontaire** (art. 221-6 CP) : donner la mort par maladresse, imprudence, inattention, négligence ou manquement à une obligation de prudence.
- Peine : **3 ans + 45 000 €** (simple); jusqu'à **5 ans** si faute caractérisée`
      },
      {
        heading: 'Les atteintes sexuelles',
        body: `**Viol** (art. 222-23 CP) :
- Tout acte de pénétration sexuelle (vaginale, anale, buccale) OU acte bucco-génital
- Imposé par violence, contrainte, menace ou surprise (**VCMS**)
- Peine : **15 ans de réclusion criminelle**
- Avec aggravantes : jusqu'à **20 ans** (ex : sur mineur de 15 ans)

**Agression sexuelle** (art. 222-27 CP) :
- Tout acte sexuel imposé par VCMS **SAUF** pénétration et bucco-génital
- Peine : **5 ans + 75 000 €**
- Avec aggravantes : jusqu'à **7 ans + 100 000 €**

**Exhibitionnisme** (art. 222-32 CP) : imposition à la vue d'autrui d'un exhibitionnisme sexuel.
- Peine : **1 an + 15 000 €**

**Harcèlement sexuel** (art. 222-33 CP) :
- Propos ou comportements à connotation sexuelle ou sexiste répétés
- OU acte grave même ponctuel
- Peine : **2 ans + 30 000 €** (aggravées si hiérarchie, vulnérabilité…)

**⚠️ Viol vs agression sexuelle** : le critère distinctif est la NATURE de l'acte (pénétration/bucco-génital ou non), pas l'intensité de la violence.`
      }
    ],
    quiz: [
      { q: 'Quelle est la qualification pour des violences ayant entraîné une ITT > 8 jours ?', a: 'Délit de violences volontaires, art. 222-11 CP' },
      { q: 'Quelle est la différence entre meurtre et assassinat ?', a: 'L\'assassinat = meurtre + préméditation ou guet-apens (art. 221-3 CP)' },
      { q: 'Sur quels critères distingue-t-on viol et agression sexuelle ?', a: 'La nature de l\'acte : pénétration/bucco-génital → viol ; tout autre acte sexuel → agression sexuelle' }
    ]
  },
  {
    id: 'dps-2',
    title: 'Les atteintes aux biens',
    duration: 12,
    isPro: false,
    tags: ['vol', 'escroquerie', 'abus de confiance', 'infractions'],
    sections: [
      {
        heading: 'Le vol (art. 311-1 CP)',
        body: `**Définition** : soustraction **frauduleuse** de la chose d'autrui.

**Éléments constitutifs :**
1. **Légal** : art. 311-1 CP
2. **Matériel** : soustraction (acte positif), chose mobilière, propriété d'autrui
3. **Moral** : intention frauduleuse (animus furandi — intention de s'approprier)

**Peine de base** : **3 ans + 45 000 €**

**Principales circonstances aggravantes :**
- En réunion → 5 ans
- Avec violence → jusqu'à 20 ans (crime si mutilation/infirmité)
- Avec arme → 7 à 15 ans
- Sur personne vulnérable, par un agent public…
- Avec effraction, escalade, usage de clé ou de fausses clés

**⚠️ Vol à main armée** (art. 311-8) : crime → **15 ans** minimum`
      },
      {
        heading: 'L\'escroquerie (art. 313-1 CP)',
        body: `**Définition** : tromper une personne physique ou morale par l'emploi de manoeuvres frauduleuses pour la déterminer à remettre des fonds, valeurs ou biens, à fournir un service ou à consentir un acte opérant obligation ou décharge.

**Moyens frauduleux (limitatifs) :**
- Faux nom / fausse qualité
- Abus de qualité vraie
- Manœuvres frauduleuses (actions positives, mises en scène…)
- **⚠️ Le seul mensonge ne suffit pas** (sauf si accompagné d'une mise en scène)

**Peine** : **5 ans + 375 000 €**

**Distinction avec l'abus de confiance** :
- Escroquerie : la victime est trompée AVANT de remettre la chose
- Abus de confiance : la victime remet volontairement la chose (détournement ensuite)`
      },
      {
        heading: 'L\'abus de confiance (art. 314-1 CP)',
        body: `**Définition** : le fait de détourner au préjudice d'autrui des fonds, valeurs ou biens qui ont été remis et acceptés à charge de les rendre, représenter ou en faire un usage déterminé.

**Éléments :**
1. Remise préalable (volontaire, à titre précaire)
2. Détournement (usage différent de celui convenu)
3. Préjudice pour le remettant

**Peine** : **3 ans + 375 000 €**

**Aggravation** si :
- Personne vulnérable
- Personne publique ou dépositaire de l'autorité publique
- Abus de la faiblesse d'une personne`
      },
      {
        heading: 'L\'extorsion (art. 312-1 CP)',
        body: `**Définition** : le fait d'obtenir par violence, menace de violences ou contrainte, soit une signature, soit la révélation d'un secret, soit la remise de fonds, valeurs ou biens.

**Peine de base** : **7 ans + 100 000 €**

**Aggravations** :
- En réunion → 10 ans
- Avec arme → 15 ans
- Avec violence grave → 20 ans (crime)
- Avec mutilation ou infirmité permanente → 30 ans (crime)

**Distinction avec l'escroquerie** :
- Escroquerie : victime trompée (pas de violence)
- Extorsion : victime contrainte (violence ou menace)`
      },
      {
        heading: 'Le recel et le blanchiment',
        body: `**Recel** (art. 321-1 CP) :
- Fait de dissimuler, détenir ou transmettre une chose en sachant qu'elle provient d'un crime ou délit
- OU fait d'en bénéficier sciemment
- Peine : **5 ans + 375 000 €** (même peine que l'infraction d'origine, dans la limite de ce maximum)

**⚠️ Infraction continue** : le recel dure tant que la personne détient la chose. La prescription court à compter du dernier acte de détention.

**Blanchiment** (art. 324-1 CP) :
- Faciliter la justification mensongère de l'origine des biens ou revenus de l'auteur d'un crime ou délit
- OU apporter concours à une opération de placement, dissimulation, conversion du produit direct ou indirect d'un crime/délit
- Peine : **5 ans + 375 000 €**`
      }
    ],
    quiz: [
      { q: 'Quelle est la peine de base pour un vol simple (art. 311-1 CP) ?', a: '3 ans d\'emprisonnement et 45 000 € d\'amende' },
      { q: 'Quelle est la différence clé entre escroquerie et abus de confiance ?', a: 'Dans l\'escroquerie, la victime est trompée avant de remettre ; dans l\'abus de confiance, elle remet volontairement puis la chose est détournée' },
      { q: 'Quel est le régime de prescription du recel ?', a: 'C\'est une infraction continue : la prescription court à compter du dernier acte de détention' }
    ]
  },
  {
    id: 'dps-3',
    title: 'Les infractions contre les personnes vulnérables',
    duration: 10,
    isPro: false,
    tags: ['mineurs', 'vulnérabilité', 'protection'],
    sections: [
      {
        heading: 'La notion de personne vulnérable',
        body: `**Définition légale** (art. 222-14-2 CP) : la vulnérabilité due à l'âge, la maladie, une infirmité, une déficience physique ou psychique ou à un état de grossesse.

**⚠️ La vulnérabilité peut être apparente ou connue de l'auteur** — même si non certifiée médicalement.

**Effets de la vulnérabilité** :
- Circonstance aggravante de nombreuses infractions (violences, escroquerie, harcèlement…)
- Certaines infractions spécifiques créées pour protéger les plus vulnérables`
      },
      {
        heading: 'Les infractions spécifiques aux mineurs',
        body: `**Mise en danger de la vie d'autrui** (art. 223-1 CP) :
- Exposer directement autrui à un risque immédiat de mort ou blessures graves par violation délibérée d'une obligation de sécurité
- Peine : **1 an + 15 000 €**

**Atteintes sexuelles sur mineur de 15 ans** (art. 227-25 CP) :
- Atteinte sexuelle sans violence sur un mineur de moins de 15 ans (infraction spécifique)
- Peine : **5 ans + 75 000 €**

**Agression sexuelle sur mineur de 15 ans** aggravée.

**ICPE (Inceste)** (art. 222-31-1 CP) :
- Viol ou agression sexuelle commis par un ascendant, frère, sœur, oncle, tante, neveu, nièce ou toute personne ayant autorité

**Soustraction d'enfant / non-représentation** (art. 227-5 et 227-7 CP)`
      },
      {
        heading: 'La protection des personnes âgées et handicapées',
        body: `**Abus de faiblesse** (art. 223-15-2 CP) :
- Abus de l'ignorance ou de la faiblesse d'une personne vulnérable (âge, maladie, infirmité)
- Pour lui faire souscrire des actes ou engagements contraires à ses intérêts
- Peine : **3 ans + 375 000 €**

**Délaissement d'une personne hors d'état de se protéger** (art. 223-3 CP) :
- Délaissement en lieu quelconque sans aide
- Peine : **5 ans + 75 000 €** (aggravé si mort en résulte)

**Violence psychologique** (art. 222-14-3 CP) :
- Actes répétés ayant pour effet une dégradation des conditions de vie de la personne vulnérable
- Peine : **3 ans + 45 000 €**`
      }
    ],
    quiz: [
      { q: 'Quelle est la peine pour une atteinte sexuelle sur mineur de moins de 15 ans (art. 227-25 CP) ?', a: '5 ans et 75 000 € d\'amende' },
      { q: 'Comment se distingue l\'abus de faiblesse (223-15-2) de l\'escroquerie ?', a: 'L\'abus de faiblesse vise spécifiquement les personnes vulnérables (âge, maladie) sans nécessité de manœuvres frauduleuses ; l\'escroquerie suppose des manœuvres frauduleuses sans condition de vulnérabilité' }
    ]
  },
  {
    id: 'dps-4',
    title: 'Les infractions en matière de stupéfiants et de circulation routière',
    duration: 10,
    isPro: true,
    tags: ['stupéfiants', 'circulation', 'infractions routières'],
    sections: [
      {
        heading: 'Le trafic de stupéfiants',
        body: `**Usage illicite** (art. L. 3421-1 CSP) :
- Peine : **1 an + 3 750 €** (délit)
- Alternative : injonction thérapeutique (IT)

**Détention, transport, offre, cession** (art. 222-37 CP) :
- Peine : **10 ans + 7 500 000 €**

**Import/export, production, fabrication** (art. 222-36 CP) :
- Peine : **10 ans + 7 500 000 €**

**Association de malfaiteurs en vue de trafic** (art. 450-1 CP) :
- Peine : **10 ans + 7 500 000 €**

**En bande organisée** (art. 222-34 CP) → crime :
- Peine : **20 à 30 ans** de réclusion criminelle

**⚠️ Régime dérogatoire de GAV** : 48 h + 48 h = 96 h (crime organisé).`
      },
      {
        heading: 'La conduite sous l\'influence de l\'alcool et stupéfiants',
        body: `**Taux légaux d'alcoolémie :**
- Conducteur ordinaire : **0,5 g/L** (sang) / **0,25 mg/L** (air)
- Jeune conducteur (< 3 ans permis) et transport en commun : **0,2 g/L** / **0,10 mg/L**

**Sanctions pour conduite en état alcoolique :**
- Taux ≥ 0,5 g/L : contravention 4ème classe (jusqu'à 0,8 g/L)
- Taux ≥ 0,8 g/L : délit → **2 ans + 4 500 €** + suspension de permis

**Conduite sous stupéfiants** (art. L. 235-1 Code de la route) :
- Délit : **2 ans + 4 500 €** + suspension de permis
- Cumul alcool + stupéfiants → peines portées au double

**Homicide involontaire aggravé** (art. 221-6 al. 2) :
- Conducteur sous alcool ou stupéfiants : **7 ans + 100 000 €**
- En récidive ou avec circonstances aggravantes multiples : **10 ans + 150 000 €**`
      }
    ],
    quiz: [
      { q: 'Quelle peine pour usage illicite de stupéfiants (art. L. 3421-1 CSP) ?', a: '1 an d\'emprisonnement et 3 750 € d\'amende (délit)' },
      { q: 'Quel est le taux légal d\'alcoolémie pour un conducteur normal ?', a: '0,5 g/L dans le sang (ou 0,25 mg/L dans l\'air expiré)' }
    ]
  }
];
