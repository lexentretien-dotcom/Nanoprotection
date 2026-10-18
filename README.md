# Les Experts Nano Protection Toitures

Site marketing bilingue pour une entreprise de préservation de toitures au Québec.
Next.js 16 (App Router), TypeScript, Tailwind CSS v4.

- **Français (par défaut)**: adresses sans préfixe, ex. `/nos-produits`
- **Anglais**: même adresse précédée de `/en`, ex. `/en/nos-produits`

> **État: version de pré-production.** Le site est volontairement `noindex` et bloqué dans
> `robots.txt` tant que `NEXT_PUBLIC_INDEXABLE` n'est pas `true`. Rien n'est publié sur le site en ligne.
> Lisez [`docs/PENDING-INFO.md`](docs/PENDING-INFO.md) avant toute mise en ligne.

## Démarrage

Prérequis: Node.js 20.9 ou plus récent (testé avec 24 LTS).

```bash
npm install
cp .env.example .env.local   # puis remplir au besoin
npm run dev                  # http://localhost:3000
npm run build && npm start   # build de production
npm run lint
```

## Où modifier le contenu

| Quoi | Où |
|---|---|
| Coordonnées, heures (données structurées), RBQ, régions, options (GA4, GTM, Preferred Sources) | `src/config/business.ts` |
| **Tous les textes visibles**, en français et en anglais | `src/i18n/fr/*.ts` et `src/i18n/en/*.ts` (mêmes fichiers dans chaque langue) |
| Heures et régions affichées | `src/i18n/*/site.ts` |
| Produits, services, FAQ, technologie, garantie | `src/i18n/*/content.ts` |
| Projets avant/après et témoignages réels | `src/content/projects.ts` |
| **Articles du blogue** | `content/blog/fr/*.md` et `content/blog/en/*.md`, voir [`content/blog/README.md`](content/blog/README.md) |
| Photo du héros de l'accueil | déposer `public/photos/hero-home.jpg` |
| PDF de la garantie officielle | `public/docs/garantie-officielle-gonano.pdf` |

Chaque modification se fait aussi directement dans l'éditeur web de GitHub (bouton « Edit »).
Un CMS visuel n'est pas installé: voir `docs/PENDING-INFO.md`.

## Langues

- Les chaînes sont typées: le fichier anglais doit avoir exactement la même structure que le français,
  sinon la compilation échoue.
- Le bouton de langue conserve la page courante. Pour un article de blogue, utilisez **le même nom de
  fichier** en français et en anglais; sinon le bouton mène à la liste du blogue.
- `/fr/...` redirige vers l'adresse sans préfixe (une seule URL par page).

## Variables d'environnement

Voir `.env.example`. Les secrets GoHighLevel (`GHL_API_KEY`, `GHL_LOCATION_ID`) restent côté serveur.

## Documentation

- [`docs/PENDING-INFO.md`](docs/PENDING-INFO.md): informations et accès requis, approbations
- [`docs/APPLE-DESIGN-AUDIT.md`](docs/APPLE-DESIGN-AUDIT.md): audit selon les principes d'Apple
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md): identité, jetons, composants, mouvement
- [`docs/SEO-AND-MIGRATION.md`](docs/SEO-AND-MIGRATION.md): mots-clés, SEO local, langues, migration
- [`docs/CLAIM-VERIFICATION.md`](docs/CLAIM-VERIFICATION.md): vérification des affirmations
- [`docs/INTEGRATIONS-AND-QA.md`](docs/INTEGRATIONS-AND-QA.md): GoHighLevel, analytique, déploiement, rapport de QA
