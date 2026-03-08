/**
 * OPJ EXAMEN — Cours Procédure Pénale (EP2-PP)
 * Source : CPP, Légifrance, annales OPJ
 */

window.LESSONS_PP = [
  {
    id: 'pp-1',
    title: 'Les modes d\'investigation : enquête de flagrance',
    duration: 16,
    isPro: false,
    tags: ['flagrance', 'pouvoirs', 'perquisition'],
    sections: [
      {
        heading: 'Définition de la flagrance (art. 53 CPP)',
        body: `**Crime ou délit flagrant** : l'infraction qui se commet actuellement, ou qui vient de se commettre.

**Est assimilé à la flagrance** :
1. Quand, **dans un temps très voisin** de l'action, la personne suspectée est **poursuivie par la clameur publique**
2. Quand elle est **trouvée en possession** d'objets, armes, instruments ou papiers faisant présumer qu'elle est auteur ou complice

**Conditions pour ouvrir une enquête de flagrance :**
- Le crime ou délit **doit être flagrant** au sens de l'art. 53
- Il doit être **puni d'une peine d'emprisonnement**

**Durée de l'enquête de flagrance** : **8 jours** (renouvelable 8 jours sur autorisation du PR pour crime/délit organisé).

**⚠️ L'OPJ doit informer le Procureur de la République immédiatement (dès l'ouverture de la flagrance).** Art. 54 CPP.`
      },
      {
        heading: 'Pouvoirs de l\'OPJ en flagrance : les personnes',
        body: `**Garde à vue** (art. 63 CPP) :
- Possible immédiatement en flagrance
- Durée standard : 24 h + 24 h sur autorisation du PR (si infraction ≥ 1 an)

**Audition libre** (art. 61-1 CPP) :
- Personne entendue librement (pas de contrainte)
- Doit être informée de ses droits (droit au silence, assistance avocat si soupçons)

**Transport sur les lieux** (art. 54 al. 3 CPP) :
- L'OPJ se transporte sur les lieux sans délai
- Peut interdire à toute personne de s'éloigner jusqu'à clôture des opérations (max 4 heures)

**Relevé d'identité** (art. 78-3 CPP) :
- Si impossibilité de relever l'identité → rétention max **4 heures** jusqu'à 2 h pour les mineurs`
      },
      {
        heading: 'Pouvoirs de l\'OPJ en flagrance : les lieux et les biens',
        body: `**Perquisition en flagrance** (art. 56 CPP) :
- Sans autorisation judiciaire préalable
- Possible de 6 h à 21 h (sauf exceptions : si en cours au-delà de 21 h, peut continuer)
- Présence d'un **témoin** non suspect requis (ou représentant légal si mineur)
- PV obligatoire

**Saisie** (art. 56 CPP) :
- L'OPJ saisit les objets et documents utiles à la manifestation de la vérité
- Les pièces à conviction sont inventoriées et placées sous scellés

**Réquisitions téléphoniques** (art. 60-1 CPP) :
- L'OPJ peut requérir tout opérateur pour communiquer des informations utiles à l'enquête sans autorisation judiciaire (sauf données de contenu)

**Recours à un expert** (art. 60 CPP) :
- L'OPJ peut recourir à tout expert nécessaire

**⚠️ Différence flagrance / préliminaire** : en préliminaire, la perquisition requiert l'accord de la personne ou une autorisation du JLD.`
      },
      {
        heading: 'Interceptions téléphoniques et accès aux données numériques',
        body: `**Écoutes téléphoniques (art. 100 CPP)** :
- Réservées à l'instruction (JI qui ordonne)
- Pour crimes ou délits punis d'au moins **2 ans** d'emprisonnement

**Captation d'images et sons (art. 706-96 CPP)** :
- Sonorisations et fixations d'images dans des lieux privés
- Autorisée par le JI pour les crimes et délits en bande organisée

**Réquisitions judiciaires (art. 60-1, 77-1-1 et 60-2 CPP)** :
- Données de connexion (réquisitions de base) : sans autorisation judiciaire spéciale
- Contenu des communications : autorisation du JLD ou JI requise

**Accès à distance à un système informatique (art. 706-102-1 CPP)** :
- Autorisation du JI obligatoire
- Pour crimes et délits en bande organisée`
      }
    ],
    quiz: [
      { q: 'Quelle est la durée maximale d\'une enquête de flagrance de base ?', a: '8 jours (renouvelables 8 jours si crime/délit organisé sur autorisation du PR)' },
      { q: 'En enquête de flagrance, une perquisition nécessite-t-elle une autorisation judiciaire ?', a: 'Non (art. 56 CPP), mais doit être réalisée de 6h à 21h en présence d\'un témoin non suspect' },
      { q: 'Combien de temps l\'OPJ peut-il retenir une personne pour vérification d\'identité en flagrance ?', a: 'Maximum 4 heures (art. 78-3 CPP)' }
    ]
  },
  {
    id: 'pp-2',
    title: 'L\'enquête préliminaire',
    duration: 12,
    isPro: false,
    tags: ['préliminaire', 'enquête', 'pouvoirs limités'],
    sections: [
      {
        heading: 'Caractéristiques et déclenchement',
        body: `**Enquête préliminaire (art. 75 à 78 CPP)** :
- Mode d'enquête de **droit commun**, applicable en dehors de la flagrance et de l'instruction
- Peut être déclenchée :
  - À **l'initiative de l'OPJ** (en dehors de toute instruction)
  - Sur **instructions du PR**
  - À la suite d'une **plainte ou d'un signalement**

**Pouvoirs de droit commun** : l'OPJ dispose de pouvoirs plus **limités** qu'en flagrance pour les mesures coercitives.

**Durée** : pas de durée légale maximale (mais le PR peut clore à tout moment). En pratique, limitée par les délais de prescription.

**⚠️ Pas de délai automatique** : l'enquête préliminaire peut durer plusieurs mois ou années.`
      },
      {
        heading: 'Auditions et gardes à vue en préliminaire',
        body: `**Audition libre** (art. 61-1 CPP) :
- Toute personne peut être entendue librement (sans contrainte)
- Si soupçons : notification des droits (ne pas se témoigner contre soi, droit au silence, avocat)

**Garde à vue** (art. 77 CPP) :
- Si nécessité prévue à l'art. 62-2 CPP (infraction punissable d'emprisonnement)
- Durée : 24 h + 24 h sur autorisation du PR (si ≥ 1 an d'emprisonnement)
- Mêmes droits qu'en flagrance (avocat dès la 1re heure, médecin, proche prévenu)

**Convocation** (art. 78 CPP) :
- L'OPJ peut convoquer tout individu dont l'audition lui paraît utile
- La personne est **obligée de se présenter** sous peine d'amende (contravention)
- L'OPJ peut, avec accord du PR, recourir à la force publique en cas de refus`
      },
      {
        heading: 'Perquisitions et saisies en préliminaire',
        body: `**Principe** (art. 76 CPP) : les perquisitions et saisies ne peuvent être effectuées sans l'**assentiment de la personne** chez qui elles se déroulent.

**Exception 1 — Autorisation du JLD** (art. 76 al. 4 CPP) :
- Si la personne refuse son assentiment, l'OPJ peut demander au **JLD** l'autorisation de procéder à la perquisition
- Applicable pour les infractions punies d'au moins **5 ans** d'emprisonnement

**Exception 2 — Personnes vulnérables** :
- Si la perquisition a pour objet de rechercher une infraction commise sur une personne vulnérable, pas d'assentiment requis dans certains cas

**Assentiment** :
- Doit être donné de manière **explicite** et **libre** (pas obtenu sous contrainte)
- Constaté par PV et signé par la personne
- Peut être retiré à tout moment (doit cesser)

**⚠️ Si pas d'assentiment + pas d'autorisation JLD → nullité de la perquisition.**`
      },
      {
        heading: 'Réquisitions en préliminaire',
        body: `**Réquisitions de données (art. 77-1-1 CPP)** :
- L'OPJ peut requérir toute personne morale, tout agent, de remettre des documents utiles
- **Sans autorisation judiciaire** pour les données de connexion et données d'identification

**Réquisitions aux opérateurs téléphoniques** :
- Données de trafic et localisation : requiert une autorisation du PR (art. 77-1-1 al. 2 pour les données de localisation en temps réel : JLD)
- **⚠️ Données de contenu** (SMS, emails) : nécessite toujours une autorisation judiciaire (JLD ou JI)

**Analyses et expertises** (art. 77-1 CPP) :
- L'OPJ peut requérir tout expert ou analyste
- Rapport remis à l'OPJ sous le contrôle du PR`
      }
    ],
    quiz: [
      { q: 'En enquête préliminaire, que faut-il pour perquisitionner chez une personne ?', a: 'Son assentiment explicite (art. 76 CPP) OU une autorisation du JLD si infraction ≥ 5 ans' },
      { q: 'Quelle est la durée maximale légale d\'une enquête préliminaire ?', a: 'Aucune durée maximale légale (mais limitée en pratique par la prescription)' },
      { q: 'Qu\'est-ce que l\'audition libre en enquête préliminaire ?', a: 'L\'audition d\'une personne sans contrainte (art. 61-1 CPP), avec notification de ses droits si elle est soupçonnée' }
    ]
  },
  {
    id: 'pp-3',
    title: 'L\'instruction préparatoire',
    duration: 14,
    isPro: false,
    tags: ['instruction', 'juge d\'instruction', 'JI', 'mise en examen'],
    sections: [
      {
        heading: 'Ouverture de l\'information judiciaire',
        body: `**Saisine du JI** (art. 50 CPP) :
- Par **réquisitoire introductif** du Procureur de la République
- Par **plainte avec constitution de partie civile (CPC)** de la victime (si le PR a préalablement classé sans suite ou n'a pas agi dans les 3 mois)
- Uniquement pour les **crimes** et certains **délits** complexes

**Le JI instruit "à charge ET à décharge"** (art. 81 CPP) :
- Il recherche toutes les preuves, favorables ou défavorables au mis en cause
- Principe du contradictoire

**Commission rogatoire** (art. 151 CPP) :
- Le JI peut déléguer certains pouvoirs à un OPJ
- L'OPJ agit dans les limites de la CR (ne peut faire que ce que la CR autorise)
- Pouvoirs élargis : perquisition, saisies, auditions, GAV`
      },
      {
        heading: 'La mise en examen et le statut des personnes',
        body: `**Témoin assisté** : personne nommément visée dans la plainte ou par la partie civile, mais non mise en cause ; bénéficie de droits limités (droit à un avocat, ne peut être entendu sous serment de témoin).

**Mise en examen (art. 80-1 CPP)** :
- Lorsqu'il existe des **indices graves ou concordants** rendant vraisemblable que la personne ait commis les faits
- La personne est alors **informée de ses droits** (avocat, droit au silence, accès au dossier)
- Conditions : le JI doit avoir préalablement entendu la personne en qualité de témoin assisté (sauf urgence)

**⚠️ Mise en examen ≠ inculpation** (l'ancien terme). L'inculpation a disparu avec la loi du 4 janvier 1993.`
      },
      {
        heading: 'La détention provisoire (art. 143-1 et s. CPP)',
        body: `**Décision** : le **JLD** statue sur la détention provisoire sur réquisitions du PR (pas le JI directement).

**Conditions de fond** :
1. Infraction punie d'au moins **3 ans** d'emprisonnement (délits)
2. **Indices graves et concordants** (même critère que mise en examen)
3. Détention absolument nécessaire à l'un des 5 objectifs de l'art. 144 CPP (conservation des preuves, ordre public, protection de la victime…)

**Durée maximale** :
- Délits : 4 mois renouvelable (max 2 ans selon gravité)
- Crimes : 1 an renouvelable (max 4 ans ou plus selon gravité)

**Alternatives** :
- **Contrôle judiciaire (CJ)** (art. 138 CPP) : mesures de surveillance/interdictions
- **ARSE** (Assignation à Résidence avec Surveillance Électronique) : bracelet électronique`
      },
      {
        heading: 'Le déroulement et la clôture de l\'instruction',
        body: `**Ordonnance de renvoi** (art. 176 et s.) :
- Si charges suffisantes → renvoi devant la juridiction de jugement
- **Ordonnance de renvoi** → tribunal correctionnel (délits)
- **Arrêt de mise en accusation** (chambre de l'instruction) → Cour d'assises (crimes)

**Ordonnance de non-lieu** (art. 177 CPP) :
- Insuffisance de charges → non-lieu
- La personne mise en examen est libérée et les poursuites abandonnées
- Ne constitue pas une condamnation (≠ relaxe/acquittement) mais protège contre de nouvelles poursuites pour les mêmes faits sauf charge nouvelle

**Délai raisonnable** (art. 6 CEDH) :
- Le JI doit instruire dans un "délai raisonnable"
- En cas de dépassement, la chambre de l'instruction peut être saisie`
      }
    ],
    quiz: [
      { q: 'Quelle est la différence entre un témoin assisté et une personne mise en examen ?', a: 'Le témoin assisté est nommément visé mais sans indices graves contre lui ; la mise en examen intervient quand il existe des indices graves ou concordants (art. 80-1 CPP)' },
      { q: 'Qui décide du placement en détention provisoire ?', a: 'Le Juge des libertés et de la détention (JLD), sur réquisitions du PR' },
      { q: 'Qu\'est-ce qu\'une commission rogatoire ?', a: 'Une délégation des pouvoirs du JI à un OPJ pour accomplir des actes d\'instruction précis (art. 151 CPP)' }
    ]
  },
  {
    id: 'pp-4',
    title: 'Le jugement et les voies de recours',
    duration: 12,
    isPro: false,
    tags: ['jugement', 'appel', 'cassation', 'procédures'],
    sections: [
      {
        heading: 'Les modes de comparution',
        body: `**Comparution immédiate (CI)** (art. 395-397-7 CPP) :
- Le prévenu est présenté directement au tribunal après la GAV
- Possible si délit puni d'au moins **1 an** d'emprisonnement (ou 6 mois si pris en flagrance)
- Le prévenu peut demander un délai (max 6 semaines) pour préparer sa défense

**Convocation par officier de police judiciaire (COPJ)** (art. 390-1 CPP) :
- L'OPJ remet au prévenu une convocation à comparaître devant le tribunal
- Délai entre 10 jours et 2 mois

**Citation directe** (art. 388 CPP) :
- Par voie d'huissier, à la requête du PR ou de la partie civile

**CRPC — Comparution sur reconnaissance préalable de culpabilité** (art. 495-7 et s. CPP) :
- Le PR propose une peine (si l'auteur reconnaît les faits)
- Accord de l'auteur + homologation par le tribunal
- Ne peut pas concerner les crimes ni certains délits graves`
      },
      {
        heading: 'Les voies de recours',
        body: `**Appel** :
- Délai : **10 jours** à compter du jugement (pour le prévenu, le PR, la partie civile)
- Pour les arrêts de Cour d'assises : 10 jours
- Effet suspensif : le jugement n'est pas exécuté pendant le délai d'appel (sauf mandat de dépôt)

**Cassation** :
- Délai : **5 jours** à compter de l'arrêt d'appel (pour jugements correctionnels)
- Uniquement pour violation de la loi (pas rejugement sur le fond)
- Arrêt de cassation → renvoi devant une autre cour d'appel

**Opposition** (art. 489 CPP) :
- Contre les jugements par défaut
- Délai : **10 jours** après signification du jugement

**Révision** (art. 622 CPP) :
- Remise en question d'une décision de condamnation définitive
- Si nouvelles preuves d'innocence
- Décidée par la commission nationale de révision des condamnations pénales`
      },
      {
        heading: 'L\'exécution des décisions pénales',
        body: `**Le Juge de l'application des peines (JAP)** :
- Contrôle l'exécution des peines
- Décide des aménagements (libération conditionnelle, semi-liberté, DDSE…)
- Vérifie le respect des conditions du sursis probatoire

**La partie civile** :
- Peut se constituer partie civile pour obtenir réparation du préjudice
- Peut recourir devant les juridictions civiles si le pénal a rejeté ses demandes
- Principe : "Le pénal tient le civil en l'état" → la décision pénale s'impose au juge civil`
      }
    ],
    quiz: [
      { q: 'Quel est le délai pour faire appel d\'une décision correctionnelle ?', a: '10 jours à compter du jugement' },
      { q: 'Qu\'est-ce que la CRPC ?', a: 'La Comparution sur Reconnaissance Préalable de Culpabilité — procédure par laquelle le PR propose une peine que le prévenu accepte, homologuée par le tribunal' },
      { q: 'Quel est le principe "le pénal tient le civil en l\'état" ?', a: 'La décision pénale définitive s\'impose au juge civil sur les mêmes faits (la juridiction civile doit attendre l\'issue pénale)' }
    ]
  },
  {
    id: 'pp-5',
    title: 'Les procédures spéciales : mineurs, crime organisé, terrorisme',
    duration: 16,
    isPro: true,
    tags: ['mineurs', 'CJPM', 'crime organisé', 'terrorisme'],
    sections: [
      {
        heading: 'La justice des mineurs (CJPM 2021)',
        body: `**Code de la justice pénale des mineurs (CJPM)** entré en vigueur le **30 septembre 2021** (ordonnance du 11 septembre 2019).

**Présomption d'irresponsabilité pénale** :
- Mineur de **13 ans** : irresponsabilité pénale présumée (irréfragable)
- Mineur de **13 à 16 ans** : responsabilité atténuée, présomption réfragable
- Mineur de **16 à 18 ans** : atténuation de peine possible, mais majorité pénale possible

**Mesures éducatives** : prioritaires sur les sanctions pénales
- Avertissement judiciaire, confiscation, interdiction de paraître…
- Suivi par le juge des enfants

**Sanctions** :
- Peine maximale = moitié de la peine adulte (principe de l'atténuation)
- Exception : mineurs de 16 à 18 ans pour crimes particulièrement graves (majorité pénale)

**Juridictions spécialisées** :
- Juge des enfants (JE) → mesures éducatives
- Tribunal pour enfants (TPE) → délits graves et certains crimes
- Cour d'assises des mineurs → crimes commis par mineurs de 16+ ans`
      },
      {
        heading: 'La GAV des mineurs',
        body: `**Mineur < 13 ans** : **interdit** en principe ; rétention de 12 heures maximum dans des cas très exceptionnels (crime ou délit puni d'au moins 5 ans, contrôle du PR).

**Mineur 13 à 16 ans** :
- GAV possible si infraction punie d'au moins **5 ans** d'emprisonnement
- Durée : **24 h** (+ 24 h si ≥ 5 ans et nécessité + décision du PR)

**Mineur 16 à 18 ans** :
- Régime de droit commun : **24 h + 24 h** (si ≥ 1 an)
- Régime dérogatoire : jusqu'à **96 h** (crime organisé, terrorisme)

**Droits supplémentaires** :
- **Information immédiate** des représentants légaux (ou pupilles de l'État pour les sans représentants légaux)
- Examen médical (obligatoire pour tout mineur)
- Avocat dès le début (droit renforcé)

**Conditions de détention** : le mineur ne peut être placé dans les mêmes cellules que les adultes.`
      },
      {
        heading: 'Crime organisé et bande organisée',
        body: `**Définition** (art. 132-71 CP) : "la bande organisée" désigne tout groupement formé ou toute entente établie en vue de la préparation d'une ou plusieurs infractions.

**Régime dérogatoire** :
- GAV : **48 h + 48 h = 96 h** (autorisation du JLD ou JI)
- Délais d'accès à l'avocat différés : jusqu'à **48 h** (sur autorisation du PR ou JI)
- Perquisitions possibles **24h/24** (si autorisation judiciaire)
- Interceptions téléphoniques facilitées
- Agents spéciaux et infiltration (art. 706-81 et s. CPP)

**JIRS** (Juridictions Inter-Régionales Spécialisées) :
- 8 JIRS en France + Paris
- Compétentes pour les affaires complexes de crime organisé, terrorisme, criminalité économique

**Parquet National Antiterroriste (PNAT)** :
- Créé en 2019 (ex-section anti-terroriste du parquet de Paris)
- Compétent pour toutes les affaires de terrorisme en France`
      },
      {
        heading: 'Le terrorisme',
        body: `**Définition** (art. 421-1 CP) : actes commis individuellement ou en bande organisée en relation avec une entreprise individuelle ou collective ayant pour but de troubler gravement l'ordre public par l'intimidation ou la terreur.

**Infractions terroristes** :
- Atteintes à la vie, à l'intégrité des personnes, détentions, séquestrations, etc. qualifiées terroristes
- Financement du terrorisme (art. 421-2-2)
- Association de malfaiteurs en relation avec une entreprise terroriste (AMRT) (art. 421-2-1)

**Prescription** : 
- 30 ans pour les crimes terroristes (au lieu de 20)
- 20 ans pour les délits terroristes (au lieu de 6)

**GAV en matière terroriste** :
- Durée maximale : **144 h (6 jours)** sur décision du JLD
- Accès à l'avocat différé jusqu'à **72 h** (sur autorisation du JLD)

**⚠️ SDAT** (Sous-Direction Anti-Terroriste) : service de police nationale spécialisé dans la lutte antiterroriste.`
      }
    ],
    quiz: [
      { q: 'Depuis quel texte et quelle date la justice des mineurs est-elle réformée ?', a: 'Le Code de la justice pénale des mineurs (CJPM), en vigueur depuis le 30 septembre 2021' },
      { q: 'Quelle est la durée maximale de GAV pour une infraction de terrorisme ?', a: '144 heures (6 jours) avec autorisation du JLD' },
      { q: 'À quel âge un mineur est-il présumé irréfragablement irresponsable ?', a: 'Avant 13 ans (présomption irréfragable d\'irresponsabilité pénale)' }
    ]
  }
];
