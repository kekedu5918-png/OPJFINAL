/**
 * OPJ EXAMEN — 7 scénarios compte rendu parquet + grilles d'évaluation
 * Chaque scénario : id, title, isPro, difficulty, ficheFaits, modele, grille
 */

window.COMPTES_RENDUS = [
  {
    id: 'mort_suspecte',
    title: 'Mort suspecte — Cause inconnue',
    isPro: false,
    difficulty: 2,
    ficheFaits: `Le 14 mars à 08h15, vous êtes informé par le SAMU de la découverte d'un homme sans vie dans un appartement au 12 rue des Lilas. Le médecin régulateur indique que le décès semble récent mais la cause n'est pas évidente ; pas de trace de violence apparente. La porte était fermée de l'intérieur, clé sur la table. Pas de témoin direct. Le défunt : M. Paul DUPONT, 52 ans, vivant seul. Vous êtes OPJ à la brigade criminelle.`,
    modele: {
      identification: "OPJ [nom], Brigade criminelle de [ville], le 14 mars à 09h30.",
      faits: "Monsieur le Procureur, je vous rends compte de la découverte ce matin à 08h15, sur signalement du SAMU, du corps sans vie de M. Paul DUPONT, 52 ans, en son domicile au 12 rue des Lilas. La porte était fermée de l'intérieur, pas de trace de violence apparente. Le médecin du SAMU a constaté le décès et a évoqué une cause à déterminer.",
      qualification: "Les faits sont susceptibles de constituer une mort suspecte au sens de l'article 74 CPP, pouvant recouvrir une mort naturelle, un suicide ou des violences ayant causé la mort. L'autopsie et l'enquête permettront de déterminer la cause.",
      actes: "J'ai procédé à : 1° Transport sur les lieux (Art. 54 CPP) 2° Constatations sur place (sécurisation, description des lieux) 3° Avis à votre parquet. Je sollicite vos instructions.",
      situation: "Aucune personne n'est mise en cause pour l'instant. Le défunt vivait seul.",
      propositions: "Je vous propose de requérir un médecin légiste pour autopsie et sollicite votre autorisation pour perquisition domiciliaire et saisie des effets personnels utiles à l'enquête."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ nommé', 'Service identifié', 'Date/heure précise', "Formule d'appel correcte"] },
      faits: { maxPoints: 4, criteres: ['Chronologie respectée', 'Faits complets', 'Précision des éléments', 'Clarté du récit'] },
      qualification: { maxPoints: 6, criteres: ['Article exact cité (74 CPP)', 'Qualification correcte (mort suspecte)', 'Éléments justificatifs', 'Doutes éventuels mentionnés', 'Infractions connexes possibles', 'Qualification pénale complète'] },
      actes: { maxPoints: 3, criteres: ['Actes listés', 'Articles mentionnés', 'Chronologie actes'] },
      situation: { maxPoints: 2, criteres: ['Situation des personnes', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Proposition cohérente', 'Demandes légitimes', 'Suite envisagée'] }
    }
  },
  {
    id: 'vol_effraction',
    title: 'Vol avec effraction — Commerce',
    isPro: false,
    difficulty: 2,
    ficheFaits: `Le 20 mars à 06h00, le responsable d'un magasin d'électroménager signale un cambriolage. La vitrine a été brisée, la porte forcée. Plusieurs téléviseurs et ordinateurs portables ont disparu. Une caméra de surveillance a enregistré deux individus cagoulés vers 03h30. Aucun suspect interpellé pour l'instant. Vous êtes OPJ au commissariat central.`,
    modele: {
      identification: "OPJ [nom], Commissariat central de [ville], le 20 mars à 07h00.",
      faits: "Monsieur le Procureur, je vous rends compte du cambriolage d'un commerce d'électroménager, constaté ce matin à 06h00. La vitrine et la porte ont été forcées. Sont manquants : plusieurs téléviseurs et ordinateurs portables. Les images de vidéosurveillance montrent deux individus cagoulés vers 03h30.",
      qualification: "Les faits sont susceptibles de constituer un vol avec effraction (art. 311-4 1° CP), voire en réunion (art. 311-5 CP).",
      actes: "J'ai procédé à : 1° Transport sur les lieux (Art. 54 CPP) 2° Constatations et relevés 3° Avis à votre parquet. Pas d'interpellation à ce stade.",
      situation: "Aucune personne n'est mise en cause. Enquête en cours (identification par images).",
      propositions: "Je vous propose de poursuivre l'enquête (exploitation vidéo, recoupements) et sollicite votre accord pour toute perquisition ultérieure si des suspects sont identifiés."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ nommé', 'Service identifié', 'Date/heure', "Formule d'appel"] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits complets', 'Précision', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Article(s) cité(s)', 'Qualification correcte', 'Éléments constitutifs', 'Circonstances', 'Infractions connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes listés', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  },
  {
    id: 'coups_blessures',
    title: 'Coups et blessures — Bar',
    isPro: false,
    difficulty: 1,
    ficheFaits: `Le 15 mars vers 23h00, rixe dans un bar. La victime, M. Martin, a été frappée au visage ; ITT 5 jours. Un témoin désigne un client habituel, M. Bernard. Vous avez interpellé M. Bernard et l'avez placé en GAV. Il nie les coups. Vous êtes OPJ.`,
    modele: {
      identification: "OPJ [nom], Commissariat de [ville], le 16 mars à 00h30.",
      faits: "Monsieur le Procureur, je vous rends compte d'une rixe survenue le 15 mars vers 23h00 dans un bar. La victime, M. Martin, a reçu des coups au visage ; ITT 5 jours. Un témoin a désigné M. Bernard, interpellé et placé en GAV. Ce dernier conteste les faits.",
      qualification: "Les faits sont susceptibles de constituer des violences volontaires ayant entraîné une ITT ≤ 8 jours (art. 222-9 CP).",
      actes: "J'ai procédé à : 1° Transport sur les lieux 2° Audition du témoin 3° Placement en GAV de M. Bernard 4° Notification des droits 5° Première audition (déni).",
      situation: "M. Bernard est en GAV. Victime et témoin identifiés.",
      propositions: "Je vous propose de requérir un certificat médical complémentaire si besoin et de poursuivre les auditions. Sollicite prolongation GAV si vous l'estimez utile."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ nommé', 'Service', 'Date/heure', 'Appel'] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits', 'Précision', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Article 222-9', 'Qualification', 'ITT mentionnée', 'Éléments', 'Connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  },
  {
    id: 'conduite_sans_permis',
    title: 'Conduite sans permis',
    isPro: false,
    difficulty: 1,
    ficheFaits: `Le 18 mars à 14h00, contrôle routier. Le conducteur, M. Durand, ne présente pas de permis. Vérification : permis annulé définitivement il y a 2 ans. Véhicule immobilisé. Vous êtes OPJ.`,
    modele: {
      identification: "OPJ [nom], Police/SR [ville], le 18 mars à 14h30.",
      faits: "Monsieur le Procureur, je vous rends compte du contrôle ce jour à 14h00 de M. Durand, conducteur d'un véhicule. Il n'a pas pu présenter de permis. Vérification : permis annulé définitivement il y a deux ans. Véhicule immobilisé.",
      qualification: "Les faits sont susceptibles de constituer une conduite malgré l'incapacité résultant d'une annulation du permis (art. 223-1 Code de la route).",
      actes: "J'ai procédé à : 1° Contrôle et vérification du statut du permis 2° Immobilisation du véhicule 3° Avis à votre parquet. M. Durand n'a pas été placé en GAV.",
      situation: "M. Durand laissé libre ; convocation ultérieure possible.",
      propositions: "Je vous propose d'engager des poursuites et de convoquer M. Durand en audition libre ou de requérir sa comparution devant vous."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ', 'Service', 'Date/heure', 'Appel'] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits', 'Précision', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Article Code route', 'Qualification', 'Éléments', 'Connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  },
  {
    id: 'recel',
    title: 'Recel — Véhicule volé',
    isPro: false,
    difficulty: 2,
    ficheFaits: `Un véhicule volé il y a 3 semaines (plainte déposée) a été repéré en circulation. Vous avez interpellé le conducteur, M. Lemoine. Il affirme avoir acheté le véhicule « sans papiers » à un inconnu. Le véhicule a été saisi. Vous êtes OPJ.`,
    modele: {
      identification: "OPJ [nom], Brigade de [ville], le 22 mars à 11h00.",
      faits: "Monsieur le Procureur, je vous rends compte de l'interpellation de M. Lemoine au volant d'un véhicule identifié comme volé il y a trois semaines (plainte déposée). M. Lemoine déclare avoir acheté le véhicule sans papiers à un inconnu. Le véhicule a été saisi.",
      qualification: "Les faits sont susceptibles de constituer un recel (art. 321-1 CP), la chose provenant d'un vol (art. 311-1 CP).",
      actes: "J'ai procédé à : 1° Vérification du fichier des véhicules volés 2° Interpellation et audition 3° Saisie du véhicule 4° Avis à votre parquet.",
      situation: "M. Lemoine peut être convoqué en audition libre ou placé en GAV selon vos instructions.",
      propositions: "Je vous propose de convoquer M. Lemoine en audition libre pour recueil de ses explications et poursuite de l'enquête sur le circuit du véhicule."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ', 'Service', 'Date/heure', 'Appel'] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits', 'Précision', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Article 321-1', 'Qualification recel', 'Origine vol', 'Éléments', 'Connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  },
  {
    id: 'detention_stupefiants',
    title: 'Détention de stupéfiants',
    isPro: false,
    difficulty: 2,
    ficheFaits: `Lors d'un contrôle dans un train, vous découvrez sur M. Keller une quantité de résine de cannabis (environ 80 g). Il reconnaît la détention pour usage personnel. Vous l'avez placé en GAV. Vous êtes OPJ.`,
    modele: {
      identification: "OPJ [nom], Police/SR [ville], le 25 mars à 16h00.",
      faits: "Monsieur le Procureur, je vous rends compte du contrôle ce jour dans un train de M. Keller, en possession d'environ 80 g de résine de cannabis. Il reconnaît la détention pour usage personnel. Placé en GAV.",
      qualification: "Les faits sont susceptibles de constituer une détention de stupéfiants (art. 222-37 CP). La quantité (80 g) peut relever du usage ou du trafic ; l'enquête et les déclarations permettront de qualifier.",
      actes: "J'ai procédé à : 1° Contrôle et découverte des produits 2° Saisie 3° Placement en GAV 4° Notification des droits 5° Audition (reconnaissance usage personnel). Réquisition d'analyse envoyée.",
      situation: "M. Keller est en GAV. Produits saisis et en cours d'analyse.",
      propositions: "Je vous propose de prolonger la GAV si nécessaire pour analyse et audition complémentaire, puis poursuites pour détention."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ', 'Service', 'Date/heure', 'Appel'] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits', 'Quantité', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Article 222-37', 'Qualification', 'Usage/trafic évoqué', 'Éléments', 'Connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  },
  {
    id: 'homicide_volontaire',
    title: 'Homicide volontaire — Scène de crime',
    isPro: true,
    difficulty: 3,
    ficheFaits: `À 02h00, découverte du corps d'une femme, 35 ans, dans un parking. Plusieurs coups de couteau. Témoin ayant vu un homme s'enfuir. À 04h00, un homme en sang est interpellé à 2 km ; couteau saisi. Il est placé en GAV. Vous êtes OPJ brigade criminelle.`,
    modele: {
      identification: "OPJ [nom], Brigade criminelle de [ville], le [date] à 05h00.",
      faits: "Monsieur le Procureur, je vous rends compte de la découverte à 02h00 du corps sans vie d'une femme, 35 ans, dans un parking, présentant plusieurs plaies par arme blanche. Un témoin a vu un homme s'enfuir. À 04h00, un homme en sang a été interpellé à 2 km ; un couteau a été saisi. Il a été placé en GAV.",
      qualification: "Les faits sont susceptibles de constituer un meurtre (art. 221-1 CP) ou un assassinat si préméditation (art. 221-3 CP). L'autopsie et l'enquête permettront de préciser.",
      actes: "J'ai procédé à : 1° Transport sur les lieux (Art. 54 CPP) 2° Constatations et sécurisation 3° Avis à votre parquet 4° Interpellation du suspect 5° Saisie du couteau 6° Placement en GAV 7° Notification des droits. Requête médecin légiste et autopsie sollicitées.",
      situation: "Un suspect est en GAV. Victime à identifier formellement. Témoin auditionné.",
      propositions: "Je vous propose de requérir l'autopsie, de prolonger la GAV et d'autoriser perquisition domicile du suspect et exploitation des pièces à conviction."
    },
    grille: {
      identification: { maxPoints: 4, criteres: ['OPJ', 'Service', 'Date/heure', 'Appel'] },
      faits: { maxPoints: 4, criteres: ['Chronologie', 'Faits complets', 'Précision', 'Clarté'] },
      qualification: { maxPoints: 6, criteres: ['Articles 221-1/221-3', 'Qualification', 'Préméditation évoquée', 'Éléments', 'Connexes', 'Complétude'] },
      actes: { maxPoints: 3, criteres: ['Actes', 'Articles', 'Chronologie'] },
      situation: { maxPoints: 2, criteres: ['Situation', 'Clarté'] },
      propositions: { maxPoints: 3, criteres: ['Cohérence', 'Demandes', 'Suite'] }
    }
  }
];
