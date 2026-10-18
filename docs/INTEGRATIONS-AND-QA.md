# Intégrations, déploiement et rapport de QA

Date du rapport: 9 octobre 2026. Environnement testé: Windows 11, Node 24 LTS, Next.js 16.4.

## GoHighLevel

Flux: formulaire (Contact ou Évaluation) → validation Zod côté client **et** serveur → `POST /api/lead` →
`POST /contacts/upsert` puis `POST /contacts/{id}/notes` (API LeadConnector v2, `Version: 2021-07-28`).

Variables (serveur seulement): `GHL_API_KEY` (jeton d'intégration privée, portée `contacts.write`), `GHL_LOCATION_ID`.

Sécurité et fiabilité: champ piège (honeypot), délai minimal de soumission, limite de 5 envois par 10 minutes par IP,
anti-doublon sur 10 minutes, jetons jamais exposés au navigateur, journaux sans données personnelles.
Si le CRM échoue: **le site ne dit jamais « envoyé »**. Il affiche l'erreur et le téléphone/courriel de repli (HTTP 502/503).

Capture: nom, courriel, téléphone, code postal, ville, intérêt, contact préféré, message, consentement (dont consentement
marketing distinct, non coché par défaut), UTM, page d'entrée, référent, réponses de l'évaluation (en note).

### Comment tester avec votre compte

1. Créer un jeton d'intégration privée dans GoHighLevel (Paramètres > Intégrations privées), portée `contacts.write`.
2. Copier l'ID de la sous-compte (location).
3. `.env.local`: `GHL_API_KEY=...` et `GHL_LOCATION_ID=...`, puis `npm run dev`.
4. Soumettre le formulaire de contact; vérifier le contact, ses étiquettes (`site-web`, `contact`…) et la note.
5. Tester l'échec: mettre un jeton invalide et confirmer le message d'erreur et l'absence de redirection vers `/merci`.
6. Si votre configuration utilise des champs personnalisés, ajoutez-les dans `src/lib/ghl.ts` (`customFields` exige leurs identifiants).

**Limite connue:** la limite de débit et l'anti-doublon sont en mémoire (par instance serveur). Sur un hébergement sans
état, les brancher sur un stockage partagé (KV/Redis) si le volume l'exige.

**Non construit:** le téléversement de photos. Les formulaires invitent à envoyer les photos par courriel. Un vrai
téléversement exige un stockage chiffré, un antivirus et une politique de conservation (Loi 25): décision à prendre.

## Analytique et plan de mesure

GA4 / GTM se chargent **uniquement après acceptation** (bannière avec Refuser aussi visible que Accepter).
Si aucun identifiant n'est configuré, aucune bannière n'apparaît. Événements (`dataLayer`):
`quote_form_start`, `quote_submit`, `phone_click`, `email_click`, `assessment_complete`, `estimator_interaction`,
`preferred_source_click` (déclaré, non branché).
Indicateurs: clics et impressions organiques, requêtes, recherches de marque, demandes locales, taux de conversion
du formulaire, leads qualifiés, appels, pages d'atterrissage, Core Web Vitals (Search Console).

Surveillance recommandée: disponibilité (UptimeRobot ou équivalent), journaux d'erreurs de l'hébergeur, suivi des
soumissions dans GoHighLevel, sitemap dans Search Console, sauvegarde = dépôt GitHub.

## Déploiement

Recommandé: Vercel (supporte Next.js et les routes serveur). Domaine, DNS et accès à vos comptes requis (voir `PENDING-INFO.md`).
1. Importer le dépôt dans Vercel, variables d'environnement selon `.env.example`.
2. Pré-production: laisser `NEXT_PUBLIC_INDEXABLE=false`.
3. Au lancement approuvé: `NEXT_PUBLIC_INDEXABLE=true`, `NEXT_PUBLIC_SITE_URL` du vrai domaine, **reconstruire**.
4. Soumettre `/sitemap.xml` dans Search Console.

**Non effectué:** aucun déploiement, aucun changement de DNS, aucune modification du site en ligne.

## CMS

Aucun CMS visuel installé. Le contenu se modifie dans `src/content/*` et `src/config/business.ts`, y compris via
l'éditeur web de GitHub. Option recommandée plus tard: Decap CMS ou Tina (dépend de l'authentification GitHub).

---

## Rapport d'achèvement honnête

### Implémenté et testé
- Compilation TypeScript sans erreur; ESLint sans erreur; build de production: 31 pages statiques.
- Vérification visuelle: accueil (bureau), services/processus (bureau), accueil et menu (mobile 375 px), première étape de l'évaluation.
- Absence de débordement horizontal et un seul `h1` sur 19 routes à 375 px (test scripté).
- Évaluation: parcours scripté des 7 étapes jusqu'au résultat; validation des champs vides; état d'erreur sans CRM
  (message honnête + repli téléphone/courriel, pas de fausse confirmation).
- API `/api/lead` contre un **faux serveur GoHighLevel local** (pas le vrai): succès (upsert + note, en-têtes corrects),
  doublon, honeypot, soumission trop rapide, échec CRM (502), validation (422), limite de débit (429).
- Audit HTML de la version de production en mode pré-production: `noindex`, `robots.txt` bloquant, canoniques, JSON-LD
  (`RoofingContractor`, `BreadcrumbList`, `BlogPosting`), vrai 404, en-têtes de sécurité, 15 réponses FAQ dans le HTML,
  aucun traceur ni script Google avant consentement, bouton Preferred Sources absent par défaut.
- Contraste (calculé): tous les couples de couleurs de texte ≥ 4,5:1 (sauf mention de texte à opacité: pied de page ≥ 4,65:1).
- Aucun tiret cadratin dans le code source.

### Implémenté mais non testé
- Intégration avec le **vrai** GoHighLevel (forme des points d'accès basée sur la documentation API v2; à valider avec un compte).
- Bannière de consentement et chargement GA4/GTM (nécessitent des identifiants; non vus à l'écran).
- Bouton Preferred Sources activé; mode `NEXT_PUBLIC_INDEXABLE=true` (robots/sitemap en production).
- Curseur avant/après et galerie de projets (aucune photo réelle, composants non exercés avec des images).
- Comparateur de produits, recherche FAQ, onglets du processus (interactions non cliquées une à une).
- Pages restantes: contrôlées pour le débordement et la structure seulement, **pas inspectées visuellement**.
- Navigation clavier de bout en bout, lecteur d'écran, tablette, Safari/Firefox.

### Non testé / non mesuré
- Lighthouse, Core Web Vitals (LCP, INP, CLS): **aucune mesure**; les cibles du brief ne sont pas démontrées.
- Test des résultats enrichis Google et Schema Markup Validator.

### Non construit
- Version anglaise `en-CA` et `hreflang`, mode sombre, téléversement de photos, CMS visuel, pages locales par ville,
  schémas pédagogiques originaux (remplacés par des cartes textuelles accessibles), vidéo, passe `/impeccable`
  et revue d'animation, planches de marque (images).

### En attente d'informations de l'entreprise
Voir `PENDING-INFO.md` (RBQ, assurance, garanties, prix, photos, projets, témoignages, équipe, régions, délai de réponse).

### En attente d'identifiants externes
GoHighLevel, GA4/GTM, Search Console, hébergement, domaine.

### En attente de validation juridique ou technique
Pages légales (Loi 25, LCAP, langue française), RBQ, usage de la marque GoNano, admissibilité Preferred Sources.

---

# Rapport d'achèvement, mise à jour du 18 octobre 2026

## Implémenté et testé
- TypeScript et ESLint sans erreur; build de production: 56 pages statiques (français et anglais).
- **Routage des langues**: 18 pages publiques et leurs équivalents `/en` répondent 200; `/fr/...` redirige (308) vers l'adresse sans préfixe;
  `/conseils` redirige (301) vers `/blogue`; URL inconnues (français et anglais) renvoient un vrai 404 avec la bonne langue.
- Bouton de langue: conserve la page, l'URL française ne change pas, l'URL anglaise gagne `/en`; `lang`, titre et élément de menu actif suivent.
- **Fuites de langue**: analyse automatique du texte visible de 20 pages dans chaque langue: aucun mot français sur les pages anglaises
  ni mot anglais sur les pages françaises (le détecteur a été validé sur des pages connues).
- **Mobile 375 px**: 38 pages (19 par langue): aucun débordement horizontal, un seul `h1` chacune. Deux défauts trouvés et corrigés
  (en-tête trop large; bouton sans retour à la ligne dans la page Technologie).
- **Évaluation en anglais**: parcours complet jusqu'au résultat; messages d'erreur anglais; validation à la sortie du champ; envoi vers un
  **faux serveur GoHighLevel local** (pas le vrai): redirection vers `/en/merci`, étiquette `langue-en`, téléphone normalisé, note avec les
  réponses lisibles. Quand le CRM était arrêté: message d'échec anglais avec téléphone et courriel de repli, sans fausse confirmation.
- Menu mobile: focus déplacé à l'ouverture et rendu à la fermeture, Échap, `inert` quand fermé, fermeture symétrique.
- Vérification visuelle (bureau): estimation, Technologie (photos, particules, deux tableaux), pied de page avec certifications.

## Implémenté mais non testé
- Intégration avec le **vrai** GoHighLevel; bannière de témoins et GA4/GTM (identifiants requis); bouton Preferred Sources activé.
- Blogue: l'ajout d'un article par GitHub (fichier Markdown) n'a pas été testé sur Vercel; lecture locale testée.
- Curseur avant/après et galerie (aucune photo réelle); témoignages (aucun réel).
- Pages non inspectées visuellement: Réalisations, À propos, Zones, FAQ, liste du blogue, pages légales, à l'accueil anglais, et la page Produits en anglais. Inspectés: Produits (français, garantie), article de blogue (anglais), Contact (anglais).
- Tablette, Safari/Firefox, lecteur d'écran, navigation clavier complète.

## Non mesuré
Lighthouse, Core Web Vitals, résultats enrichis Google.

## Non construit
Photos téléversables dans les formulaires, CMS visuel, mode sombre, pages locales par ville, planches de marque (images),
**seconde page d'accueil cachée (point 12: en attente de vos explications)**.
