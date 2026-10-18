# Informations et approbations requises

Rien ci-dessous n'a été inventé. Ce qui est marqué « à confirmer » provient de l'ancien site ou n'existe pas encore.

## 1. Données d'entreprise

| Élément | Valeur actuelle | Statut |
|---|---|---|
| Téléphone | +1 (450) 328-9398 | Fourni par vous (18 oct. 2026) |
| Courriel | Service@ExpertsNanoProtection.ca | Fourni par vous. **Vérifier que la boîte est active** (les formulaires y renvoient en cas de panne du CRM) |
| Heures | Tous les jours, 8 h à 20 h | Fourni par vous |
| Régions | Rive-Sud de Montréal, Saguenay-Lac-Saint-Jean, grande région de Sherbrooke | Fourni par vous. J'ai écrit « Nous desservons plusieurs régions du Québec » et non « l'ensemble du Québec », car trois régions sont listées |
| Nom de domaine | `expertsnanoprotection.ca` (déduit du courriel) | **À confirmer.** Modifiable avec `NEXT_PUBLIC_SITE_URL`. Garder `expertsnanoplus.com`? |
| Nom légal / NEQ | Les Experts Nano Protection Toitures | À confirmer (REQ) |
| Licence RBQ | 1254-8794-00 (de l'ancien site) | **Affichée dans le pied de page avec le logo de la RBQ.** Vérifier sur le registre de la RBQ que ce numéro appartient bien à la nouvelle raison sociale et couvre les travaux offerts |
| Assurance | non publiée | Fournir les renseignements réels |
| Statut GoNano | « Revendeur et installateur autorisé » (d'après votre bandeau) | Garder la preuve écrite de l'autorisation d'utiliser la marque |
| Adresse | aucune (service à domicile) | Choisir: publique ou zone de service seulement |

## 2. Contenu à fournir

- **Témoignages réels** avec autorisation écrite (`src/content/projects.ts`). La carte « Ce que disent nos clients » est
  construite et se remplit toute seule; elle reste cachée en production tant qu'il n'y en a pas.
  Les témoignages et les économies chiffrées de l'ancien site, et ceux de votre capture d'exemple, **ne sont pas repris**:
  dites-moi s'ils sont réels et approuvés, et je les ajoute.
- Photos originales (maisons, techniciens, application, projets datés) et projets avant/après.
- Équipe vérifiée pour la page À propos.
- Auteur et réviseur des articles du blogue (champ `author`), et sources crédibles.

## 3. Éléments à valider auprès de GoNano

- **Nom du produit « Bio-Boost »**: vos diapositives disent « Bio-Boost », mais le document de garantie dit « Boost » (traitement de
  transition). J'écris « NuRoof Bio-Boost » avec la note « désigné Boost dans les conditions de garantie ». Confirmer le nom officiel.
- **Tableau de performance**: chaque critère montre trois marques (✓✓✓, ✓✓✗, etc.). Je les ai affichées comme « niveaux sur 3 ».
  **Confirmer la signification exacte de l'échelle.**
- **Tableau des essais** (UL 2218 classe 3+, ASTM D3161 à 177 km/h, « prouvé scientifiquement », etc.): ce sont des affirmations du
  fabricant, étiquetées comme telles. Demander les **rapports d'essai** et l'autorisation de les citer.
- **Photos au microscope et schémas des particules**: confirmer l'autorisation de les publier (provenance GoNano).
- **Garantie**: le PDF est lié tel quel (en français). L'anglais renvoie au même PDF, libellé « in French ». Une version anglaise officielle?
- La présentation « Quick Start » (88 Mo, PDF) n'a pas pu être lue ici: son contenu n'est pas intégré. Dites-moi quelles pages utiliser.

## 4. Engagements que vous avez demandés

- « Réponse garantie en 24 h » apparaît sous les boutons de demande, dans la FAQ et la page de contact. C'est un engagement de
  l'entreprise: assurez-vous de pouvoir le tenir.
- « Aucuns frais, aucun engagement »: confirmé par vous. À garder cohérent avec la pratique réelle.
- Non repris des sites de comparaison: « 10 000+ clients », « Économisez jusqu'à 80 % », « 15 ans de garantie max ».
  Aucune statistique ni économie chiffrée n'est publiée sans source.

## 5. Accès et identifiants

| Service | Variable | Notes |
|---|---|---|
| GoHighLevel | `GHL_API_KEY`, `GHL_LOCATION_ID` | Jeton d'intégration privée, portée `contacts.write` |
| GA4 / GTM | `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_GTM_ID` | Facultatif |
| Google Search Console | vérification de domaine | Après le choix du domaine |
| Hébergement | Vercel | Déjà utilisé pour l'aperçu |

## 6. Validations juridiques

Pages légales (français et anglais): versions de travail. À faire valider (Loi 25, LCAP, Charte de la langue française).
Désigner la personne responsable des renseignements personnels. Confirmer la durée de conservation.

## 7. Décisions à prendre

1. Domaine de production et plan de migration.
2. Blogue: les articles sont des fichiers Markdown (voir `content/blog/README.md`). Un éditeur visuel (Decap CMS ou Tina) est possible plus tard.
3. Téléversement de photos dans les formulaires: non construit.
4. **Seconde page d'accueil cachée (point 12 de votre liste): en attente de vos explications.**
5. Autorisation de mise en ligne. Rien n'est publié ni remplacé sans votre accord explicite.

## 7. V3: points à confirmer

- **Liens de profils**: Facebook, Google, Instagram, LinkedIn et lien Google Maps (`src/config/business.ts`, `socials`, `googleMapsUrl`). Les icônes du pied de page s'affichent en pointillé (staging seulement) tant que l'URL est vide; elles alimentent aussi `sameAs` dans le balisage.
- **Zones de service du widget**: préfixes postaux (FSA) à approuver, voir `docs/COVERAGE.md`. Tant que la liste est vide, le widget répond « à confirmer ».
- **Fiche technique de Fortify**: la fiche fournie est publiée sous le nom « Shingle Saver ». Confirmer qu'il s'agit bien de NuRoof Fortify.
- **« Jusqu'à 15 ans »** (bandeau de statistiques): la garantie officielle indique jusqu'à 20 ans (+5 ans grêle) pour Fortify Elite. Confirmer le chiffre voulu.
- **« N'annule pas les garanties des autres fabricants »**: le texte publié reprend uniquement la clause de la garantie (art. 7). Pour une phrase plus forte, obtenir une déclaration écrite de GoNano.
- **Écoresponsabilité**: Bio-Boost et Revive selon les fiches; Fortify est à base de solvant et n'est pas présenté comme écologique.
- **Dragons' Den**: le texte dit seulement que la technologie GoNano a été présentée. Photo officielle facultative: `public/photos/dragons-den.jpg`.
- **Options du widget** (béton/bois, membrane élastomère, réparation/remplacement): implémentées comme demandé; Wood Saver est discontinué et la réparation contredit le positionnement. À valider.
- **Concrete Saver**: non inclus; recommandation dans le rapport final.
- **Page `/gohighlevel`**: française seulement, non indexée, absente du sitemap.

## 8. V4: points à confirmer

- **Liens de profils**: Facebook, Google, Instagram, Yelp et LinkedIn sont en place (icônes violettes). Il reste le lien Google Maps (`googleMapsUrl`). Le lien Google fourni est un lien de partage (`share.google`); le lien direct de la fiche serait préférable pour le balisage.
- **Réponse directe sur le secteur (widget)**: la ville est maintenant détectée à partir des 3 premiers caractères du code postal (service externe zippopotam.us, sans transmettre l'adresse ni le code complet). La réponse « Bonne nouvelle! » reste désactivée tant que les préfixes desservis ne sont pas approuvés (`docs/COVERAGE.md`). **Décision requise**: liste de préfixes, ou règle « tout le Québec sauf... ».
- **Adresse**: le champ utilise l'autocomplétion du navigateur. Une vraie suggestion d'adresses exige un service (Google Places ou Canada Post AddressComplete) et une clé API.
- **Questions sur l'état de la toiture**: non ajoutées (trop de friction). Seul l'âge approximatif est offert, en option.
- **Garantie**: le bandeau indique maintenant « jusqu'à 20 ans ».
- **Politique de confidentialité**: mentionner la recherche de ville par code postal partiel.
