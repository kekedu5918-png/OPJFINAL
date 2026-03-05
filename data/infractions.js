/**
 * OPJ EXAMEN — 40+ infractions du programme officiel
 * Chacune avec les 7 éléments : definition, elementMateriel, elementMoral, peineBase, aggravantes, infractionsVoisines, flashcards
 */

window.INFRACTIONS = [
  {
    id: 'meurtre',
    name: 'Meurtre',
    category: 'personnes',
    isPro: false,
    article: 'Art. 221-1 CP',
    definition: 'Le fait de donner volontairement la mort à autrui.',
    elementMateriel: "L'acte de donner la mort : coup, empoisonnement, usage d'une arme, etc.",
    elementMoral: 'Intentionnel — intention de tuer (animus necandi).',
    peineBase: '30 ans de réclusion criminelle',
    aggravantes: [
      'Préméditation → Assassinat (Art. 221-3) → réclusion criminelle à perpétuité',
      'Sur mineur de 15 ans → perpétuité',
      'Sur personne vulnérable → perpétuité',
      'Par conjoint ou concubin → perpétuité'
    ],
    infractionsVoisines: "Distinguer du meurtre involontaire (Art. 221-6) où l'intention de tuer est absente — seule la faute (imprudence, négligence) est caractérisée.",
    flashcards: [
      { q: "Article du meurtre ?", a: "Art. 221-1 CP" },
      { q: "Peine de base du meurtre ?", a: "30 ans de réclusion criminelle" },
      { q: "Élément moral du meurtre ?", a: "Intentionnel — intention de donner la mort" },
      { q: "Différence meurtre / assassinat ?", a: "L'assassinat = meurtre avec préméditation (Art. 221-3)" }
    ]
  },
  {
    id: 'assassinat',
    name: 'Assassinat',
    category: 'personnes',
    isPro: false,
    article: 'Art. 221-3 CP',
    definition: 'Meurtre commis avec préméditation.',
    elementMateriel: "Même élément matériel que le meurtre : donner la mort à autrui.",
    elementMoral: "Intention de tuer + préméditation (résolution formée avant l'action).",
    peineBase: 'Réclusion criminelle à perpétuité',
    aggravantes: [
      'Sur mineur de 15 ans',
      'Précédé ou suivi d\'un crime (viol, torture...)',
      'En bande organisée'
    ],
    infractionsVoisines: "Distinguer du meurtre simple (Art. 221-1) et du meurtre avec guet-apens (Art. 221-4, circonstance aggravante).",
    flashcards: [
      { q: "Article de l'assassinat ?", a: "Art. 221-3 CP" },
      { q: "Qu'est-ce que la préméditation ?", a: "Résolution formée avant l'action de donner la mort" },
      { q: "Peine de l'assassinat ?", a: "Réclusion criminelle à perpétuité" }
    ]
  },
  {
    id: 'vol',
    name: 'Vol',
    category: 'biens',
    isPro: false,
    article: 'Art. 311-1 CP',
    definition: "La soustraction frauduleuse de la chose d'autrui.",
    elementMateriel: "Soustraction : déplacement de la chose (appropriation). La chose doit appartenir à autrui.",
    elementMoral: "Intentionnel — conscience de soustraire le bien d'autrui (dol général).",
    peineBase: "5 ans d'emprisonnement et 75 000 € d'amende",
    aggravantes: [
      "Violence ou menace → 5 ans (Art. 311-4)",
      "Réunion de 2 circonstances (armes, vulnérabilité, bande...) → 10 ans",
      "Vol à main armée ou en bande organisée → 20 ans"
    ],
    infractionsVoisines: "Distinguer du recel (Art. 321-1) : le receleur ne commet pas la soustraction initiale. Distinguer de l'escroquerie : la victime remet volontairement le bien (trompée).",
    flashcards: [
      { q: "Article du vol ?", a: "Art. 311-1 CP" },
      { q: "Élément matériel du vol ?", a: "Soustraction frauduleuse de la chose d'autrui" },
      { q: "Peine de base du vol ?", a: "5 ans et 75 000 €" }
    ]
  },
  {
    id: 'recel',
    name: 'Recel',
    category: 'biens',
    isPro: false,
    article: 'Art. 321-1 CP',
    definition: "Le fait de détenir, transmettre ou convertir un bien provenant d'un crime ou d'un délit, en connaissance de cause.",
    elementMateriel: "Détention, transmission ou conversion du bien. Le bien doit provenir d'une infraction.",
    elementMoral: "Intentionnel — connaissance de l'origine frauduleuse du bien.",
    peineBase: "5 ans d'emprisonnement et 375 000 € d'amende",
    aggravantes: [
      "Recel en bande organisée → 10 ans",
      "Recel habituel → 10 ans"
    ],
    infractionsVoisines: "Infraction continue : se prolonge tant que le receleur détient la chose. Distinguer du vol : pas de soustraction initiale par le receleur.",
    flashcards: [
      { q: "Article du recel ?", a: "Art. 321-1 CP" },
      { q: "Le recel est-il instantané ou continue ?", a: "Continue : chaque jour de détention = infraction" },
      { q: "Élément moral du recel ?", a: "Connaissance de l'origine frauduleuse du bien" }
    ]
  },
  {
    id: 'violences-volontaires',
    name: 'Violences volontaires',
    category: 'personnes',
    isPro: false,
    article: 'Art. 222-7 à 222-18-3 CP',
    definition: "L'atteinte volontaire à l'intégrité physique ou psychique d'autrui.",
    elementMateriel: "Coups, blessures, actes de violence. Pas de consentement de la victime (sauf exceptions légales).",
    elementMoral: "Intentionnel — volonté de porter atteinte.",
    peineBase: "Selon l'ITT : sans ITT 3 ans / 45 000 € ; ITT ≤ 8 jours 5 ans / 75 000 € ; ITT > 8 jours 10 ans / 150 000 €",
    aggravantes: [
      "Sur mineur de 15 ans, personne vulnérable, conjoint...",
      "Arme, préméditation, en réunion"
    ],
    infractionsVoisines: "Distinguer des violences involontaires (Art. 222-19). VTM = violences ayant entraîné la mort sans intention de la donner.",
    flashcards: [
      { q: "Peine violences sans ITT ?", a: "3 ans et 45 000 €" },
      { q: "Peine violences ITT > 8 jours ?", a: "10 ans et 150 000 €" },
      { q: "Qu'est-ce que l'ITT ?", a: "Incapacité totale de travail (critère médical)" }
    ]
  },
  {
    id: 'escroquerie',
    name: 'Escroquerie',
    category: 'biens',
    isPro: false,
    article: 'Art. 313-1 CP',
    definition: "Le fait de tromper une personne physique ou morale par l'usage de manœuvres frauduleuses et d'obtenir ainsi des fonds, des valeurs ou un bien.",
    elementMateriel: "Manœuvres frauduleuses (mensonges, mise en scène) + remise par la victime (consentement vicié).",
    elementMoral: "Intention de tromper pour obtenir la remise.",
    peineBase: "5 ans d'emprisonnement et 375 000 € d'amende",
    aggravantes: [
      "Personne vulnérable, en bande organisée → 7 ans",
      "Abus de confiance d'un mandataire → 7 ans"
    ],
    infractionsVoisines: "Distinguer du vol : dans l'escroquerie la victime remet volontairement (trompée). Distinguer de l'abus de confiance : le bien a été remis licitement.",
    flashcards: [
      { q: "Article de l'escroquerie ?", a: "Art. 313-1 CP" },
      { q: "Élément spécifique de l'escroquerie vs vol ?", a: "Manœuvres frauduleuses + remise par la victime (consentement vicié)" },
      { q: "Peine de base escroquerie ?", a: "5 ans et 375 000 €" }
    ]
  },
  {
    id: 'viol',
    name: 'Viol',
    category: 'personnes',
    isPro: false,
    article: 'Art. 222-23 CP',
    definition: "Tout acte de pénétration sexuelle, de quelque nature qu'il soit, commis sur la personne d'autrui par violence, contrainte, menace ou surprise.",
    elementMateriel: "Acte de pénétration sexuelle + violence, contrainte, menace ou surprise.",
    elementMoral: "Intentionnel.",
    peineBase: "20 ans de réclusion criminelle",
    aggravantes: [
      "Sur mineur de 15 ans → 20 ans (30 ans si mineur < 15)",
      "Mort de la victime → perpétuité",
      "En réunion, par ascendant..."
    ],
    infractionsVoisines: "Distinguer des autres agressions sexuelles (Art. 222-22 et s.) : pas de pénétration. Atteinte sexuelle sur mineur : 5 ans.",
    flashcards: [
      { q: "Article du viol ?", a: "Art. 222-23 CP" },
      { q: "Peine de base du viol ?", a: "20 ans de réclusion criminelle" },
      { q: "Moyens du viol (élément matériel) ?", a: "Violence, contrainte, menace ou surprise" }
    ]
  },
  {
    id: 'homicide-involontaire',
    name: 'Homicide involontaire',
    category: 'personnes',
    isPro: false,
    article: 'Art. 221-6 CP',
    definition: "Le fait de causer la mort d'autrui par maladresse, imprudence, inattention, négligence ou manquement à une obligation de sécurité.",
    elementMateriel: "Comportement à l'origine du décès (acte ou abstention).",
    elementMoral: "Non intentionnel — faute d'imprudence, négligence ou manquement délibéré aux règles.",
    peineBase: "3 ans d'emprisonnement et 45 000 € (5 ans si violation manifeste d'une obligation de prudence).",
    aggravantes: [
      "Conduite sous l'emprise d'alcool ou de stupéfiants",
      "Délit de fuite",
      "Manquement délibéré à une obligation de sécurité → 5 ans"
    ],
    infractionsVoisines: "Distinguer du meurtre (intention de tuer). Pas de préméditation ni intention de donner la mort.",
    flashcards: [
      { q: "Article homicide involontaire ?", a: "Art. 221-6 CP" },
      { q: "Élément moral homicide involontaire ?", a: "Faute (imprudence, négligence) — pas d'intention de tuer" },
      { q: "Peine de base ?", a: "3 ans et 45 000 €" }
    ]
  },
  {
    id: 'extorsion',
    name: 'Extorsion',
    category: 'biens',
    isPro: false,
    article: 'Art. 312-1 CP',
    definition: "Le fait d'obtenir par violence, menace de violence ou contrainte des fonds, des valeurs ou un bien.",
    elementMateriel: "Violence, menace ou contrainte + remise du bien par la victime.",
    elementMoral: "Intention d'obtenir la remise par ces moyens.",
    peineBase: "10 ans d'emprisonnement et 150 000 € d'amende",
    aggravantes: [
      "Torture ou actes de barbarie → 20 ans",
      "Mort de la victime → perpétuité"
    ],
    infractionsVoisines: "Distinguer du vol avec violence (soustraction) : dans l'extorsion la victime remet sous contrainte.",
    flashcards: [
      { q: "Article de l'extorsion ?", a: "Art. 312-1 CP" },
      { q: "Moyens de l'extorsion ?", a: "Violence, menace de violence ou contrainte" },
      { q: "Peine de base ?", a: "10 ans et 150 000 €" }
    ]
  },
  {
    id: 'abus-confiance',
    name: 'Abus de confiance',
    category: 'biens',
    isPro: false,
    article: 'Art. 314-1 CP',
    definition: "Le fait par une personne de détourner au préjudice d'autrui des fonds, des valeurs ou un bien qui lui ont été remis et qu'elle a acceptés à charge de les rendre, représenter ou en faire un usage déterminé.",
    elementMateriel: "Remise préalable licite du bien + détournement (usage contraire à la destination convenue).",
    elementMoral: "Intention de détourner.",
    peineBase: "5 ans d'emprisonnement et 375 000 € d'amende",
    aggravantes: [
      "Sur personne vulnérable",
      "Par mandataire de justice, dépositaire public..."
    ],
    infractionsVoisines: "Distinguer de l'escroquerie : ici la remise est licite (confiance initiale). Distinguer du vol : pas de soustraction initiale.",
    flashcards: [
      { q: "Article abus de confiance ?", a: "Art. 314-1 CP" },
      { q: "Différence escroquerie / abus de confiance ?", a: "Escroquerie : remise obtenue par tromperie. Abus : remise licite puis détournement" },
      { q: "Peine de base ?", a: "5 ans et 375 000 €" }
    ]
  },
  {
    id: 'sequestration',
    name: 'Séquestration',
    category: 'personnes',
    isPro: false,
    article: 'Art. 224-1 CP',
    definition: "Le fait d'arrêter, d'enlever ou de détenir une personne sans ordre des autorités constituées et sans qu'il soit permis par les lois.",
    elementMateriel: "Arrestation, enlèvement ou détention illégale. Privation de liberté.",
    elementMoral: "Intentionnel.",
    peineBase: "20 ans de réclusion criminelle",
    aggravantes: [
      "Mort de la victime → perpétuité",
      "Torture ou actes de barbarie",
      "Sur mineur de 15 ans"
    ],
    infractionsVoisines: "Distinguer de la non-représentation d'enfant (Art. 227-5). Enlèvement = séquestration avec déplacement.",
    flashcards: [
      { q: "Article de la séquestration ?", a: "Art. 224-1 CP" },
      { q: "Peine de base ?", a: "20 ans de réclusion criminelle" },
      { q: "Élément matériel ?", a: "Arrêter, enlever ou détenir une personne sans ordre légal" }
    ]
  },
  {
    id: 'corruption',
    name: 'Corruption',
    category: 'nation',
    isPro: false,
    article: 'Art. 432-11 et 433-1 CP',
    definition: "Le fait par une personne dépositaire de l'autorité publique de recevoir des offres ou avantages pour accomplir ou s'abstenir d'accomplir un acte de sa fonction.",
    elementMateriel: "Réception d'offres, promesses, dons ou avantages. Qualité de dépositaire de l'autorité publique.",
    elementMoral: "Intention d'accomplir ou s'abstenir en contrepartie.",
    peineBase: "10 ans d'emprisonnement et 150 000 € (passive) ; 10 ans et 150 000 € (active).",
    aggravantes: [
      "Trafic d'influence",
      "Corruption de personne privée (Art. 445-1)"
    ],
    infractionsVoisines: "Distinguer du trafic d'influence (Art. 433-2) : promettre l'intervention d'une personne publique. Concussion = exiger des fonds dus à la fonction.",
    flashcards: [
      { q: "Article corruption passive ?", a: "Art. 432-11 CP" },
      { q: "Qui peut être auteur de corruption passive ?", a: "Personne dépositaire de l'autorité publique" },
      { q: "Peine de base ?", a: "10 ans et 150 000 €" }
    ]
  },
  {
    id: 'rebellion',
    name: 'Rébellion',
    category: 'nation',
    isPro: false,
    article: 'Art. 433-6 CP',
    definition: "Le fait d'opposer une résistance violente à une personne dépositaire de l'autorité publique ou chargée d'une mission de service public dans l'exercice de ses fonctions.",
    elementMateriel: "Résistance violente (coups, violences, résistance physique).",
    elementMoral: "Intention de s'opposer à l'exercice des fonctions.",
    peineBase: "1 an d'emprisonnement et 15 000 € (sans violence) ; 5 ans et 75 000 € (avec violence).",
    aggravantes: [
      "En réunion",
      "Arme"
    ],
    infractionsVoisines: "Distinguer de l'outrage (paroles, gestes) : la rébellion suppose résistance physique. Outrage = Art. 433-5.",
    flashcards: [
      { q: "Article de la rébellion ?", a: "Art. 433-6 CP" },
      { q: "Différence rébellion / outrage ?", a: "Rébellion = résistance violente. Outrage = paroles ou gestes dégradants" },
      { q: "Peine rébellion avec violence ?", a: "5 ans et 75 000 €" }
    ]
  },
  {
    id: 'outrage',
    name: 'Outrage',
    category: 'nation',
    isPro: false,
    article: 'Art. 433-5 CP',
    definition: "Le fait d'outrager une personne dépositaire de l'autorité publique ou chargée d'une mission de service public dans l'exercice de ses fonctions.",
    elementMateriel: "Paroles, écrits, gestes ou actes outrageants (atteinte à l'honneur, à la dignité).",
    elementMoral: "Intentionnel.",
    peineBase: "1 an d'emprisonnement et 15 000 € d'amende",
    aggravantes: [
      "Outrage en réunion",
      "Outrage à caractère raciste ou discriminatoire"
    ],
    infractionsVoisines: "Distinguer de la rébellion (résistance violente). Outrage = atteinte verbale ou symbolique.",
    flashcards: [
      { q: "Article de l'outrage ?", a: "Art. 433-5 CP" },
      { q: "Élément matériel outrage ?", a: "Paroles, écrits, gestes ou actes outrageants" },
      { q: "Peine de base ?", a: "1 an et 15 000 €" }
    ]
  },
  {
    id: 'blanchiment',
    name: 'Blanchiment',
    category: 'nation',
    isPro: false,
    article: 'Art. 324-1 CP',
    definition: "Le fait de faciliter, par tout moyen, la justification mensongère de l'origine des biens ou du produit d'un crime ou d'un délit.",
    elementMateriel: "Opérations de conversion, dissimulation, acquisition ou utilisation des biens. Le bien doit provenir d'un crime ou délit.",
    elementMoral: "Connaissance de l'origine délictuelle (ou ignorance inexcusable).",
    peineBase: "5 ans d'emprisonnement et 375 000 € d'amende",
    aggravantes: [
      "En bande organisée → 10 ans",
      "Blanchiment habituel"
    ],
    infractionsVoisines: "Distinguer du recel : le blanchiment vise à donner une apparence licite. Recel = simple détention en connaissance de cause.",
    flashcards: [
      { q: "Article du blanchiment ?", a: "Art. 324-1 CP" },
      { q: "Objectif du blanchiment ?", a: "Donner une justification mensongère de l'origine des biens" },
      { q: "Peine de base ?", a: "5 ans et 375 000 €" }
    ]
  },
  {
    id: 'stupéfiants',
    name: 'Usage et trafic de stupéfiants',
    category: 'nation',
    isPro: false,
    article: 'Art. 222-34 à 222-43 CP',
    definition: "Usage illicite, acquisition, détention, offre, cession ou importation/exportation de stupéfiants.",
    elementMateriel: "Substance classée comme stupéfiant (liste officielle). Acte d'usage, détention, cession, etc.",
    elementMoral: "Intentionnel — conscience de la nature du produit.",
    peineBase: "Usage : 1 an et 3 750 €. Trafic : 10 ans et 7 500 000 € (vente, import, production...).",
    aggravantes: [
      "En bande organisée → 30 ans",
      "Sur mineur ou aux abords d'établissement scolaire",
      "Importation / exportation"
    ],
    infractionsVoisines: "Distinguer usage simple (pour soi) et trafic (cession, production). Proxénétisme et autres infractions spécifiques.",
    flashcards: [
      { q: "Peine usage de stupéfiants ?", a: "1 an et 3 750 €" },
      { q: "Peine trafic en bande organisée ?", a: "30 ans et 7 500 000 €" },
      { q: "Élément matériel ?", a: "Substance classée stupéfiant + acte (détention, cession...)" }
    ]
  },
  {
    id: 'falsification',
    name: 'Falsification',
    category: 'autres',
    isPro: false,
    article: 'Art. 441-1 et s. CP',
    definition: "La falsification de documents administratifs, de titres, de pièces d'identité ou de tout document destiné à faire preuve.",
    elementMateriel: "Altération, fabrication ou usage d'un document falsifié.",
    elementMoral: "Intention de tromper (usage ou fabrication).",
    peineBase: "Selon le document : 3 à 5 ans et 45 000 à 75 000 €.",
    aggravantes: [
      "Faux en écriture publique",
      "Usage de faux"
    ],
    infractionsVoisines: "Distinguer falsification de document administratif (Art. 441-1) et faux en écriture privée (Art. 441-7).",
    flashcards: [
      { q: "Article falsification document administratif ?", a: "Art. 441-1 CP" },
      { q: "Élément matériel ?", a: "Altération, fabrication ou usage de document falsifié" },
      { q: "Peine type ?", a: "3 à 5 ans et 45 000 à 75 000 €" }
    ]
  },
  {
    id: 'homicide-vtm',
    name: 'Violences ayant entraîné la mort sans intention de la donner (VTM)',
    category: 'personnes',
    isPro: false,
    article: 'Art. 222-7 et 222-8 CP',
    definition: "Les violences ayant entraîné la mort sans intention de la donner.",
    elementMateriel: "Violences volontaires + lien de causalité avec le décès.",
    elementMoral: "Intention de commettre des violences, mais pas intention de donner la mort.",
    peineBase: "15 ans de réclusion criminelle (20 ans si vulnérabilité, arme, etc.).",
    aggravantes: [
      "Sur mineur de 15 ans",
      "Arme",
      "En réunion"
    ],
    infractionsVoisines: "Distinguer du meurtre (intention de tuer) et de l'homicide involontaire (pas d'intention de violences).",
    flashcards: [
      { q: "Article VTM ?", a: "Art. 222-7 et 222-8 CP" },
      { q: "Élément moral VTM ?", a: "Intention de violences, mais pas intention de donner la mort" },
      { q: "Peine de base ?", a: "15 ans de réclusion criminelle" }
    ]
  },
  {
    id: 'menaces',
    name: 'Menaces',
    category: 'personnes',
    isPro: false,
    article: 'Art. 222-17 et 222-18 CP',
    definition: "La menace de commettre un crime ou un délit contre les personnes (violence, mort, destruction) de nature à impressionner.",
    elementMateriel: "Menace (paroles, écrits, gestes). Condition ou non d'une somme ou d'un avantage.",
    elementMoral: "Intention d'impressionner (ou d'obtenir une condition).",
    peineBase: "6 mois et 7 500 € (simple) ; 3 ans et 45 000 € (condition).",
    aggravantes: [
      "Menace de mort",
      "Réitération",
      "Sur mineur"
    ],
    infractionsVoisines: "Distinguer du chantage (menace de révélation). Menace = menace d'atteinte aux personnes ou aux biens.",
    flashcards: [
      { q: "Article des menaces ?", a: "Art. 222-17 et 222-18 CP" },
      { q: "Menace conditionnée ?", a: "Menace subordonnée à une condition (argent, avantage) → 3 ans et 45 000 €" },
      { q: "Peine menace simple ?", a: "6 mois et 7 500 €" }
    ]
  },
  {
    id: 'destruction-degradation',
    name: 'Destruction et dégradation',
    category: 'biens',
    isPro: false,
    article: 'Art. 322-1 CP',
    definition: "La destruction, la dégradation ou la détérioration d'un bien appartenant à autrui.",
    elementMateriel: "Acte de destruction, dégradation ou détérioration. Bien d'autrui.",
    elementMoral: "Intentionnel (sauf cas de mise en danger).",
    peineBase: "2 ans et 30 000 € (simple). 5 ans et 75 000 € si danger pour les personnes.",
    aggravantes: [
      "En réunion",
      "Préméditation",
      "Bien d'utilité publique"
    ],
    infractionsVoisines: "Distinguer de l'incendie (Art. 322-5). Destruction = atteinte à l'intégrité du bien.",
    flashcards: [
      { q: "Article destruction dégradation ?", a: "Art. 322-1 CP" },
      { q: "Peine de base ?", a: "2 ans et 30 000 €" },
      { q: "Si danger pour les personnes ?", a: "5 ans et 75 000 €" }
    ]
  },
  {
    id: 'conduite-alcool',
    name: 'Conduite sous l\'emprise d\'alcool',
    category: 'autres',
    isPro: false,
    article: 'Art. L234-1 Code de la route',
    definition: "Conduite d'un véhicule avec une alcoolémie égale ou supérieure à 0,25 mg/l d'air expiré (0,5 g/l de sang) ou en état d'ivresse manifeste.",
    elementMateriel: "Conduite + taux d'alcool (contrôle) ou ivresse manifeste.",
    elementMoral: "Conduite volontaire (pas besoin de preuve de conscience du taux).",
    peineBase: "2 ans d'emprisonnement et 4 500 € d'amende. Retrait de permis, stage.",
    aggravantes: [
      "Récidive",
      "Refus de contrôle",
      "Accident avec blessure ou mort"
    ],
    infractionsVoisines: "Distinguer conduite sous stupéfiants (Art. L235-1). Refus de souffler = délit distinct.",
    flashcards: [
      { q: "Taux d'alcool interdit (air) ?", a: "≥ 0,25 mg/l (0,5 g/l sang)" },
      { q: "Peine de base ?", a: "2 ans et 4 500 €" },
      { q: "Article ?", a: "Art. L234-1 Code de la route" }
    ]
  },
  { id: 'agression-sexuelle', name: 'Agression sexuelle', category: 'personnes', isPro: false, article: 'Art. 222-22 CP', definition: "Tout acte de nature sexuelle imposé à autrui par violence, contrainte, menace ou surprise.", elementMateriel: "Acte de nature sexuelle (hors pénétration) + violence, contrainte, menace ou surprise.", elementMoral: "Intentionnel.", peineBase: "5 ans et 75 000 € (15 ans si mineur < 15 ans).", aggravantes: ["Sur mineur", "En réunion"], infractionsVoisines: "Distinguer du viol (pénétration).", flashcards: [{ q: "Article agression sexuelle ?", a: "Art. 222-22 CP" }, { q: "Différence viol / agression sexuelle ?", a: "Viol = pénétration ; agression = autre acte sexuel" }] },
  { id: 'non-representation-enfant', name: 'Non-représentation d\'enfant', category: 'personnes', isPro: false, article: 'Art. 227-5 CP', definition: "Le fait de refuser de remettre un enfant mineur à la personne qui a le droit de le réclamer.", elementMateriel: "Refus de remettre l'enfant malgré décision de justice ou droit du parent.", elementMoral: "Intentionnel.", peineBase: "1 an et 15 000 €.", aggravantes: ["Déplacement à l'étranger"], infractionsVoisines: "Distinguer de la séquestration (privation de liberté).", flashcards: [{ q: "Article non-représentation ?", a: "Art. 227-5 CP" }, { q: "Peine ?", a: "1 an et 15 000 €" }] },
  { id: 'abandon-famille', name: 'Abandon de famille', category: 'personnes', isPro: false, article: 'Art. 227-3 CP', definition: "Le fait de ne pas exécuter une décision judiciaire ou convention homologuée imposant des obligations alimentaires.", elementMateriel: "Non-paiement des pensions (aliments, prestation compensatoire) pendant plus de 2 mois.", elementMoral: "Conscience de l'obligation.", peineBase: "2 ans et 15 000 €.", aggravantes: [], infractionsVoisines: "Délit continu. Distinct du recouvrement civil.", flashcards: [{ q: "Article abandon de famille ?", a: "Art. 227-3 CP" }, { q: "Délai pour caractériser ?", a: "Plus de 2 mois d'impayés" }] },
  { id: 'usurpation-identite', name: 'Usurpation d\'identité', category: 'autres', isPro: false, article: 'Art. 434-23 CP', definition: "Le fait de prendre le nom d'un tiers dans des circonstances qui ont déterminé ou auraient pu déterminer contre celui-ci des poursuites.", elementMateriel: "Usage du nom (ou identité) d'autrui dans un contexte pouvant entraîner des poursuites contre la victime.", elementMoral: "Intentionnel.", peineBase: "5 ans et 75 000 €.", aggravantes: [], infractionsVoisines: "Distinguer de l'usurpation à des fins frauduleuses (escroquerie).", flashcards: [{ q: "Article usurpation d'identité ?", a: "Art. 434-23 CP" }, { q: "Peine ?", a: "5 ans et 75 000 €" }] },
  { id: 'port-armes', name: 'Port et détention d\'armes', category: 'autres', isPro: false, article: 'Art. L317-1 et s. Code de la sécurité intérieure', definition: "Détention ou port d'armes sans autorisation (catégories A, B, C selon le cas).", elementMateriel: "Détention ou port d'une arme classée sans titre valable.", elementMoral: "Conscience de la nature de l'arme.", peineBase: "Variable : 1 à 10 ans selon catégorie et circonstances.", aggravantes: ["En réunion", "Trafic"], infractionsVoisines: "Distinguer fabrication, vente, acquisition. Régime des armes à feu.", flashcards: [{ q: "Arme catégorie A ?", a: "Interdites (sauf dérogation)" }, { q: "Port illégal arme ?", a: "Délit pénal, peine variable" }] },
  { id: 'violences-conjoint', name: 'Violences sur conjoint ou partenaire', category: 'personnes', isPro: false, article: 'Art. 222-33-1 CP', definition: "Violences commises par le conjoint, concubin ou partenaire de PACS.", elementMateriel: "Même élément que violences volontaires. Lien conjugal ou équivalent.", elementMoral: "Intentionnel.", peineBase: "Circonstance aggravante : 5 ans et 75 000 € (ITT ≤ 8 j) ; 10 ans et 150 000 € (ITT > 8 j).", aggravantes: ["Récidive", "Arme", "Mineur témoin"], infractionsVoisines: "Circonstance aggravante des violences (Art. 222-33-1).", flashcards: [{ q: "Article violences conjoint ?", a: "Art. 222-33-1 CP" }, { q: "Qualité de l'auteur ?", a: "Conjoint, concubin, partenaire PACS" }] },
  { id: 'harcèlement', name: 'Harcèlement', category: 'personnes', isPro: false, article: 'Art. 222-33-2 CP', definition: "Le fait de harceler une personne par des propos ou comportements répétés ayant pour objet ou effet une dégradation des conditions de vie.", elementMateriel: "Propos ou comportements répétés. Lien de causalité avec la dégradation.", elementMoral: "Intention de nuire ou conscience du caractère dégradant.", peineBase: "1 an et 15 000 € (3 ans si vulnérabilité ou suicide de la victime).", aggravantes: ["Suicide ou tentative de la victime"], infractionsVoisines: "Distinguer du harcèlement moral au travail (Code du travail). Cyberharcèlement.", flashcards: [{ q: "Article harcèlement ?", a: "Art. 222-33-2 CP" }, { q: "Élément matériel ?", a: "Propos ou comportements répétés" }] },
  { id: 'discrimination', name: 'Discrimination', category: 'nation', isPro: false, article: 'Art. 225-1 et s. CP', definition: "Toute distinction opérée entre les personnes à raison de leur origine, race, religion, sexe, orientation sexuelle, etc.", elementMateriel: "Distinction, refus, obstacle dans l'accès à un bien, un service, un emploi, etc.", elementMoral: "Intention de discriminer.", peineBase: "3 ans et 45 000 €.", aggravantes: ["Personne publique", "Refus de fourniture d'un bien ou service"], infractionsVoisines: "Provocation à la discrimination (Art. 24 Loi 1881).", flashcards: [{ q: "Article discrimination ?", a: "Art. 225-1 CP" }, { q: "Critères protégés ?", a: "Origine, race, religion, sexe, orientation, handicap..." }] },
  { id: 'apologie-terrorisme', name: 'Apologie du terrorisme', category: 'nation', isPro: false, article: 'Art. 421-2-5 CP', definition: "Le fait de provoquer directement à des actes de terrorisme ou d'en faire l'apologie.", elementMateriel: "Propos, écrits, images publics. Provocation ou apologie d'actes terroristes.", elementMoral: "Intention de provoquer ou faire l'apologie.", peineBase: "5 ans et 75 000 € (7 ans si diffusion en ligne).", aggravantes: ["Diffusion en ligne"], infractionsVoisines: "Distinguer de la provocation aux crimes (Art. 24 Loi 1881).", flashcards: [{ q: "Article apologie terrorisme ?", a: "Art. 421-2-5 CP" }, { q: "Peine si diffusion en ligne ?", a: "7 ans et 75 000 €" }] },
  { id: 'recel-marchandises', name: 'Recel de marchandises', category: 'biens', isPro: false, article: 'Art. 321-1 CP', definition: "Même définition que le recel : détention, transmission ou conversion d'un bien provenant d'un crime ou délit.", elementMateriel: "Identique au recel classique. Marchandises (vol à l'étalage, contrefaçon...).", elementMoral: "Connaissance de l'origine frauduleuse.", peineBase: "5 ans et 375 000 €.", aggravantes: ["Recel habituel", "Bande organisée"], infractionsVoisines: "Recel = infraction continue. Même régime que recel.", flashcards: [{ q: "Recel = infraction continue ?", a: "Oui, chaque jour de détention" }, { q: "Peine ?", a: "5 ans et 375 000 €" }] },
  { id: 'contrefacon', name: 'Contrefaçon', category: 'biens', isPro: false, article: 'Art. L335-2 et L335-3 CPI', definition: "Toute reproduction, représentation ou diffusion d'une œuvre de l'esprit sans autorisation des titulaires de droits.", elementMateriel: "Reproduction, exécution ou diffusion non autorisée. Œuvre protégée (droit d'auteur).", elementMoral: "Conscience de l'illicéité.", peineBase: "3 ans et 300 000 € (contrefaçon). 5 ans si bande organisée.", aggravantes: ["En bande organisée"], infractionsVoisines: "Contrefaçon de marque (Art. L716-1 CPI). Piratage.", flashcards: [{ q: "Article contrefaçon œuvre ?", a: "Art. L335-2 CPI" }, { q: "Peine ?", a: "3 ans et 300 000 €" }] },
  { id: 'travail-dissimule', name: 'Travail dissimulé', category: 'nation', isPro: false, article: 'Art. L8221-1 Code du travail', definition: "Le fait d'employer un salarié sans déclaration ou en dissimulant tout ou partie de son activité.", elementMateriel: "Emploi sans déclaration (URSSAF, etc.) ou dissimulation d'activité.", elementMoral: "Conscience de la dissimulation.", peineBase: "3 ans et 45 000 € (personne physique). 5 ans et 225 000 € (personne morale).", aggravantes: ["Vulnérabilité du salarié"], infractionsVoisines: "Marchandage, prêt de main-d'œuvre illicite.", flashcards: [{ q: "Article travail dissimulé ?", a: "Art. L8221-1 Code du travail" }, { q: "Peine personne morale ?", a: "5 ans et 225 000 €" }] },
  { id: 'entrave-ivg', name: 'Entrave à l\'IVG', category: 'personnes', isPro: false, article: 'Art. L2223-2 CP', definition: "Le fait d'empêcher ou de tenter d'empêcher une interruption volontaire de grossesse par des manœuvres, menaces ou tout autre moyen.", elementMateriel: "Manœuvres, menaces ou moyens destinés à empêcher l'IVG.", elementMoral: "Intention d'empêcher.", peineBase: "2 ans et 30 000 €.", aggravantes: [], infractionsVoisines: "Distinguer de l'information (liberté d'expression).", flashcards: [{ q: "Article entrave IVG ?", a: "Art. L2223-2 CP" }, { q: "Peine ?", a: "2 ans et 30 000 €" }] },
  { id: 'atteinte-vie-privee', name: 'Atteinte à la vie privée', category: 'personnes', isPro: false, article: 'Art. 226-1 CP', definition: "Le fait, au moyen d'un procédé quelconque, de porter atteinte à l'intimité de la vie privée d'autrui (enregistrement, fixation d'images).", elementMateriel: "Enregistrement, fixation ou transmission d'images ou de paroles sans consentement dans un lieu privé.", elementMoral: "Intentionnel.", peineBase: "1 an et 45 000 €.", aggravantes: ["Diffusion"], infractionsVoisines: "Diffusion d'images intimes (Art. 226-2-1). Secret des correspondances.", flashcards: [{ q: "Article atteinte vie privée ?", a: "Art. 226-1 CP" }, { q: "Lieu concerné ?", a: "Lieu privé (ou lieu public si captation de paroles privées)" }] },
  { id: 'delit-fuite', name: 'Délit de fuite', category: 'autres', isPro: false, article: 'Art. L231-1 Code de la route (accident avec blessure) ; 434-10 CP (après accident ayant causé mort ou blessure).', definition: "Le fait pour le conducteur impliqué dans un accident de ne pas s'arrêter et de ne pas s'identifier.", elementMateriel: "Accident (atteinte à autrui) + fuite (ne pas s'arrêter, ne pas s'identifier).", elementMoral: "Conscience de l'implication dans l'accident.", peineBase: "Jusqu'à 7 ans et 100 000 € si mort ; 5 ans et 75 000 € si blessures graves.", aggravantes: ["Alcool ou stupéfiants", "Sans permis"], infractionsVoisines: "Non-assistance à personne en péril (Art. 223-6) si pas de fuite mais abstention.", flashcards: [{ q: "Article délit de fuite (mort) ?", a: "Art. 434-10 CP" }, { q: "Peine si mort ?", a: "Jusqu'à 7 ans et 100 000 €" }] },
  { id: 'non-assistance', name: 'Non-assistance à personne en péril', category: 'personnes', isPro: false, article: 'Art. 223-6 CP', definition: "Le fait de s'abstenir volontairement de porter à une personne en péril l'assistance que l'on pouvait lui prêter sans risque pour soi ou pour autrui.", elementMateriel: "Abstention alors qu'assistance possible sans risque. Péril certain et actuel.", elementMoral: "Conscience du péril et abstention volontaire.", peineBase: "5 ans et 75 000 €.", aggravantes: [], infractionsVoisines: "Distinguer du délit de fuite (conducteur impliqué). Omission de porter secours.", flashcards: [{ q: "Article non-assistance ?", a: "Art. 223-6 CP" }, { q: "Condition ?", a: "Pouvoir prêter assistance sans risque pour soi ou autrui" }] },
  { id: 'usurpation-fonction', name: 'Usurpation de fonction', category: 'nation', isPro: false, article: 'Art. 433-11 CP', definition: "Le fait de prendre un titre, d'exercer une fonction ou de porter des insignes ou un costume permettant d'être confondu avec une personne dépositaire de l'autorité publique.", elementMateriel: "Prise de titre, exercice de fonction ou port d'uniforme/insignes sans qualité.", elementMoral: "Intention de se faire passer pour tel.", peineBase: "1 an et 15 000 €.", aggravantes: [], infractionsVoisines: "Distinguer de l'usurpation d'identité (nom d'un tiers).", flashcards: [{ q: "Article usurpation fonction ?", a: "Art. 433-11 CP" }, { q: "Peine ?", a: "1 an et 15 000 €" }] },
  { id: 'violation-domicile', name: 'Violation de domicile', category: 'personnes', isPro: false, article: 'Art. 432-8 CP (par personne publique) ; 226-4 CP (par particulier).', definition: "Le fait de s'introduire ou de se maintenir dans le domicile d'autrui contre le gré de celui-ci (hors cas prévus par la loi).", elementMateriel: "Introduction ou maintien dans un lieu privé (domicile) sans consentement.", elementMoral: "Intentionnel.", peineBase: "1 an et 15 000 € (particulier). 2 ans (personne publique).", aggravantes: ["Arme", "Violence"], infractionsVoisines: "Perquisition illégale. Inviolabilité du domicile (Art. 15 CPP).", flashcards: [{ q: "Article violation domicile (particulier) ?", a: "Art. 226-4 CP" }, { q: "Peine ?", a: "1 an et 15 000 €" }] },
  { id: 'diffamation', name: 'Diffamation', category: 'nation', isPro: false, article: 'Art. 29 Loi 1881', definition: "Toute allégation ou imputation d'un fait qui porte atteinte à l'honneur ou à la considération d'une personne.", elementMateriel: "Allégation ou imputation d'un fait précis. Publicité (public).", elementMoral: "Intention de nuire (présumée).", peineBase: "Amende 12 000 € (personne privée). 45 000 € si personne publique ou critères discriminatoires.", aggravantes: ["Racisme", "Personne publique"], infractionsVoisines: "Distinguer de l'injure (pas de fait précis). Prescription 3 mois (court délai).", flashcards: [{ q: "Article diffamation ?", a: "Art. 29 Loi 1881" }, { q: "Diffamation vs injure ?", a: "Diffamation = fait précis. Injure = expression outrageante" }] },
  { id: 'injure', name: 'Injure', category: 'nation', isPro: false, article: 'Art. 29 et 33 Loi 1881', definition: "Toute expression outrageante, termes de mépris ou invective ne renfermant l'imputation d'aucun fait.", elementMateriel: "Expression outrageante, méprisante ou invective. Publicité.", elementMoral: "Intention d'outrager.", peineBase: "Amende 12 000 € (38 000 € si publique ou discriminatoire).", aggravantes: ["Racisme", "Personne publique"], infractionsVoisines: "Pas de fait précis (sinon diffamation). Prescription 3 mois.", flashcards: [{ q: "Article injure ?", a: "Art. 33 Loi 1881" }, { q: "Prescription ?", a: "3 mois (court délai)" }] },
  { id: 'conduite-stupefiants', name: 'Conduite sous stupéfiants', category: 'nation', isPro: false, article: 'Art. L235-1 Code de la route', definition: "Conduite d'un véhicule après usage de substances classées comme stupéfiants (contrôle positif).", elementMateriel: "Conduite + présence de stupéfiant dans l'organisme (sang ou salive).", elementMoral: "Conduite volontaire.", peineBase: "2 ans et 4 500 €. Retrait de permis, stage.", aggravantes: ["Accident", "Refus de contrôle"], infractionsVoisines: "Distinguer usage simple (Art. 222-37). Refus de contrôle = délit distinct.", flashcards: [{ q: "Article conduite sous stupéfiants ?", a: "Art. L235-1 Code de la route" }, { q: "Peine ?", a: "2 ans et 4 500 €" }] }
];
