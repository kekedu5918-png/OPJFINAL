/**
 * OPJ EXAMEN — 10 Cas pratiques + corrigés
 * Format : id, titre, epreuve, scenario, question, points, corrige, grille
 */

window.CAS_PRATIQUES = [
  {
    id: 'cp-1',
    titre: 'La ronde de nuit — GAV et droits',
    epreuve: 'ep2',
    difficulte: 2,
    dureeEstimee: 25,
    isPro: false,
    scenario: `Il est 23h15. Vous êtes OPJ au commissariat central. Vous recevez un appel radio : vos collègues ont interpellé M. LEBRUN David, 34 ans, en train de fracturer la vitrine d'une bijouterie rue du Commerce. M. LEBRUN a été trouvé en possession d'un pied-de-biche et de deux montres qui semblent provenir d'une vitrine brisée. Il refuse de s'identifier clairement.

Vos collègues l'amènent au commissariat à 23h30.`,
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez juridiquement les faits commis par M. LEBRUN. Précisez les éléments constitutifs.',
        bareme: 4,
        corrige: `**Qualification** : Tentative de vol avec effraction (art. 311-4 al. 1 et 311-13 + 121-5 du Code pénal)

**Éléments constitutifs** :
- **Élément légal** : art. 311-1 (vol) aggravé par art. 311-4 al. 1 (effraction) + 311-13 (tentative punie comme l'infraction consommée)
- **Élément matériel** : 
  - Commencement d'exécution : bris de la vitrine avec le pied-de-biche (acte non équivoque de la tentative)
  - Désistement involontaire : interpellation par les agents avant la soustraction effective
  - Présence des montres = preuves de sa qualité de suspect
- **Élément moral** : intention frauduleuse de s'approprier les bijoux (animus furandi)

**Peine encourrue** : 5 ans d'emprisonnement et 75 000 € d'amende (vol avec effraction = droit commun 3 ans, circonstance aggravante → 5 ans)`
      },
      {
        num: 2,
        enonce: 'M. LEBRUN est placé en garde à vue à 23h30. Listez les 6 droits qui doivent lui être notifiés immédiatement.',
        bareme: 6,
        corrige: `Les 6 droits devant être notifiés en garde à vue (art. 63-1 CPP) :

1. **Droit d'être informé** de la nature de l'infraction soupçonnée, de la durée de la GAV et de ses prolongations éventuelles
2. **Droit de garder le silence** (ne pas répondre aux questions)
3. **Droit à un avocat** : choix d'un avocat ou commis d'office — entretien de 30 minutes dès la 1re heure
4. **Droit de faire prévenir** un proche (famille, employeur) ou pour un étranger, l'autorité consulaire de son pays
5. **Droit à un examen médical** par un médecin désigné par l'OPJ ou par un médecin de son choix
6. **Droit à un interprète** si la personne ne comprend pas la langue française`
      },
      {
        num: 3,
        enonce: 'M. LEBRUN reconnaît les faits. Vous souhaitez prolonger sa garde à vue. Quelle procédure appliquez-vous ? Jusqu\'à quand peut-il être retenu ?',
        bareme: 4,
        corrige: `**Procédure de prolongation** :
- L'infraction (vol avec effraction) est punie de 5 ans d'emprisonnement → condition de l'art. 63 al. 2 CPP remplie (≥ 1 an)
- L'OPJ doit **présenter M. LEBRUN au Procureur de la République** (ou lui en rendre compte) pour demander l'autorisation de prolonger
- Le PR peut prolonger par décision motivée
- La prolongation est de **24 heures supplémentaires**

**Calcul** :
- Début GAV : 23h30 le jour J
- Fin initiale (24h) : 23h30 le lendemain (J+1)
- Fin après prolongation (48h max) : 23h30 le surlendemain (J+2)

**⚠️** Le dépassement sans autorisation constitue une détention arbitraire.`
      },
      {
        num: 4,
        enonce: 'Les montres trouvées sur M. LEBRUN doivent être saisies. Décrivez la procédure de saisie et de mise sous scellés.',
        bareme: 3,
        corrige: `**Procédure de saisie** (art. 56 et 76 CPP) :

1. **Identification et inventaire** : dresser un inventaire détaillé des objets saisis (description précise, marques, numéros de série, état…)
2. **Procès-verbal de saisie** : rédaction d'un PV de saisie listant chaque objet avec ses caractéristiques
3. **Mise sous scellés** : 
   - Chaque objet emballé séparément ou ensemble (si possible)
   - Scellé avec de la cire ou du fil lacé passant à travers un sceau
   - Signature et cachet sur le scellé
4. **Photographies** : photos des objets avant mise sous scellés (pratique courante)
5. **Conservation** : dépôt au greffe ou au local des scellés du service

**⚠️** L'intégrité des scellés doit être garantie jusqu'au procès.`
      },
      {
        num: 5,
        enonce: 'M. LEBRUN dit avoir été victime d\'une "confusion" — il prétend être coursier et transportait les montres pour un client. Que faites-vous ?',
        bareme: 3,
        corrige: `**Conduite à tenir** :

1. **Audition approfondie** de M. LEBRUN avec son avocat, en documentant ses déclarations précisément
2. **Vérification de l'alibi** :
   - Identité du prétendu client (nom, adresse, contact)
   - Audition du client supposé
   - Vérification de l'existence d'une activité de coursier (SIRET, véhicule…)
3. **Rapprochement** avec la plainte de la bijouterie et description des montres volées
4. **Réquisitions** aux opérateurs téléphoniques pour vérifier les communications de M. LEBRUN (art. 60-1 CPP)
5. **Transmission au PR** de tous les éléments, à charge et à décharge
6. **PV d'audition** contradictoire mentionnant les déclarations de M. LEBRUN et les vérifications effectuées

**Principe** : l'OPJ instruit à charge ET à décharge, le PR décide des suites.`
      }
    ]
  },
  {
    id: 'cp-2',
    titre: 'Violences conjugales — Urgence et protection',
    epreuve: 'ep2',
    difficulte: 2,
    dureeEstimee: 25,
    isPro: false,
    scenario: `Il est 14h30. Mme MARTIN Sophie, 32 ans, se présente spontanément à votre commissariat. Elle présente un hématome important à l'œil droit et plusieurs contusions aux bras. Elle vous déclare que son concubin, M. DURAND Thomas, 38 ans, l'a frappée à plusieurs reprises ce matin à leur domicile. Elle précise que ces violences sont récurrentes depuis 6 mois et qu'elle a peur pour sa sécurité.

Elle n'a pas encore été vue par un médecin. M. DURAND est actuellement au domicile commun.`,
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez juridiquement les faits. Quelle peine est-elle encourrue par M. DURAND ?',
        bareme: 4,
        corrige: `**Qualification provisoire** : Violences volontaires ayant entraîné une incapacité totale de travail (ITT) par le concubin — art. 222-12 et R.625-1 du Code pénal selon l'ITT médicale.

**Plus précisément** :
- Si ITT ≤ 8 jours → R.625-1 aggravé par la qualité de concubin → **3 ans + 45 000 €** (art. 222-14 CP)
- Si ITT > 8 jours → art. 222-11 aggravé par concubin → **5 ans + 75 000 €** (art. 222-12 CP)
- En cas de récidive ou de violences habituelles sur conjoint/concubin → peine portée au double

**Circonstance aggravante** : violences commises par le concubin (art. 222-12 ou 222-14 CP)

**⚠️ L'ITT est déterminée par le médecin**, elle conditionne la qualification définitive.`
      },
      {
        num: 2,
        enonce: 'Quelles mesures de protection immédiate pouvez-vous proposer à Mme MARTIN ?',
        bareme: 4,
        corrige: `**Mesures de protection immédiate** :

1. **Examen médical urgent** : orientation vers un médecin légiste ou urgences hospitalières pour évaluation et constatation des lésions (certificat médical indispensable)
2. **Hébergement d'urgence** : proposition d'un hébergement sécurisé (centre d'hébergement, foyer pour femmes victimes, famille…)
3. **Éviction du domicile** : en cas de danger, possibilité d'éviction du conjoint violent du domicile (art. 515-9 Code civil — ordonnance de protection via JAF)
4. **Bracelet anti-rapprochement (BAR)** : mesure de protection électronique (loi du 28/12/2019) — peut être proposée par le PR ou le JAF
5. **Information sur les droits** : remettre la liste des associations d'aide aux victimes, numéros utiles (3919 — violence femmes info, 17 — police)
6. **Accompagnement psychologique** : orientation vers une unité médico-judiciaire (UMJ) ou une association spécialisée

**⚠️ Ne jamais laisser la victime repartir sans s'assurer de sa sécurité immédiate.**`
      },
      {
        num: 3,
        enonce: 'Mme MARTIN vous remet un certificat médical qui conclut à une ITT de 10 jours. Quelle qualification retenir et comment procédez-vous pour interpeller M. DURAND ?',
        bareme: 4,
        corrige: `**Qualification** : ITT > 8 jours + concubin → art. 222-12 CP (violences aggravées) → délit puni de **5 ans + 75 000 €**

**Interpellation de M. DURAND** :
1. **Mode d'enquête** : L'infraction vient de se commettre (ce matin) → possible en enquête de **flagrance** (art. 53 CPP) si les faits sont très récents (temps voisin)
2. **Vérification du domicile** : Rechercher l'adresse exacte du domicile commun
3. **Transport sur les lieux** : Se rendre au domicile avec les forces nécessaires
4. **Interpellation** de M. DURAND selon les règles (présentation de la qualité d'OPJ, notification des droits si GAV)
5. **Placement en GAV** si les conditions sont réunies (infraction ≥ 1 an → oui, 5 ans)
6. **Notification immédiate** au Procureur de la République

**Sécurité** : prévoir des renforts (le mis en cause peut être violent), prévenir le PR avant l'interpellation si possible.`
      },
      {
        num: 4,
        enonce: 'Lors de son audition, M. DURAND nie les faits et affirme que les blessures sont dues à une chute. Quels actes d\'enquête réalisez-vous pour établir la vérité ?',
        bareme: 4,
        corrige: `**Actes d'enquête** :

**1. Actes médicaux :**
- Réquisition du médecin légiste pour expertise médicale approfondie (cohérence lésions/blessures/chute)
- Confrontation du certificat médical avec les déclarations de M. DURAND

**2. Investigations au domicile :**
- Perquisition au domicile (accord de Mme MARTIN ou autorisation du JLD si refus)
- Recherche de traces de violences (sang, objets déplacés, caméra…)
- Photos et constatations techniques

**3. Auditions de tiers :**
- Voisins (bruits, cris entendus)
- Entourage (famille, collègues informés)
- Témoins éventuels

**4. Réquisitions :**
- Opérateurs téléphoniques (messages, appels au moment des faits)
- Établissements de santé (consultations antérieures pour traumatismes)

**5. Autres victimes :**
- Vérification des antécédents de M. DURAND (condamnations, plaintes antérieures)
- Enquête sur les violences précédentes déclarées par Mme MARTIN (6 mois)`
      }
    ]
  },
  {
    id: 'cp-3',
    titre: 'Décès suspect — Constatations initiales',
    epreuve: 'ep2',
    difficulte: 3,
    dureeEstimee: 30,
    isPro: false,
    scenario: `Il est 9h45. Vous recevez un appel téléphonique d'une habitante, Mme PETIT Isabelle, qui vous signale avoir découvert son voisin M. ROUSSEAU Bernard, 72 ans, gisant sans vie dans son appartement au 3e étage du 15, rue des Lilas. La porte de l'appartement était ouverte.

Vous vous rendez sur les lieux avec deux APJ.`,
    questions: [
      {
        num: 1,
        enonce: 'Quelles sont vos premières mesures à prendre sur les lieux et pourquoi ?',
        bareme: 5,
        corrige: `**Premières mesures (dans l'ordre chronologique)** :

**1. Sécuriser les lieux** (PRIORITÉ ABSOLUE) :
- Périmètre de sécurité autour de l'appartement et de l'immeuble
- Interdiction d'accès à toute personne non habilitée
- Protection de la scène de crime (ne rien toucher, ne rien déplacer)

**2. Vérifier l'état de la victime** :
- Constater le décès (sans toucher au corps si possible)
- Appeler le SAMU si un doute subsiste sur la vie de la victime

**3. Informer immédiatement le Procureur de la République** (art. 74 CPP) :
- Décès suspect → le PR est informé sans délai
- Décision du PR : mort naturelle (certificat médecin) ou mort suspecte → enquête

**4. Identification de la victime** : relever son identité complète, informer la famille

**5. Entendre Mme PETIT** (découvreuse du corps) :
- Dans quel état était la porte ? Avait-elle pénétré dans l'appartement ?
- Depuis combien de temps n'avait-elle pas vu M. ROUSSEAU ?

**6. Préservation des traces et indices** :
- Ne rien toucher sans gants
- Ne pas contaminer la scène
- Attendre l'arrivée de la police scientifique et technique

**⚠️ En cas de mort suspecte, l'art. 74 CPP impose l'information immédiate du PR.**`
      },
      {
        num: 2,
        enonce: 'Le médecin légiste constate que la mort est suspecte (traces de strangulation). Quel mode d\'enquête s\'ouvre ? Quels actes pouvez-vous réaliser ?',
        bareme: 5,
        corrige: `**Mode d'enquête** : Enquête préliminaire sous la direction du Procureur de la République (art. 75 CPP) ou ouverture d'une information judiciaire si les charges sont suffisantes.

**En pratique** : Le PR peut saisir directement une brigade criminelle / SRPJ et ordonner une enquête sous ses instructions, avant éventuelle ouverture d'instruction.

**Actes réalisables par l'OPJ** :

**Techniques d'enquête** :
- Réquisitions scientifiques : prélèvements ADN, empreintes digitales, traces biologiques (art. 60 CPP)
- Autopsie médicolégale obligatoire (art. 74 al. 2 CPP) si mort violente ou suspecte → ordonnée par le PR
- Photographies systématiques des lieux et de la victime

**Investigations terrain** :
- Audition des voisins (bruits, présence de tiers inhabituels, dernière fois vus)
- Consultation des caméras de surveillance de l'immeuble et des alentours
- Examen du téléphone et de l'ordinateur de la victime (avec réquisitions si nécessaire)

**Identité des proches** :
- Notification à la famille (avec précaution)
- Audition des proches sur le cercle de fréquentation

**⚠️ Le PR doit autoriser l'autopsie (art. 74 al. 2)** — sans ordonnance du PR ou du JI, l'autopsie ne peut être réalisée.`
      },
      {
        num: 3,
        enonce: 'Un suspect est rapidement identifié : le fils de M. ROUSSEAU. Il vit en province. Quels sont vos pouvoirs pour le convoquer et l\'entendre ?',
        bareme: 4,
        corrige: `**Pouvoirs de convocation** (art. 78 CPP) :

L'OPJ peut convoquer tout individu dont l'audition lui paraît utile à l'enquête.

**Modes de convocation** :
1. **Convocation directe** : par lettre recommandée avec accusé de réception ou remise en main propre
2. **Convocation via un service de police local** (délégation à l'OPJ du secteur de résidence du suspect)
3. **Convocation téléphonique** (avec suivi écrit)

**Obligations du convoqué** :
- Le convoqué est **tenu de se présenter** sous peine d'amende (contravention)
- En cas de refus, l'OPJ peut demander au PR l'autorisation de **recourir à la force publique** pour amener la personne

**Statut lors de l'audition** :
- Si aucun indice : **audition libre** (témoin)
- Si soupçons graves : notification de ses droits (art. 61-1 CPP), possibilité de **placement en GAV** si infraction ≥ 1 an (homicide = crime → oui)

**⚠️ Ne jamais entendre une personne soupçonnée sous serment de témoin.** Le statut de suspect exclut la qualité de témoin.`
      }
    ]
  },
  {
    id: 'cp-4',
    titre: 'Trafic de stupéfiants — Enquête et saisies',
    epreuve: 'ep2',
    difficulte: 3,
    dureeEstimee: 30,
    isPro: true,
    scenario: `Suite à des renseignements anonymes, vous avez mené une enquête préliminaire de 3 semaines. Vous avez établi que M. GARCIA Pablo, 26 ans, se livre à la vente de cocaïne dans son quartier. Vos observations vous ont permis de constater plusieurs transactions. Ce matin, lors d'une interpellation pendant un flagrant délit de vente, vous saisissez sur lui : 52 grammes de cocaïne conditionnée en sachets, 3 800 € en espèces (petites coupures), un téléphone portable et un cahier de comptabilité.`,
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez les faits et précisez le régime de garde à vue applicable à M. GARCIA.',
        bareme: 4,
        corrige: `**Qualification** : Cession illicite de stupéfiant (cocaïne) + détention illicite de stupéfiant (art. 222-37 CP)

**Peine encourrue** : **10 ans d'emprisonnement et 7 500 000 € d'amende** (art. 222-37 CP)

**Si bande organisée** (art. 222-34 CP) → crime → **20 à 30 ans** de réclusion criminelle

**Régime de GAV** :
- Infraction de trafic de stupéfiants → **régime dérogatoire** (art. 706-88 CPP)
- Durée initiale : 48 heures (au lieu de 24 h)
- 1 prolongation de 24 h sur autorisation du JLD (après avis du PR) → 72 h
- 2e prolongation de 24 h sur autorisation du JLD → **96 h maximum** (4 jours)
- Accès à l'avocat différé : jusqu'à **48 heures** (sur autorisation du PR ou du JLD)

**⚠️ Attention** : le régime dérogatoire ne s'applique que pour les infractions listées à l'art. 706-73 CPP (dont le trafic de stupéfiants).`
      },
      {
        num: 2,
        enonce: 'Vous souhaitez perquisitionner au domicile de M. GARCIA. Quelle procédure appliquez-vous en flagrance ?',
        bareme: 4,
        corrige: `**Perquisition en flagrance (art. 56 CPP)** :

**Conditions** :
- Enquête de **flagrance** ouverte (infraction flagrante de vente)
- Infraction punissable d'emprisonnement (✓)
- Relation directe avec l'infraction (domicile du trafiquant → possible lieu de stockage)

**Procédure** :
1. **Plage horaire** : de **6h à 21h** sans restriction (ou si commencée avant 21h, peut se poursuivre au-delà si nécessaire)
2. **Témoin requis** : présence d'un témoin qui n'est pas sous les ordres de l'OPJ (art. 57 CPP) — peut être un voisin ou toute personne qualifiée
3. **Présence de M. GARCIA** si possible (ou de son représentant)
4. **PV de perquisition** détaillant chaque objet fouillé et saisi
5. **Saisie** des objets en lien avec l'infraction (drogue, argent, armes, matériel…)
6. **Scellés** sur les objets saisis

**⚠️ Pas besoin d'assentiment en flagrance** (contrairement à l'enquête préliminaire).

**En pratique** : contacter le PR avant la perquisition pour lui en rendre compte.`
      },
      {
        num: 3,
        enonce: 'Les 3 800 € trouvés sur M. GARCIA peuvent-ils être saisis ? Sur quelle base juridique ? Que faire des espèces ?',
        bareme: 4,
        corrige: `**Saisie des espèces** : **OUI**, les 3 800 € peuvent être saisis.

**Base juridique** :
- Art. 56 CPP (saisie en flagrance des objets et documents utiles à la manifestation de la vérité)
- Art. 706-141 et s. CPP (saisies spéciales portant sur les instruments et le produit de l'infraction)
- L'argent en espèces (petites coupures) constitue très probablement le **produit de l'infraction** (art. 222-49 CP — confiscation obligatoire)

**Procédure pour les espèces** :
1. **Compter les espèces** en présence d'un témoin et de M. GARCIA (si présent)
2. **PV de saisie** : noter chaque billet (nombre, dénomination)
3. **Mise sous scellés** ou **versement sur compte séquestre** de la Caisse des dépôts (pour les grosses sommes)
4. **Information au PR** : le PR décide des suites (saisie conservatoire, confiscation judiciaire…)

**Saisie pénale spéciale** :
- Le juge (JLD ou juridiction de jugement) peut ordonner la **confiscation** de ces sommes comme produit ou instrument de l'infraction
- Sans décision judiciaire, l'argent reste séquestré le temps de la procédure`
      },
      {
        num: 4,
        enonce: 'M. GARCIA admet avoir vendu de la drogue mais prétend ne pas être l\'organisateur du réseau. Il cite un certain "Nono" comme chef. Quelles suites donner ?',
        bareme: 4,
        corrige: `**Conduite à tenir** :

**1. Audition approfondie de M. GARCIA** :
- Identité réelle et coordonnées de "Nono"
- Mode d'approvisionnement, fréquence, quantités
- Réseau de vente, autres revendeurs
- Circuits financiers
- PV d'audition complet et signé

**2. Dénonciation et enquête sur "Nono"** :
- Ces déclarations constituent un **renseignement à vérifier** (ne pas les prendre pour parole d'Évangile)
- Enquête immédiate sur l'identité de "Nono" (réquisitions téléphoniques sur le téléphone de M. GARCIA, surveillance…)
- Si "Nono" est identifié → possibilité d'extension de l'enquête

**3. Incidences sur la qualification** :
- Si M. GARCIA n'est qu'un revendeur de rang inférieur → maintien de la qualification art. 222-37
- Si bande organisée établie → requalification en art. 222-34 (crime)

**4. Saisine du PR** :
- Le PR décide si une information judiciaire est ouverte pour démanteler tout le réseau
- Possible recours à des techniques spéciales d'enquête (écoutes, infiltration, art. 706-81 CPP)`
      }
    ]
  },
  {
    id: 'cp-5',
    titre: 'Accident de la route mortel — Investigations',
    epreuve: 'ep2',
    difficulte: 2,
    dureeEstimee: 25,
    isPro: false,
    scenario: `Il est 6h20. Vous êtes appelé sur un accident de la route : un véhicule a percuté un arbre à grande vitesse sur la D23. Le conducteur, M. SIMON Kévin, 22 ans, est décédé sur le coup. Son passager, M. TABET Ahmed, 20 ans, est grièvement blessé et transporté d'urgence à l'hôpital. Les pompiers, qui ont dégagé les victimes, notent une forte odeur d'alcool dans le véhicule.`,
    questions: [
      {
        num: 1,
        enonce: 'Quelles sont vos premières mesures sur les lieux de l\'accident ?',
        bareme: 4,
        corrige: `**Premières mesures** :

**1. Sécurisation des lieux** :
- Balisage de la zone (cônes, gyrophares) pour protéger les opérations et les autres usagers
- Périmètre de sécurité autour du véhicule accidenté

**2. Prise en charge des victimes** :
- Vérifier que les secours (SAMU, pompiers) sont bien intervenus
- S'assurer du transfert de M. TABET à l'hôpital
- Recueillir l'identité du personnel médical ayant constaté le décès

**3. Information du PR** (art. 74 CPP) :
- Mort suspecte/violente → notification immédiate au PR
- Le PR autorisera ou non une autopsie

**4. Constatations sur les lieux** :
- Photographies complètes de la scène (véhicule, trajectoire, point d'impact, marquages)
- Relevé de la trace de freinage
- État de la chaussée et conditions météo
- Relevé des témoins présents

**5. Prélèvements** :
- Prélèvement sanguin sur la victime décédée pour alcoolémie (médecin légiste)
- Conservation de l'éthylomètre de service et vérification`
      },
      {
        num: 2,
        enonce: 'Comment établissez-vous l\'alcoolémie du conducteur décédé ? Existe-t-il une infraction caractérisée même si le conducteur est décédé ?',
        bareme: 4,
        corrige: `**Établissement de l'alcoolémie sur le conducteur décédé** :
- **Prélèvement sanguin** réalisé par le médecin légiste lors de l'autopsie (art. 74 CPP)
- Analyse toxicologique complète (alcool, stupéfiants)
- Le résultat est consigné dans le rapport d'autopsie

**⚠️ Le décès du conducteur éteint l'action publique** le concernant (art. 6 CPP — mort de l'auteur). Il ne peut donc pas être poursuivi pénalement.

**Conséquences civiles** :
- La succession de M. SIMON peut être tenue responsable civilement
- La victime M. TABET peut se constituer partie civile contre les héritiers
- L'assurance du véhicule intervient pour l'indemnisation

**Recherche de complicité ou de responsabilité tierce** :
- Si quelqu'un a fourni de l'alcool à M. SIMON en sachant qu'il allait conduire → complicité potentielle
- Si défaut d'entretien du véhicule imputable à un tiers → responsabilité éventuelle`
      },
      {
        num: 3,
        enonce: 'M. TABET, survivant, déclare que c\'était lui qui conduisait au moment de l\'accident, pas M. SIMON. Comment gérez-vous cette déclaration ?',
        bareme: 4,
        corrige: `**Cette déclaration modifie profondément l'enquête** :

**Mesures immédiates** :
1. **Constatations médicales** : comparer les blessures de M. TABET avec la position conducteur/passager (blessures au thorax pour le conducteur si ceinture → airbag, blessures aux membres inférieurs différentes…)
2. **Expertise du véhicule** : position du siège conducteur, rétroviseur, ceintures déclenchées…
3. **Analyse de la scène** : traces de sang sur le siège conducteur/passager, position d'éjection des corps
4. **Audition de M. TABET** (sous réserve de son état de santé) :
   - Avec notification des droits (art. 61-1 CPP) car il s'accuse d'un acte pouvant être infractionnel
   - Droit au silence et à l'avocat
5. **Témoins** : recueillir témoignages (ont-ils vu qui conduisait ?)
6. **Analyse des téléphones** : géolocalisation, derniers appels passés

**Qualification potentielle pour M. TABET** :
- Si M. TABET conduisait avec un taux d'alcool prohibé → homicide involontaire aggravé (art. 221-6 al. 2 CP) → **7 ans + 100 000 €**
- Placement en GAV possible après son rétablissement (avec avis médical)`
      }
    ]
  },
  {
    id: 'cp-6',
    titre: 'Vol à main armée — Enquête et dessaisissement',
    epreuve: 'ep2',
    difficulte: 3,
    dureeEstimee: 35,
    isPro: true,
    scenario: `Il est 10h15. Deux individus cagoulés et armés de pistolets ont braqué la bijouterie "Or & Diamants" au centre-ville. Ils ont contraint les bijoutiers à s'allonger, menacé les clients, emporté pour environ 280 000 € de bijoux et ont pris la fuite à bord d'une berline noire. Les services de police arrivent sur les lieux 8 minutes après l'alerte. Deux témoins ont noté partiellement la plaque du véhicule.`,
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez l\'infraction et expliquez pourquoi ce dossier pourrait être dessaisi au profit d\'un autre service.',
        bareme: 4,
        corrige: `**Qualification** : Vol à main armée en réunion (art. 311-8 et 311-9 CP)

**Éléments** :
- Vol (soustraction frauduleuse — art. 311-1) aggravé par :
  - En **réunion** (plusieurs auteurs) — art. 311-9
  - Avec **arme véritable** (pistolets) — art. 311-8 → **crime**
  
**Peine encourrue** : **15 ans de réclusion criminelle** (art. 311-8), pouvant aller jusqu'à 20 ans si autres aggravantes

**Dessaisissement** :
- Il s'agit d'un crime grave (vol à main armée)
- **Règles de compétence** : les affaires criminelles complexes sont souvent transférées à des services spécialisés :
  - **BRPE** (Brigade de Répression du Banditisme) ou **BAC** locale
  - **SRPJ** (Service Régional de Police Judiciaire) ou **OCRVP** (Office Central de lutte contre la Criminalité liée aux Véhicules volés et au trafic de Petrol…)
  - **JIRS** si bande organisée suspectée
- Dessaisissement : décision du Procureur de la République qui peut se dessaisir au profit d'un PR plus compétent ou ouvrir une information judiciaire`
      },
      {
        num: 2,
        enonce: 'Comment exploitez-vous les témoignages et les images de vidéosurveillance dans les premières heures ?',
        bareme: 4,
        corrige: `**Exploitation des témoignages** :

**Immédiatement** :
1. **Identification et séparation** des témoins (éviter qu'ils communiquent entre eux)
2. **Auditions rapides** pour chaque témoin : description physique des auteurs (taille, corpulence, vêtements, voix, démarche…), description du véhicule (couleur, marque, plaque)
3. **Reconnaissance** : si un des témoins peut identifier les auteurs → procédure de présentation de photos ou défilé de suspects

**Exploitation des caméras** :
1. **Identification des caméras** : commerces, banques, espaces publics dans un rayon de 500m à 1km
2. **Réquisitions** aux gérants/propriétaires pour remise des enregistrements (art. 60-1 CPP)
3. **Sécurisation** des enregistrements (durée de conservation souvent courte → urgence absolue)
4. **Analyse chronologique** des images pour reconstituer le trajet des auteurs
5. **Plaque partielle** : rapprochement avec les fichiers SIV (Système d'Immatriculation des Véhicules) pour identifier les véhicules correspondant à la description

**Réquisitions aux autorités** :
- Réquisition aux sociétés d'autoroute (passage d'un péage)
- LAPI (Lecture Automatique de Plaques d'Immatriculation)`
      },
      {
        num: 3,
        enonce: 'Une heure après les faits, un véhicule correspondant à la description est intercepté à 30 km. Deux individus sont à bord dont un en possession d\'un pistolet. Quelle procédure appliquez-vous ?',
        bareme: 4,
        corrige: `**Situation** : Les deux individus sont pris dans le "temps très voisin de l'action" → **flagrance** maintenue (art. 53 CPP — poursuivi par la clameur publique + trouvés en possession d'objets suspects)

**Interpellation** :
1. **Sécuriser l'interpellation** : renforts, gilets pare-balles (individus armés)
2. **Maîtrise et menottage** des suspects
3. **Extraction du véhicule** selon les règles de sécurité (arme à bord)
4. **Sécurisation de l'arme** : ne pas la manipuler inutilement (empreintes), la saisir avec précaution

**Placement en GAV** (art. 63 CPP) :
- Infraction : vol à main armée = crime → GAV possible immédiatement
- Information immédiate du PR

**Perquisition du véhicule** (art. 56 CPP) :
- En flagrance, perquisition du véhicule sans autorisation judiciaire
- Recherche des bijoux volés, des armes, des cagoules, des vêtements

**Saisies** :
- Arme (mise sous scellés + expertise balistique)
- Bijoux éventuels (rapprochement avec le listing des bijoux volés)
- Espèces, téléphones, tout objet lié à l'infraction

**Notification immédiate** : informer le PR et les victimes de l'avancée de l'enquête`
      }
    ]
  },
  {
    id: 'cp-7',
    titre: 'Usurpation d\'identité et escroquerie en ligne',
    epreuve: 'ep2',
    difficulte: 2,
    dureeEstimee: 25,
    isPro: false,
    scenario: `Mme BLANC Camille, 45 ans, se présente à votre commissariat. Elle déclare avoir reçu plusieurs mails de son prétendu banquier lui demandant de communiquer ses codes d'accès bancaires. Elle a obtempéré et constate maintenant le virement non autorisé de 12 000 € de son compte vers un compte inconnu. Elle vous remet les captures d'écran des échanges.`,
    questions: [
      {
        num: 1,
        enonce: 'Qualifiez les faits juridiquement. Distinguez les infractions susceptibles d\'être retenues.',
        bareme: 4,
        corrige: `**Qualification des faits** :

**1. Phishing / hameçonnage → Escroquerie** (art. 313-1 CP) :
- Emploi d'une **fausse qualité** (faux banquier) et de **manœuvres frauduleuses** (e-mail frauduleux, faux site bancaire)
- Victime déterminée à remettre ses codes d'accès (prestation de service = accès au compte)
- Peine : **5 ans + 375 000 €**

**2. Accès frauduleux à un système de traitement automatisé de données (STAD)** (art. 323-1 CP) :
- Utilisation des codes pour accéder au compte bancaire sans autorisation
- Peine : **3 ans + 60 000 €** (+ si suppression/modification de données)

**3. Vol ou détournement de fonds** :
- Virement non autorisé = possible assimilation à un vol ou abus de confiance selon les circonstances

**4. Usurpation d'identité** (art. 226-4-1 CP) :
- Si l'auteur s'est fait passer pour le banquier en utilisant son nom ou ses coordonnées → usurpation d'identité
- Peine : **1 an + 15 000 €**

**⚠️ Infractions en concours** : l'auteur peut être poursuivi pour plusieurs infractions cumulativement.`
      },
      {
        num: 2,
        enonce: 'Quelles réquisitions allez-vous effectuer pour identifier l\'auteur de cette escroquerie ?',
        bareme: 4,
        corrige: `**Réquisitions à effectuer** :

**1. Opérateurs téléphoniques et fournisseurs d'accès internet** (art. 60-1 CPP) :
- Identification de l'adresse IP émettrice des e-mails frauduleux
- Données de connexion (date, heure, durée de connexion)

**2. Hébergeur du faux site / plateforme mail** :
- Si le phishing passe par un site frauduleux → réquisition à l'hébergeur (souvent à l'étranger → entraide judiciaire internationale)
- Logs de connexion

**3. Établissement bancaire de la victime** :
- Relevés de compte détaillés (date, heure, montant, références du virement)
- Compte destinataire du virement frauduleux

**4. Banque destinataire du virement** :
- Identité du titulaire du compte bénéficiaire
- Adresse, pièces d'identité utilisées à l'ouverture du compte

**5. Plateforme d'intermédiation** (si virement via Paypal, Lydia, etc.) :
- Identité et adresse IP du bénéficiaire

**Signalement** :
- THESEE (plateforme de signalement des escroqueries numériques) pour centraliser l'enquête
- Rapprochement avec d'autres victimes (enquête de série probable)`
      }
    ]
  },
  {
    id: 'cp-8',
    titre: 'Mineur mis en cause — Procédure adaptée',
    epreuve: 'ep2',
    difficulte: 2,
    dureeEstimee: 25,
    isPro: false,
    scenario: `Il est 16h30. Deux mineurs sont interpellés en flagrant délit de vol à l'étalage dans un grand magasin. DUPONT Lucas, 15 ans, et BENALI Yanis, 17 ans, sont amenés au commissariat par les agents de sécurité du magasin. Lucas a volé des jeux vidéo pour une valeur de 180 €, Yanis des vêtements pour 95 €. Aucun antécédent connu pour Lucas ; Yanis a déjà été condamné pour des faits similaires il y a 8 mois.`,
    questions: [
      {
        num: 1,
        enonce: 'Quelle procédure spécifique s\'applique pour chaque mineur ? Comparez les régimes.',
        bareme: 5,
        corrige: `**Pour DUPONT Lucas (15 ans)** :
- Relève du **Code de la justice pénale des mineurs (CJPM)** entré en vigueur le 30/09/2021
- Infraction : vol à l'étalage (art. 311-1 CP) → délit
- **GAV possible** : Lucas a 15 ans → infraction punie d'emprisonnement (vol → 3 ans) mais < 5 ans → **GAV possible si ≥ 5 ans** selon le CJPM pour 13-16 ans
  - Vol simple = 3 ans → en principe, **retenue de 12h maximum** (pas de GAV) pour les 13-16 ans si infraction < 5 ans
  - Ou mesure de retenue (art. L.413-13 CJPM)
- **Représentant légal informé immédiatement**
- **Avocat de droit** dès le début
- **Examen médical obligatoire**

**Pour BENALI Yanis (17 ans)** :
- Relève aussi du CJPM
- **GAV possible** comme les adultes (infraction punie d'emprisonnement + 16-18 ans)
- Durée standard : 24h + 24h si nécessaire
- **Récidive** : ya eu déjà une condamnation il y a 8 mois → en cas de récidive légale, peine pouvant être aggravée

**Dans les deux cas** :
- Représentants légaux **informés immédiatement** (art. L.413-9 CJPM)
- Droit à l'avocat (avocat spécialisé enfants si possible)
- **Pas de détention avec des adultes**
- Orientation vers juge des enfants ou tribunal pour enfants`
      },
      {
        num: 2,
        enonce: 'Yanis est agité et refuse de coopérer. Que faites-vous ? Pouvez-vous le placer en GAV ?',
        bareme: 3,
        corrige: `**Conduite à tenir face au refus de coopération** :

1. **Calme et fermeté** : ne pas s'énerver, maintenir le cadre
2. **Contact avec les représentants légaux** : informer les parents ou tuteurs (ils peuvent venir au commissariat)
3. **Avocat** : Yanis a droit à un avocat dès le début → l'avocat peut aider à la communication

**Placement en GAV de Yanis (17 ans)** :
- **OUI**, la GAV est possible pour un mineur de 16 à 18 ans selon le régime de droit commun
- Condition : infraction punie d'au moins **1 an d'emprisonnement** (vol = 3 ans ✓)
- Durée : **24h** + 24h sur autorisation du PR

**Conditions supplémentaires** :
- **Examen médical obligatoire** (certificat médecin)
- **Représentants légaux informés** avant toute audition si possible
- **Pas de cellule avec des adultes**
- Droits notifiés en présence de l'avocat si besoin

**⚠️** Le refus de coopérer n'empêche pas la procédure. L'audition peut se tenir avec l'avocat présent, les réponses sont facultatives (droit au silence).`
      },
      {
        num: 3,
        enonce: 'Quelles suites judiciaires sont envisageables pour chaque mineur ?',
        bareme: 3,
        corrige: `**Pour DUPONT Lucas (15 ans, primo-délinquant)** :
- **Classement avec rappel à la loi** (si valeur faible + primo-délinquant + remords)
- **Mesure éducative judiciaire (MEJ)** → juge des enfants
- **Convocation devant le tribunal pour enfants** avec délai éducatif
- Mesures éducatives : avertissement judiciaire, stage de citoyenneté…

**Pour BENALI Yanis (17 ans, récidiviste)** :
- Situation plus grave : récidive dans les 5 ans (vol → vol) → peine doublée possible
- **Convocation devant le tribunal pour enfants** ou comparution immédiate selon la gravité
- Possibilité de **mesure de placement provisoire** si risque de réitération
- Orientations possibles : suivi probatoire, stage, TIG (travail d'intérêt général adapté aux mineurs)

**Pour les deux** :
- Restitution des objets volés au grand magasin
- **Indemnisation de la victime** (grande surface) recommandée ou ordonnée
- Mesures à l'égard des parents (information, éventuellement amende pour les parents dans certains cas)`
      }
    ]
  },
  {
    id: 'cp-9',
    titre: 'Réquisitions et nullités de procédure',
    epreuve: 'ep2',
    difficulte: 3,
    dureeEstimee: 30,
    isPro: true,
    scenario: `Au cours d'une enquête préliminaire pour vol aggravé, vous avez réalisé une perquisition au domicile du suspect M. AZAR Farid sans obtenir son assentiment et sans autorisation du juge des libertés et de la détention. Lors de la perquisition, vous avez découvert et saisi plusieurs objets volés. L'avocat de M. AZAR vous demande des explications sur la légalité de la procédure.`,
    questions: [
      {
        num: 1,
        enonce: 'La perquisition est-elle légale ? Expliquez le régime juridique applicable.',
        bareme: 5,
        corrige: `**La perquisition est ILLÉGALE** dans les conditions décrites.

**Régime de la perquisition en enquête préliminaire (art. 76 CPP)** :
- En enquête préliminaire, la perquisition **nécessite l'assentiment exprès** de la personne chez qui elle est réalisée (principe)
- **Exception** (art. 76 al. 4 CPP) : l'OPJ peut demander au **JLD** l'autorisation de perquisitionner sans assentiment si :
  - Infraction punie d'au moins **5 ans** d'emprisonnement
  - Et si l'assentiment ne peut pas être obtenu ou est refusé

**En l'espèce** :
- Pas d'assentiment de M. AZAR → condition non remplie
- Pas d'autorisation du JLD → condition non remplie
- La perquisition est donc **illégale**

**⚠️ Important** : même si l'infraction est un vol aggravé (≥ 5 ans), la procédure d'autorisation par le JLD était nécessaire.

**Distinction avec la flagrance** : en enquête de flagrance, la perquisition est possible sans ces conditions (art. 56 CPP). Mais ici, on est en **enquête préliminaire**.`
      },
      {
        num: 2,
        enonce: 'Quelles sont les conséquences juridiques de cette irrégularité ? Quelle est la procédure pour faire annuler des actes ?',
        bareme: 5,
        corrige: `**Conséquences de l'irrégularité** :

**1. Nullité de la perquisition** (art. 171 et 802 CPP) :
- L'irrégularité procédurale porte nécessairement atteinte aux intérêts de M. AZAR (violation de son domicile et de sa vie privée)
- La perquisition peut être **annulée** par la chambre de l'instruction

**2. Nullité dérivée** (théorie des fruits empoisonnés) :
- Si la perquisition est annulée → les **saisies réalisées** lors de la perquisition illégale sont elles aussi annulées
- Les objets saisis sont restitués

**3. Impact sur la procédure** :
- Si les objets saisis étaient les seules preuves → l'accusation peut s'effondrer
- Les aveux obtenus grâce à ces saisies illégales pourraient également être contestés

**Procédure d'annulation** :
1. L'avocat de M. AZAR dépose une **requête en nullité** devant la chambre de l'instruction (art. 173 CPP)
2. La chambre de l'instruction examine la régularité de l'acte
3. Si elle annule → retranchement de l'acte nul du dossier (art. 174 CPP)
4. **Délai** : la requête doit être présentée avant tout jugement au fond

**Leçon pratique** : en enquête préliminaire, **TOUJOURS obtenir l'assentiment ou l'autorisation du JLD** avant de perquisitionner.`
      }
    ]
  },
  {
    id: 'cp-10',
    titre: 'Décès en garde à vue — Responsabilité et procédure',
    epreuve: 'ep2',
    difficulte: 3,
    dureeEstimee: 35,
    isPro: true,
    scenario: `M. COLAS Raphaël, 41 ans, est placé en garde à vue à 9h00 pour conduite sous l'emprise d'alcool (taux de 2,1 g/L). À 14h30, lors d'un passage en cellule, il est trouvé inconscient. Les secours sont appelés immédiatement mais M. COLAS décède à l'hôpital à 16h15. L'autopsie révèle une intoxication éthylique aiguë et un traumatisme crânien probablement antérieur à la GAV.`,
    questions: [
      {
        num: 1,
        enonce: 'Quelles obligations pesaient sur vous concernant la surveillance de M. COLAS ? Avez-vous respecté ces obligations ?',
        bareme: 5,
        corrige: `**Obligations de surveillance de la personne en GAV** :

**1. Obligation de surveillance permanente** :
- Les personnes en GAV doivent être **surveillées de manière permanente** et régulière
- Des rondes régulières dans les cellules (fréquence à définir selon le règlement intérieur : généralement toutes les 30 minutes minimum)

**2. Examen médical** :
- M. COLAS présentait un taux d'alcoolémie de 2,1 g/L → **examen médical obligatoire** recommandé immédiatement
- En présence d'ivresse manifeste, l'OPJ doit **impérativement** faire examiner la personne par un médecin
- Le médecin aurait pu détecter le traumatisme crânien préexistant

**3. Information du PR** :
- Le PR doit être informé si l'état de santé de la personne se dégrade

**4. Obligation de secours** :
- Art. 223-6 CP : l'OPJ qui ne porte pas secours à une personne en danger commet un délit de non-assistance à personne en danger

**En l'espèce** :
- Si l'examen médical n'a pas été réalisé malgré le taux d'alcoolémie → manquement potentiel
- Si les rondes n'ont pas été suffisamment fréquentes → manquement à l'obligation de surveillance
- Si le traumatisme crânien était décelable → responsabilité potentielle`
      },
      {
        num: 2,
        enonce: 'Quelles sont les procédures à mettre en œuvre après le décès de M. COLAS ?',
        bareme: 5,
        corrige: `**Procédures immédiates** :

**1. Information du Procureur de la République** (immédiatement) :
- Décès d'une personne en GAV → notification urgente et prioritaire au PR
- Le PR dirige les opérations

**2. Préservation des lieux** :
- La cellule où M. COLAS a été trouvé inconscient devient une **scène de constatation**
- Préservation en l'état (ne rien toucher, ne rien nettoyer)
- Photos immédiates

**3. Autopsie médicolégale** :
- Ordonnée par le PR (art. 74 CPP)
- Déterminer la cause exacte du décès (alcool ou traumatisme crânien ?)
- Prélèvements toxicologiques complémentaires

**4. Enquête interne** :
- **IGPN (Inspection Générale de la Police Nationale)** est automatiquement saisie en cas de décès en GAV
- Enquête administrative distincte de l'enquête pénale

**5. Information de la famille** :
- Notification du décès à la famille de M. COLAS dans les meilleurs délais, avec tact et délicatesse

**6. Auditions du personnel** :
- Audition de chaque agent ayant été en contact avec M. COLAS (avec leurs droits si mis en cause)
- Reconstitution chronologique des événements

**7. Registre de GAV** :
- Le registre de GAV doit être consulté (mentions des rondes, état de la personne…)
- Peut être communiqué au PR et à la chambre de l'instruction

**Responsabilités potentielles** :
- Pénale (homicide involontaire par négligence grave) si manquement caractérisé
- Civile (État responsable des fautes des fonctionnaires)
- Disciplinaire (IGPN)`
      }
    ]
  }
];
