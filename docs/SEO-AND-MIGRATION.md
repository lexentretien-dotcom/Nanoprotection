# SEO, SEO local, Preferred Sources et migration

Les volumes de recherche ne sont **pas** inclus: ils n'ont pas été mesurés. À valider avec Google Search Console,
Google Keyword Planner ou un outil équivalent avant de prioriser.

## Carte des mots-clés (intention → page)

| Page | Intention principale | Requêtes candidates (à valider) |
|---|---|---|
| `/` | Découverte, marque + service | traitement toiture Québec, préservation de toiture |
| `/nos-traitements/rajeunissement-toiture` | Solution à une toiture usée | rajeunissement de toiture, prolonger durée de vie toiture, alternative remplacement toiture |
| `/nos-traitements/protection-preventive` | Protéger une toiture récente | protection toiture, protection bardeaux d'asphalte |
| `/nos-traitements/inspection-evaluation` | Savoir où en est la toiture | inspection de toiture, évaluation de toiture |
| `/technologie-gonano`, `/nos-produits` | Comprendre le produit | toiture GoNano, GoNano NuRoof, nanotechnologie toiture |
| `/conseils/*` | Information | durée de vie bardeau d'asphalte, signes de vieillissement d'une toiture, hiver et toiture |
| `/zones-desservies` | Local | traitement toiture + région (seulement les régions réellement desservies) |
| `/estimation`, `/contact` | Conversion | évaluation gratuite toiture |

Chaque intention a une seule page principale (pas de pages concurrentes). **Hydrofuge** n'a pas de page: service
non confirmé (`confirmed: false`).

Non fait volontairement: pages de villes en série, bureaux fictifs, doublons de gabarit.
Pages locales seulement quand elles peuvent contenir de l'information locale propre (projets, photos, climat).

## SEO technique (implémenté)

- Rendu statique de tout le contenu important (31 pages), HTML complet sans JavaScript.
- `sitemap.xml` (23 URL), `robots.txt`, URL canoniques, titres et descriptions uniques, `lang="fr-CA"`.
- Fil d'Ariane visible + JSON-LD `BreadcrumbList`; `RoofingContractor` (organisation) global;
  `Service` sur les pages de service; `BlogPosting` sur les articles.
- Aucune note agrégée, aucun balisage d'avis; pas de balisage `FAQPage` (Google restreint ces résultats enrichis,
  et le brief demande de ne pas en faire une stratégie).
- 404 réel (code HTTP 404), page de remerciement `noindex`.
- Images: `next/image` (AVIF/WebP). Les photos réelles sont encore à fournir: noms de fichiers descriptifs et `alt` à ajouter.
- Pré-production: `noindex` + `Disallow: /` tant que `NEXT_PUBLIC_INDEXABLE` n'est pas `true`.
  **Cette variable est évaluée à la construction**: reconstruire après l'avoir changée.

À valider après mise en ligne: Test des résultats enrichis, Schema Markup Validator, Search Console, Core Web Vitals
sur données réelles. Aucun de ces tests n'a pu être fait sur un site non public.

## SEO local et fiche d'établissement Google

Liste de contrôle:
1. Nom, téléphone et site identiques entre le site (`business.ts`), la fiche et les annuaires.
2. Entreprise de service sans vitrine: configurer comme **entreprise de zone de service**, masquer l'adresse.
3. Catégorie principale « Couvreur » (ou la plus exacte disponible); services listés comme sur le site.
4. Heures identiques à `business.hours` dans `src/config/business.ts`.
5. Lien de la fiche vers la page d'accueil; ajouter UTM pour mesurer.
6. Photos réelles et datées; réponses à tous les avis. Aucun avis fabriqué ni acheté.
7. Citations locales cohérentes (pages jaunes, BBB si applicable, chambres de commerce).

## Google Sources préférées (Preferred Sources)

Constats d'après la documentation officielle (consultée le 9 octobre 2026):
- Seuls les sites au niveau domaine ou sous-domaine peuvent apparaître dans l'outil; un sous-répertoire (`/blog`) est exclu.
- Vérification d'admissibilité: rechercher le domaine sur `google.com/preferences/source`.
- Pour AI Mode et AI Overviews, le site doit aussi être inclus dans les fonctionnalités génératives de Google Search (Search Console).
- Le bouton officiel (`publisher.js` + `<div google-add-preferred-source-btn>`) est **implémenté** dans
  `src/components/sections/PreferredSource.tsx`, affiché sur les articles seulement, et **désactivé par défaut**.
- Activation: confirmer l'admissibilité, puis `NEXT_PUBLIC_PREFERRED_SOURCES=true` et reconstruire.
- **Statut: admissibilité non vérifiée** (le domaine n'est pas encore public et le site est en `noindex`).
  Aucun faux badge n'est affiché. Rien ne garantit des citations, un classement ou le statut de source préférée.

## Optimisation pour la recherche par IA

Pas de promesse de visibilité. Ce qui est fait: réponses directes, titres descriptifs, texte intégral des tableaux
et schémas, mentions explicites des limites, entité cohérente (nom, téléphone, régions), pas de statistiques inventées.
Pas de `llms.txt`. À faire: sources crédibles, auteurs nommés, retours d'expérience réels (projets documentés).

## Migration depuis expertsnanoplus.com

Pages observées sur l'ancien site: `/`, `/produits`, `/science`, `/a-propos`, ancre `#soumission`.
Redirections 301 déjà configurées (`next.config.ts`): `/produits` → `/nos-produits`, `/science` → `/technologie-gonano`.
`/` et `/a-propos` gardent la même URL.

À faire avant tout changement de domaine ou de site en production:
1. Décider: même domaine ou nouveau domaine.
2. Exporter les URL indexées et les liens entrants (Search Console, Ahrefs ou équivalent): non fait, aucun accès.
3. Compléter la table de redirection; ne jamais tout rediriger vers l'accueil.
4. Tester sur un environnement de pré-production non indexé (c'est l'état actuel).
5. Vérifier HTTPS, hôte canonique unique, nouvelle sitemap soumise, propriété Search Console vérifiée.
6. **Ne rien remplacer sur le site en ligne sans votre approbation explicite.**

---

## Mise à jour du 18 octobre 2026: version anglaise et blogue

- **Langues**: français sans préfixe, anglais sous `/en`. `hreflang` fr-CA, en-CA et x-default (français) sur chaque page; canonique propre
  à chaque langue; `<html lang>`, `og:locale` et JSON-LD adaptés. Le sitemap liste les deux langues avec leurs alternatives.
- **Blogue**: « Conseils » devient « Blogue » (`/blogue`). Redirections 301: `/conseils` vers `/blogue`, `/conseils/:slug` vers `/blogue/:slug`, et
  les équivalents sous `/en`. Un article n'a de `hreflang` que dans les langues où il existe.
- **Domaine par défaut** pour les canoniques: `https://expertsnanoprotection.ca` (déduit du courriel). Modifiable avec `NEXT_PUBLIC_SITE_URL`.
  Si vous gardez `expertsnanoplus.com`, changez cette variable avant la mise en ligne.
- **Données structurées**: `openingHoursSpecification` (tous les jours, 8 h à 20 h) ajouté à l'entreprise; régions desservies mises à jour.
- Les anciennes redirections `/produits` et `/science` sont conservées.
