# Informations et approbations requises

Rien ci-dessous n'a été inventé. Chaque élément marqué « à confirmer » provient de l'ancien site
(expertsnanoplus.com) ou n'existe pas encore, et reste visible comme tel sur le site de pré-production.

## 1. Données d'entreprise à confirmer (`src/config/business.ts`)

| Élément | Valeur actuelle | Statut |
|---|---|---|
| Nom légal / nom d'affaires | Les Experts Nano Protection Toitures | À confirmer (enregistrement au REQ, NEQ) |
| Licence RBQ | 1254-8794-00 (de l'ancien site) | **À vérifier sur le registre de la RBQ pour le nouveau nom.** N'est affichée en production que lorsque `verify: false` |
| Assurance responsabilité | non publiée | Fournir les renseignements réels |
| Relation avec GoNano / certification d'applicateur | « Applicateur GoNano » | Confirmer par écrit l'autorisation d'utiliser la marque et les noms de produits |
| Téléphone / courriel / heures | 438 900-4886, service@expertsnanoplus.com, lun-sam 8 h-18 h | À confirmer pour la nouvelle marque |
| Adresse | aucune (entreprise de service, pas de vitrine) | Choisir: adresse publique ou zone de service seulement (règles Google Business Profile) |
| Régions desservies | Québec et environs, Saguenay-Lac-Saint-Jean, Grand Montréal | À confirmer. Retirer toute région non desservie |
| Délai de réponse | non publié | L'ancien site promettait 24 h: ne l'afficher qu'après confirmation |
| Garanties | langage conditionnel seulement | Fournir les documents officiels de garantie GoNano |

## 2. Contenu réel à fournir

- Logo vectoriel (SVG) ou PNG transparent de la nouvelle marque. Le logo fourni dans la conversation
  n'existait que comme image; le site utilise la marque (maison et nœuds) du logo de l'ancien site, avec
  le nom en texte réel. Le logo « Nano Plus » complet n'est **pas** utilisé (mauvais nom).
- Photos originales: maisons, techniciens, inspections, application, vrais contenants GoNano
  (avec permission du fabricant), projets terminés avec date.
- Projets réels avant/après et témoignages avec autorisation écrite (`src/content/projects.ts`).
- Membres de l'équipe vérifiés pour la page À propos.
- Documentation du fabricant: fiches techniques, fiches de données de sécurité, conditions de garantie.
- Prix réels si vous souhaitez activer l'estimateur (`pricing` dans `business.ts`). Désactivé par défaut.
- Articles: auteur nommé, révision par un expert, sources crédibles ajoutées (`sources: []` est vide).

## 3. Accès et identifiants

| Service | Variable | Notes |
|---|---|---|
| GoHighLevel | `GHL_API_KEY`, `GHL_LOCATION_ID` | Jeton d'intégration privée avec la portée `contacts.write` |
| GA4 | `NEXT_PUBLIC_GA_ID` | Facultatif |
| Google Tag Manager | `NEXT_PUBLIC_GTM_ID` | Facultatif (a priorité sur GA4) |
| Google Search Console | vérification de domaine | Après le choix du domaine |
| Hébergement | compte Vercel (ou équivalent) | Voir `docs/INTEGRATIONS-AND-QA.md` |
| Domaine | à décider | Garder expertsnanoplus.com ou changer. Voir `docs/SEO-AND-MIGRATION.md` |

## 4. Validations juridiques et techniques

- Les pages Confidentialité, Conditions, Témoins et Mentions légales sont des **versions de travail**.
  À faire valider par un juriste (Loi 25, LCAP/CASL, Charte de la langue française).
- Désigner la personne responsable de la protection des renseignements personnels (obligatoire, Loi 25).
- Confirmer la durée de conservation des données et les fournisseurs situés hors Québec.
- Vérifier avec la RBQ si la licence couvre les travaux offerts.
- Vérifier avec l'Office québécois de la langue française les exigences applicables à l'affichage et aux marques.

## 5. Décisions requises de votre part

1. Domaine de production et plan de migration.
2. CMS: rester sur des fichiers éditables via GitHub, ou installer Decap CMS / Tina (nécessite OAuth GitHub).
3. Version anglaise (`en-CA`): non construite. À décider.
4. Téléversement de photos dans les formulaires: non construit (voir `INTEGRATIONS-AND-QA.md`).
5. Autorisation de mise en ligne. Rien n'est publié ni remplacé sans votre accord explicite.
