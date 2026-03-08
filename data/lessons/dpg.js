/**
 * OPJ EXAMEN — Cours Droit Pénal Général (EP1-DPG)
 * Source : Légifrance, Code pénal, Code de procédure pénale
 */

window.LESSONS_DPG = [
  {
    id: 'dpg-1',
    title: 'L\'infraction pénale : définition et classification',
    duration: 12,
    isPro: false,
    tags: ['fondamentaux', 'classification'],
    sections: [
      {
        heading: 'Définition de l\'infraction pénale',
        body: `Une **infraction pénale** est un comportement (action ou omission) prévu et sanctionné par la loi pénale. Elle suppose la réunion de trois éléments constitutifs : l'élément **légal**, l'élément **matériel** et l'élément **moral** (intentionnel).

**⚠️ Moyen mnémotechnique : L-M-M (Légal · Matériel · Moral)**`
      },
      {
        heading: 'Classification tripartite (art. 111-1 CP)',
        body: `Le Code pénal distingue trois catégories d'infractions selon leur gravité :

| Catégorie | Seuil de peine | Exemple |
|-----------|---------------|---------|
| **Crime** | Réclusion criminelle ou détention criminelle | Meurtre, viol |
| **Délit** | Emprisonnement ≤ 10 ans ou amende > 3750 € | Vol, escroquerie |
| **Contravention** | Amende ≤ 3000 € | Excès de vitesse |

**Critère déterminant : la peine ENCOURUE, pas la peine prononcée.**`
      },
      {
        heading: 'L\'élément légal',
        body: `**Principe de légalité** (art. 111-3 CP) : *« Nul ne peut être puni pour un crime ou pour un délit dont les éléments ne sont pas définis par la loi, ou pour une contravention dont les éléments ne sont pas définis par le règlement. »*

- **Crimes et délits** → définis par la **loi** (Parlement)
- **Contraventions** → définies par le **règlement** (décret, arrêté)

⚠️ **Piège classique** : la peine d'emprisonnement pour contravention (pas de prison possible pour une contravention, sauf exception très rare).`
      },
      {
        heading: 'L\'élément matériel',
        body: `L'acte répréhensible peut prendre plusieurs formes :

**1. L'acte de commission** : accomplir un acte positivement interdit (frapper, voler…)

**2. L'acte d'omission** : s'abstenir d'agir alors qu'une obligation légale existait
- *Ex : non-assistance à personne en danger (art. 223-6 CP)*

**3. La tentative** (art. 121-5 CP) :
- Commencement d'exécution + désistement involontaire (ou absence d'effet)
- Punissable comme l'infraction consommée pour les crimes et certains délits`
      },
      {
        heading: 'L\'élément moral (intentionnel)',
        body: `**L'intention (dol général)** : volonté de commettre l'acte + conscience de sa illicéité

**Dol spécial** : intention particulière requise par le texte
- *Ex : animus necandi* pour le meurtre (intention de donner la mort)

**Les infractions non intentionnelles** (art. 121-3 al. 3 CP) :
- Faute d'imprudence, négligence, manquement à une obligation de prudence
- *Ex : homicide involontaire (art. 221-6 CP)*

**Infractions matérielles** (ou de résultat) :
- Pas d'intention requise, l'acte seul suffit
- Concerne principalement les contraventions`
      },
      {
        heading: 'L\'application de la loi pénale dans le temps',
        body: `**Principe de non-rétroactivité** (art. 112-1 CP) : la loi pénale ne s'applique pas aux infractions commises avant son entrée en vigueur.

**Exception — Rétroactivité in mitius** : la loi pénale **plus douce** s'applique aux infractions commises avant son entrée en vigueur si elles n'ont pas été définitivement jugées.

**Loi de procédure** : application immédiate (même aux procédures en cours), sauf si la loi ancienne est plus favorable à la partie poursuivie.`
      },
      {
        heading: 'Application de la loi pénale dans l\'espace',
        body: `**Principe de territorialité** (art. 113-2 CP) : la loi française s'applique aux infractions commises sur le territoire de la République (y compris le plateau continental et l'espace aérien).

**Principe de personnalité active** (art. 113-6) : un Français peut être poursuivi pour un crime ou un délit commis à l'étranger.

**Principe de personnalité passive** (art. 113-7) : la loi française s'applique pour les crimes ou délits contre une victime française à l'étranger.

**Principe de réalité** (art. 113-10) : pour certaines infractions graves portant atteinte aux intérêts fondamentaux de la Nation.`
      }
    ],
    quiz: [
      { q: 'Quel article du CP pose le principe de légalité des délits et des peines ?', a: 'Art. 111-3 du Code pénal' },
      { q: 'Quelle loi pénale s\'applique rétroactivement ?', a: 'La loi pénale plus douce (rétroactivité in mitius)' },
      { q: 'Quels sont les 3 éléments constitutifs d\'une infraction ?', a: 'Légal · Matériel · Moral (LMM)' }
    ]
  },
  {
    id: 'dpg-2',
    title: 'La responsabilité pénale',
    duration: 10,
    isPro: false,
    tags: ['responsabilité', 'auteur', 'complice'],
    sections: [
      {
        heading: 'Les auteurs de l\'infraction',
        body: `**Auteur principal** (art. 121-4 CP) : celui qui commet les faits constitutifs de l'infraction ou qui tente de la commettre.

**Co-auteur** : plusieurs personnes qui commettent ensemble les éléments constitutifs de l'infraction, chacune ayant la qualité d'auteur.

**Auteur moral (intellectuel)** : celui qui donne l'ordre ou l'instruction, sans participer matériellement à l'acte. Il peut être auteur principal si le texte le prévoit.`
      },
      {
        heading: 'La complicité (art. 121-6 et 121-7 CP)',
        body: `**Définition** : est complice la personne qui, sans commettre elle-même l'infraction, y a sciemment participé.

**Actes de complicité (art. 121-7)** :
1. **Instigation** : provoquer à l'infraction par dons, promesses, menaces, abus d'autorité, machinations ou artifices coupables
2. **Instructions** : donner des instructions pour la commettre
3. **Aide ou assistance** : faciliter la préparation ou la consommation

**⚠️ Conditions cumulatives** :
- Un **fait principal punissable** (même non puni en fait)
- Un **acte de complicité** prévu par la loi
- Une **participation intentionnelle** (connaissance du fait principal)

**Peine du complice = peine de l'auteur principal**`
      },
      {
        heading: 'Les causes d\'irresponsabilité pénale',
        body: `**Troubles mentaux** (art. 122-1 CP) :
- Al. 1 : irresponsabilité si trouble mental ayant aboli le discernement au moment des faits (acquittement / non-lieu)
- Al. 2 : simple atténuation si trouble ayant *altéré* le discernement (peine réduite)

**Contrainte** (art. 122-2) : force ou contrainte à laquelle il n'a pu résister.

**Erreur de droit** (art. 122-3) : infraction commise par erreur sur la portée d'une autorisation administrative, alors que cela ne pouvait être évité.

**Minorité** : mineur de 13 ans → présomption irréfragable d'irresponsabilité. 13-18 ans → responsabilité atténuée (CJPM).`
      },
      {
        heading: 'Les faits justificatifs',
        body: `**Légitime défense** (art. 122-5 CP) :
- Défense d'une **atteinte injustifiée** envers soi ou autrui
- Conditions : acte **simultané**, **nécessaire** et **proportionné**
- **Présomption** de légitime défense : pour les atteintes nocturnes (art. 122-6)

**État de nécessité** (art. 122-7) : faire face à un danger actuel ou imminent, sans autre moyen d'y remédier, si l'acte commis n'est pas disproportionné.

**Autorisation de la loi / commandement de l'autorité légitime** (art. 122-4) :
- Acte prescrit ou autorisé par la loi ou le règlement
- Ordre d'une autorité légitime (sauf si manifestement illégal)`
      },
      {
        heading: 'La responsabilité pénale des personnes morales',
        body: `**Principe** (art. 121-2 CP) : les personnes morales sont pénalement responsables **des infractions commises pour leur compte par leurs organes ou représentants**.

- Ne s'applique **pas** à l'État
- **Peine principale** pour les PM : amende, dont le montant maximum est le quintuple de celui prévu pour les personnes physiques
- **Peines complémentaires** : dissolution, interdiction d'activité, fermeture d'établissement, confiscation…

**⚠️ Cumul de responsabilités** : la responsabilité des personnes morales **n'exclut pas** celle des personnes physiques auteurs ou complices.`
      }
    ],
    quiz: [
      { q: 'Quels sont les 3 types d\'actes de complicité prévus à l\'art. 121-7 CP ?', a: 'Instigation · Instructions · Aide ou assistance' },
      { q: 'Quelle est la peine maximum pour une personne morale ?', a: 'Le quintuple de la peine maximale prévue pour une personne physique' },
      { q: 'À quel âge un mineur est-il présumé irréfragablement irresponsable ?', a: 'Avant 13 ans (présomption irréfragable)' }
    ]
  },
  {
    id: 'dpg-3',
    title: 'Les peines et leur régime',
    duration: 14,
    isPro: false,
    tags: ['peines', 'sanctions', 'exécution'],
    sections: [
      {
        heading: 'Classification des peines (art. 131-1 à 131-12 CP)',
        body: `**Pour les crimes (art. 131-1)** :
- Réclusion criminelle ou détention criminelle à perpétuité
- Réclusion criminelle ou détention criminelle 10, 15, 20, 30 ans

**Pour les délits (art. 131-3)** :
- Emprisonnement (max 10 ans pour une personne physique)
- Amende délictuelle (> 3 750 €)
- Jour-amende, Stage, TIG, Probation, Suivi socio-judiciaire…

**Pour les contraventions (art. 131-12 à 131-18)** :
- 5 classes : C1 à C5 (amende max C5 : **1 500 €** ; 3 000 € en cas de récidive)
- Pas d'emprisonnement (sauf exception ultra-rare)

**⚠️ Moyen mnémotechnique** : **R·D·C** = Réclusion · Délit · Contravention`
      },
      {
        heading: 'Peines complémentaires et accessoires',
        body: `**Peines complémentaires** : s'ajoutent à la peine principale et peuvent même être prononcées seules dans certains cas.

Exemples :
- Interdiction des droits civiques et de famille
- Interdiction d'exercer une profession
- Confiscation de biens
- Fermeture d'établissement
- Affichage ou diffusion de la décision

**Peines accessoires** : s'attachent automatiquement à certaines condamnations (ex : déchéance du droit de port d'arme après certaines condamnations).`
      },
      {
        heading: 'Aménagements de peine',
        body: `**Sursis simple** : suspension de l'exécution, révocable en cas de nouvelle condamnation dans un délai d'épreuve (5 ans délits, 3 ans contraventions).

**Sursis probatoire** (ex-SME) : suspension conditionnée à des obligations et interdictions (art. 132-40 et s.).

**Semi-liberté** : le condamné travaille, suit une formation ou soigne l'extérieur, retourne en détention le soir.

**Libération conditionnelle** : libération anticipée sous conditions (après avoir exécuté la moitié de la peine, ou les 2/3 si récidiviste).

**Détention à domicile sous surveillance électronique (DDSE)** : bracelet électronique à domicile.`
      },
      {
        heading: 'La récidive',
        body: `**Récidive légale** = commission d'une nouvelle infraction après une condamnation définitive, dans un délai et pour une infraction de même nature ou assimilée.

**Crime à crime** : perpétuelle (pas de délai), peine portée au double.
**Délit à délit** : délai de **5 ans** ; peine portée au double.
**Contravention à contravention** : dans le **délai d'un an**, amende portée au maximum (C5 → 3 000 €).

**⚠️ Récidiviste = conditions de libération conditionnelle durcies (2/3 de la peine).**`
      },
      {
        heading: 'L\'extinction des peines',
        body: `**Prescription de la peine** (art. 133-2 CP) :
- Crimes : **20 ans** (crimes contre l'humanité : imprescriptibles)
- Délits : **6 ans**
- Contraventions : **3 ans**

**Amnistie** : loi du Parlement effaçant les infractions et leurs conséquences.

**Grâce** : mesure présidentielle remettant ou réduisant la peine (pas l'infraction).

**Réhabilitation** : effacement des condamnations du casier judiciaire (légale après délai, ou judiciaire sur demande).`
      }
    ],
    quiz: [
      { q: 'Quelle est l\'amende maximale en 5e classe de contravention (récidive) ?', a: '3 000 € (1 500 € en primo)' },
      { q: 'Quel est le délai de prescription des délits ?', a: '6 ans (art. 133-2 CP)' },
      { q: 'Quelle est la différence entre amnistie et grâce ?', a: 'L\'amnistie efface l\'infraction (loi du Parlement) ; la grâce réduit ou remet la peine (acte présidentiel)' }
    ]
  },
  {
    id: 'dpg-4',
    title: 'Organisation judiciaire et acteurs de la justice',
    duration: 15,
    isPro: false,
    tags: ['organisation', 'juridictions', 'magistrats'],
    sections: [
      {
        heading: 'L\'ordre judiciaire pénal',
        body: `**Juridictions du premier degré :**
- **Tribunal de police** : contraventions (1re à 5e classe)
- **Tribunal correctionnel** : délits
- **Cour d\'assises** : crimes (composition : 3 magistrats + 6 jurés; appel → 3 magistrats + 9 jurés)

**Appel :**
- **Chambre des appels correctionnels** (rattachée à la Cour d\'appel) : délits
- **Cour d\'assises d\'appel** : crimes

**Cassation :**
- **Chambre criminelle de la Cour de cassation**

**Juridiction spécialisée :**
- **Tribunal pour enfants (TPE)** + **Cour d\'assises des mineurs** (CJPM depuis 2021)`
      },
      {
        heading: 'Le Parquet (Ministère Public)',
        body: `**Le Procureur de la République** (PR) :
- Dirige la police judiciaire (art. 12 CPP)
- Décide des poursuites (opportunité des poursuites)
- Représente l\'accusation devant les juridictions du premier degré

**Le Procureur Général (PG)** :
- Surveille et habilite les OPJ (art. 13 CPP)
- Représente l\'accusation devant la Cour d\'appel
- Peut exercer un recours contre toute décision du PR

**L\'avocat général** : représente le parquet devant les cours.

**⚠️ Le parquet est soumis au principe de l\'opportunité des poursuites**, pas à la légalité. Il peut classer sans suite.`
      },
      {
        heading: 'Les juges du siège',
        body: `**Juge d\'instruction (JI)** (art. 49 et s. CPP) :
- Saisi par réquisitoire introductif du PR ou plainte avec CPC
- Instruit à charge ET à décharge
- Peut décerner mandats (comparaître, amener, dépôt, arrêt)
- Renvoie en jugement (ordonnance de renvoi) ou non-lieu

**Juge des libertés et de la détention (JLD)** :
- Décide du placement en détention provisoire
- Contrôle judiciaire ou ARSE (Assignation à résidence avec surveillance électronique)
- Statue sur les prolongations de garde à vue

**Chambre de l\'instruction** :
- Contrôle les OPJ (art. 224 et s. CPP)
- Chambre d\'appel des ordonnances du JI
- Peut suspendre ou retirer l\'habilitation OPJ`
      },
      {
        heading: 'La police judiciaire : acteurs et statuts',
        body: `**OPJ — Officiers de Police Judiciaire (art. 16 CPP)** :
- Officiers et sous-officiers de la Gendarmerie nationale désignés
- Directeurs, commissaires, commandants, capitaines et lieutenants de la Police nationale
- Inspecteurs du travail, agents des Douanes habilités…
- **Habilitation 5 ans renouvelable** par le PG

**APJ — Agents de Police Judiciaire (art. 20 CPP)** :
- Gardiens de la paix, gendarmes non OPJ
- Agissent sous la direction d'un OPJ

**APJA — Agents de Police Judiciaire Adjoints (art. 21 CPP)** :
- Agents de police municipale, adjoints de sécurité
- Pouvoirs très limités (état civil, remettre au procureur)`
      },
      {
        heading: 'Les modes de saisine de la police judiciaire',
        body: `**Enquête préliminaire** (art. 75 à 78 CPP) :
- À l'initiative de l'OPJ ou sur instruction du PR
- Avec ou sans réquisition du PR
- Actes coercitifs nécessitent souvent autorisation du JLD

**Enquête de flagrance** (art. 53 et s. CPP) :
- Crime ou délit **flagrant** punissable d'emprisonnement
- Pouvoirs renforcés (GAV, perquisition sans autorisation judiciaire…)
- Durée : **8 jours** extensibles

**Commission rogatoire** (art. 151 CPP) :
- Déléguée par le juge d'instruction
- Confère les pouvoirs du JI à l'OPJ dans les limites de la CR`
      }
    ],
    quiz: [
      { q: 'Qui habilite les OPJ et pour quelle durée ?', a: 'Le Procureur Général, pour 5 ans renouvelables (art. 13 et 16 CPP)' },
      { q: 'Quelle juridiction juge les crimes en première instance ?', a: 'La Cour d\'assises (3 magistrats + 6 jurés)' },
      { q: 'Quel magistrat décide du placement en détention provisoire ?', a: 'Le Juge des libertés et de la détention (JLD)' }
    ]
  },
  {
    id: 'dpg-5',
    title: 'La garde à vue',
    duration: 16,
    isPro: false,
    tags: ['GAV', 'droits', 'procédure'],
    sections: [
      {
        heading: 'Conditions de placement en GAV (art. 62-2 CPP)',
        body: `La garde à vue est une mesure de contrainte décidée par un **OPJ**, sous le contrôle de l'**autorité judiciaire** (PR ou JI).

**Conditions cumulatives :**
1. Infraction **punie d'emprisonnement** (crime ou délit)
2. La GAV est la **seule** façon de remplir au moins UN des objectifs suivants :
   - Permettre l'exécution des investigations
   - Empêcher la modification des preuves ou indices
   - Empêcher toute pression sur témoins ou victimes
   - Empêcher concertation entre suspects
   - Garantir la mise à disposition du magistrat
   - Empêcher la commission de nouvelles infractions

**⚠️ La GAV n'est jamais automatique.** L'OPJ décide en appliquant le critère de nécessité et de proportionnalité.`
      },
      {
        heading: 'Durée de la garde à vue',
        body: `**Droit commun :**
- Durée initiale : **24 heures**
- 1 prolongation : **24 h** supplémentaires → autorisée par le PR (ou JI) si infraction punie d'au moins **1 an** d'emprisonnement → total **48 h**

**Régimes dérogatoires :**
| Infraction | Durée totale max |
|------------|----------------|
| Trafic de stupéfiants, terrorisme, criminalité organisée | 96 h (4 jours) |
| Actes terroristes avec risque imminent | 144 h (6 jours) |
| Mineur 16-18 ans | 48 h (droit commun) |
| Mineur 13-16 ans | 48 h si infraction ≥ 5 ans |
| Mineur < 13 ans | Interdit sauf rétention ≤ 12 h |

**Décompte : l'heure de placement fait foi (PV de GAV).**`
      },
      {
        heading: 'Droits de la personne gardée à vue',
        body: `**Droits immédiats (dès le début) :**
- Être **informée** des raisons de la GAV (faits reprochés, durée, droits)
- Faire **prévenir** un proche (ou employeur ou autorité consulaire)
- Être **examinée** par un médecin (de son choix ou désigné)
- Être **assistée** par un avocat (dès la 1re heure)

**Droits de l'avocat :**
- S'entretenir avec son client **30 minutes** dès le début
- Être présent lors des auditions
- Accès aux PV d'audition, médical et de notification des droits
- Droits différés : si nécessité impérieuse d'enquête (jusqu'à 24 h), sur décision du PR (48 h pour crime organisé)

**Droit au silence** (art. 63-1 CPP) : notification obligatoire.

**⚠️ Notification des droits = forme obligatoire.** Défaut → nullité de la GAV.`
      },
      {
        heading: 'Formalités et procès-verbaux obligatoires',
        body: `**PV de placement en GAV** → dressé **immédiatement** après la décision

**Notification des droits** → doit figurer dans le PV ; mention de la date et heure de chaque droit notifié

**PV d'audition** → peut être rédigé en présence de l'avocat ; doit mentionner les demandes éventuelles de l'avocat

**PV de fin de GAV** → avec la cause : libération, déferrement, mis en examen, poursuites directes

**Registre de GAV** → tenu au service, mentionné dans le CPP ; peut être consulté par le PR et la chambre de l'instruction

**⚠️ L'OPJ doit informer le PR SANS DÉLAI** (dès le début de la GAV ; al. 1 art. 63 CPP).`
      },
      {
        heading: 'Issue de la garde à vue',
        body: `**Libération sans suite** : s'il n'y a pas de charges suffisantes.

**Classement sans suite** : le PR peut classer l'affaire.

**Déferrement au PR** : la personne est présentée au PR à l'issue de la GAV pour un éventuel CRPC, une comparution immédiate, une COPJ ou une mise en examen.

**⚠️ Le délai de déferrement** : la personne ne peut rester détenue au-delà de l'expiration de la GAV + 20 h au maximum (art. 803-2 CPP), à défaut d'une décision judiciaire.

**Mise en cause d'une personne libre** : convocation par OPJ (art. 78 CPP), le PR peut aussi convoquer directement.`
      }
    ],
    quiz: [
      { q: 'Quelle est la durée initiale d\'une GAV en droit commun ?', a: '24 heures (prolongation 24 h possible si infraction ≥ 1 an d\'emprisonnement)' },
      { q: 'À partir de quel moment la personne en GAV peut-elle demander un avocat ?', a: 'Dès la 1re heure de la GAV' },
      { q: 'Qui autorise la prolongation d\'une GAV de droit commun ?', a: 'Le Procureur de la République (ou le Juge d\'instruction si ouverture d\'information)' }
    ]
  },
  {
    id: 'dpg-6',
    title: 'La prescription de l\'action publique',
    duration: 8,
    isPro: true,
    tags: ['prescription', 'délais', 'extinction'],
    sections: [
      {
        heading: 'Délais de prescription de l\'action publique',
        body: `**Réforme du 27 février 2017** (loi n° 2017-242) — Délais allongés :

| Catégorie | Délai |
|-----------|-------|
| **Crime** | **20 ans** (depuis 2017 ; était 10 ans) |
| **Délit** | **6 ans** (depuis 2017 ; était 3 ans) |
| **Contravention** | **1 an** (inchangé) |

**⚠️ Crimes imprescriptibles** :
- Crimes contre l'humanité
- Crimes de guerre (depuis la loi du 9 août 2010)
- Certains crimes terroristes graves (depuis 2021)

**Point de départ général** : jour où l'infraction est commise (crimes instantanés) ou jour où le dommage est révélé (infractions dissimulées — art. 9-1 CPP).`
      },
      {
        heading: 'Causes de suspension et d\'interruption',
        body: `**Interruption** (remet le délai à zéro) :
- Tout acte d'instruction ou de poursuites (audition, GAV, mise en examen…)
- Plainte de la victime avec CPC
- **⚠️ Nouveau délai = durée initiale** ; mais le délai ne peut pas dépasser le double du délai initial

**Suspension** (arrête le cours sans remettre à zéro) :
- Obstacle de droit (immunité parlementaire, minorité de la victime pour certains crimes)
- Obstacle de fait (force majeure)
- Procédures incidentes (questions préjudicielles…)`
      }
    ],
    quiz: [
      { q: 'Depuis 2017, quel est le délai de prescription de l\'action publique pour un crime ?', a: '20 ans' },
      { q: 'Quelle est la différence entre interruption et suspension de la prescription ?', a: 'L\'interruption remet le délai à zéro ; la suspension arrête son cours sans remettre à zéro' }
    ]
  }
];
