/**
 * OPJ EXAMEN — 8 scénarios de procédure complets (cartouches)
 * Chaque scénario : id, title, epreuve, isPro, difficulty, description, actes[]
 */

window.CARTOUCHES = [
  {
    id: 'flagrance_vol_violence',
    title: 'Flagrance — Vol avec violence en réunion',
    epreuve: 2,
    isPro: false,
    difficulty: 2,
    description: "Interpellation en flagrance de 3 individus après un vol avec violence sur voie publique.",
    actes: [
      {
        numero: 1,
        nature: 'PV de transport sur les lieux',
        auteur: 'OPJ',
        delai: 'T+0',
        article: 'Art. 54 CPP',
        objet: 'Constatations en flagrance',
        explication: "Premier acte obligatoire en flagrance. L'OPJ se transporte sur les lieux et dresse PV. Délai : immédiat.",
        siOublie: "Sans ce PV, toute la procédure peut être annulée pour défaut de constatation."
      },
      {
        numero: 2,
        nature: 'Avis au Procureur de la République',
        auteur: 'OPJ',
        delai: 'T+0 immédiat',
        article: 'Art. 54 al. 2 CPP',
        objet: 'Information immédiate du parquet',
        explication: "L'OPJ informe immédiatement le procureur de la République dès la constatation du crime ou délit flagrant.",
        siOublie: 'Nullité possible des actes — le procureur doit être informé sans délai.'
      },
      {
        numero: 3,
        nature: 'Placement en GAV',
        auteur: 'OPJ',
        delai: 'T+0',
        article: 'Art. 62-2 CPP',
        objet: 'Garde à vue en flagrance',
        explication: "Décision écrite de placement en GAV, durée initiale 24 h (art. 63 CPP). L'OPJ notifie les droits.",
        siOublie: 'Irregularité de la GAV ; nullité des actes ultérieurs.'
      },
      {
        numero: 4,
        nature: 'Notification des droits',
        auteur: 'OPJ',
        delai: 'Dès le placement',
        article: 'Art. 63-1 CPP',
        objet: 'Droits du gardé à vue',
        explication: "Notification immédiate : droit au silence, à un avocat, à prévenir un proche, à un médecin, durée de la GAV.",
        siOublie: 'Nullité des procès-verbaux d\'audition et possible annulation de la GAV.'
      },
      {
        numero: 5,
        nature: 'Audition libre ou sous GAV',
        auteur: 'OPJ',
        delai: 'Pendant la GAV',
        article: 'Art. 62-1 et 64 CPP',
        objet: 'Interrogatoire',
        explication: "Première audition après notification des droits. Procès-verbal d'audition avec mention des droits.",
        siOublie: 'Témoignage ou aveux inutilisables.'
      },
      {
        numero: 6,
        nature: 'Réquisitions prolongation GAV 24 h',
        auteur: 'Procureur',
        delai: 'Avant fin des 24 h',
        article: 'Art. 63 CPP',
        objet: 'Prolongation première tranche',
        explication: "Le procureur peut prolonger la GAV de 24 h (total 48 h). Réquisitions écrites, décision motivée.",
        siOublie: 'Libération obligatoire à l\'issue des 24 h.'
      }
    ]
  },
  {
    id: 'gav_classique_24h',
    title: 'GAV classique — Premier délai 24 h',
    epreuve: 2,
    isPro: false,
    difficulty: 1,
    description: 'Mise en GAV après convocation ; respect des délais 24 h / 48 h.',
    actes: [
      { numero: 1, nature: 'Convocation de la personne', auteur: 'OPJ', delai: 'T-0', article: 'Art. 61-1 CPP', objet: 'Convocation', explication: "Convocation par LR/AR ou remise contre signature. Mention du statut (témoin assisté, suspect).", siOublie: "Irregularité si la personne n'a pas été informée du cadre." },
      { numero: 2, nature: 'Décision de placement en GAV', auteur: 'OPJ', delai: 'T+0', article: 'Art. 62-2 CPP', objet: 'Placement', explication: "Décision écrite, motif (enquête en cours sur...), durée initiale 24 h.", siOublie: "GAV irrégulière." },
      { numero: 3, nature: 'Notification des droits (art. 63-1)', auteur: 'OPJ', delai: 'Dès placement', article: 'Art. 63-1 CPP', objet: 'Droits', explication: "Droits notifiés : avocat, silence, prévenir, médecin, durée.", siOublie: "Nullité des auditions." },
      { numero: 4, nature: 'Avis au Procureur', auteur: 'OPJ', delai: 'Sans délai', article: 'Art. 63 al. 3 CPP', objet: 'Information parquet', explication: "Information immédiate du PR du placement en GAV.", siOublie: "Irregularité procédurale." },
      { numero: 5, nature: 'Prolongation 24 h (réquisitions PR)', auteur: 'Procureur', delai: 'Avant 24 h', article: 'Art. 63 CPP', objet: 'Prolongation', explication: "Réquisitions écrites pour prolonger de 24 h (total 48 h).", siOublie: "Libération à 24 h." }
    ]
  },
  {
    id: 'perquisition_domicile',
    title: 'Perquisition au domicile',
    epreuve: 2,
    isPro: false,
    difficulty: 2,
    description: 'Perquisition domiciliaire avec consentement ou autorisation du juge.',
    actes: [
      { numero: 1, nature: 'Demande d\'autorisation au JLD (si refus consentement)', auteur: 'OPJ', delai: 'Avant perquisition', article: 'Art. 56 CPP', objet: 'Autorisation judiciaire', explication: "Si la personne refuse ou absent : requête au JLD pour autoriser la perquisition.", siOublie: "Perquisition nulle si pas de consentement ni autorisation." },
      { numero: 2, nature: 'Information du PR (perquisition consentie)', auteur: 'OPJ', delai: 'Avant ou pendant', article: 'Art. 56 CPP', objet: 'Information parquet', explication: "En cas de consentement, information préalable du procureur.", siOublie: "Irregularité." },
      { numero: 3, nature: 'PV de perquisition', auteur: 'OPJ', delai: 'Pendant', article: 'Art. 57 CPP', objet: 'Constatations', explication: "Procès-verbal décrivant les lieux, l'heure, les personnes, les pièces visitées et les saisies.", siOublie: "Saisies contestables." },
      { numero: 4, nature: 'Remise d\'une copie du PV', auteur: 'OPJ', delai: 'À l\'issue', article: 'Art. 57 CPP', objet: 'Droit de la personne', explication: "Copie du PV remise à l'occupant ou à son représentant.", siOublie: "Nullité possible des saisies." }
    ]
  },
  {
    id: 'audition_libre',
    title: 'Audition libre (témoin / suspect)',
    epreuve: 2,
    isPro: false,
    difficulty: 1,
    description: 'Audition d\'une personne convoquée en audition libre.',
    actes: [
      { numero: 1, nature: 'Convocation (LR/AR ou remise)', auteur: 'OPJ / APJ', delai: 'J-0', article: 'Art. 61-1 CPP', objet: 'Convocation', explication: "Convocation avec mention du statut (témoin, témoin assisté) et des droits.", siOublie: "Audition contestable." },
      { numero: 2, nature: 'Information sur le déroulement', auteur: 'OPJ', delai: 'Début audition', article: 'Art. 61-1 CPP', objet: 'Droits', explication: "Rappel des droits : ne pas s'incriminer, avocat possible, enregistrement si crime.", siOublie: "Vice de procédure." },
      { numero: 3, nature: 'PV d\'audition', auteur: 'OPJ', delai: 'Pendant', article: 'Art. 64 CPP', objet: 'Procès-verbal', explication: "PV avec identité, date/heure, rappel des droits, déclarations. Lecture et signature.", siOublie: "Déclarations inutilisables." }
    ]
  },
  {
    id: 'flagrance_stupefiants',
    title: 'Flagrance — Stupéfiants',
    epreuve: 2,
    isPro: false,
    difficulty: 2,
    description: 'Interpellation pour détention/usage de stupéfiants en flagrance.',
    actes: [
      { numero: 1, nature: 'Constatation flagrance (PV ou PVR)', auteur: 'OPJ / APJ', delai: 'T+0', article: 'Art. 54 CPP', objet: 'Constatations', explication: "Constatation des faits (détention, usage) et transport sur les lieux si besoin.", siOublie: "Procédure annulable." },
      { numero: 2, nature: 'Avis au Procureur', auteur: 'OPJ', delai: 'Immédiat', article: 'Art. 54 al. 2 CPP', objet: 'Information parquet', explication: "Information immédiate du PR.", siOublie: "Nullité possible." },
      { numero: 3, nature: 'Placement en GAV', auteur: 'OPJ', delai: 'T+0', article: 'Art. 62-2 CPP', objet: 'GAV', explication: "Décision écrite de placement, durée 24 h.", siOublie: "GAV irrégulière." },
      { numero: 4, nature: 'Notification des droits', auteur: 'OPJ', delai: 'Dès placement', article: 'Art. 63-1 CPP', objet: 'Droits', explication: "Droits notifiés (avocat, silence, etc.).", siOublie: "Nullité auditions." },
      { numero: 5, nature: 'Saisie et analyse (réquisition médecin si besoin)', auteur: 'OPJ', delai: 'Pendant GAV', article: 'Art. 56-1 et s. CPP', objet: 'Preuves', explication: "Saisie des produits, réquisition pour analyse (laboratoire).", siOublie: "Preuve inadmissible." }
    ]
  },
  {
    id: 'controle_identite',
    title: 'Contrôle d\'identité',
    epreuve: 2,
    isPro: false,
    difficulty: 1,
    description: 'Contrôle d\'identité (art. 78-2 ou 78-2-2 CPP).',
    actes: [
      { numero: 1, nature: 'Vérification d\'identité (sur place)', auteur: 'APJ / OPJ', delai: 'Sur place', article: 'Art. 78-2 CPP', objet: 'Vérification', explication: "Contrôle sur place : justification du motif (prévention trouble, enquête, etc.).", siOublie: "Contrôle illégal." },
      { numero: 2, nature: 'Retenue 4 h max si impossibilité d\'établir identité', auteur: 'OPJ', delai: '4 h max', article: 'Art. 78-3 CPP', objet: 'Retenue', explication: "Si impossibilité d'établir l'identité sur place : retenue pour vérification, 4 h max, avis PR.", siOublie: "Détention arbitraire." }
    ]
  },
  {
    id: 'retention_gav',
    title: 'Rétention et GAV — Délais 24/48/72/96 h',
    epreuve: 2,
    isPro: false,
    difficulty: 2,
    description: 'Rappel des délais de GAV (classique, CO, terrorisme).',
    actes: [
      { numero: 1, nature: 'Décision placement GAV', auteur: 'OPJ', delai: 'T0', article: 'Art. 62-2 CPP', objet: 'Placement', explication: "Début de la GAV, durée initiale 24 h.", siOublie: "—" },
      { numero: 2, nature: 'Prolongation 24 h (total 48 h)', auteur: 'Procureur', delai: 'Avant 24 h', article: 'Art. 63 CPP', objet: 'Prolongation', explication: "Réquisitions écrites du PR.", siOublie: "Libération à 24 h." },
      { numero: 3, nature: 'Prolongation 24 h (total 72 h) — crime', auteur: 'Procureur', delai: 'Avant 48 h', article: 'Art. 63-2 CPP', objet: 'Prolongation crime', explication: "Pour crime puni ≥ 5 ans : une nouvelle prolongation possible (72 h total).", siOublie: "Libération à 48 h." },
      { numero: 4, nature: 'Prolongation 24 h (total 96 h) — CO/terrorisme', auteur: 'JLD', delai: 'Avant 72 h', article: 'Art. 706-88 et 706-73 CPP', objet: 'Prolongation CO/terrorisme', explication: "En matière de criminalité organisée ou terrorisme : JLD peut prolonger jusqu'à 96 h voire plus.", siOublie: "Libération à 72 h." }
    ]
  },
  {
    id: 'convocation_officier',
    title: 'Convocation devant officier de police judiciaire',
    epreuve: 2,
    isPro: true,
    difficulty: 3,
    description: 'Convocation formelle d\'un suspect devant l\'OPJ (hors GAV).',
    actes: [
      { numero: 1, nature: 'Convocation écrite (LR/AR)', auteur: 'OPJ', delai: 'J-0', article: 'Art. 61-1 CPP', objet: 'Convocation', explication: "Convocation avec mention du statut (témoin assisté si indices), lieu, date, heure.", siOublie: "Audition contestable." },
      { numero: 2, nature: 'Information des droits (témoin assisté)', auteur: 'OPJ', delai: 'Dès arrivée', article: 'Art. 61-1 et 113-4 CPP', objet: 'Droits', explication: "Droit à un avocat, à ne pas s'incriminer, à être assisté.", siOublie: "Nullité." },
      { numero: 3, nature: 'PV d\'audition libre', auteur: 'OPJ', delai: 'Pendant', article: 'Art. 64 CPP', objet: 'Procès-verbal', explication: "PV d'audition avec lecture et signature.", siOublie: "Déclarations inutilisables." },
      { numero: 4, nature: 'Décision de placement en GAV (si nécessaire)', auteur: 'OPJ', delai: 'Si motifs', article: 'Art. 62-2 CPP', objet: 'Passage en GAV', explication: "Si à l'issue de l'audition les indices s'aggravent : décision de placement en GAV.", siOublie: "—" }
    ]
  }
];
