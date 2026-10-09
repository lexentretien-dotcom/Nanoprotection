# Les Experts Nano Protection Toitures

Site marketing multipage pour une entreprise de préservation de toitures au Québec.
Next.js (App Router), TypeScript, Tailwind CSS v4. Contenu en français canadien (`fr-CA`).

> **État: version de développement sur environnement de pré-production.**
> Le site est volontairement `noindex` et bloqué dans `robots.txt` tant que
> `NEXT_PUBLIC_INDEXABLE` n'est pas `true`. Rien n'est publié sur le site en production.
> Lisez [`docs/PENDING-INFO.md`](docs/PENDING-INFO.md) avant toute mise en ligne.

## Démarrage

Prérequis: Node.js 20.9+ (testé avec 24 LTS).

```bash
npm install
cp .env.example .env.local   # puis remplir au besoin
npm run dev                  # http://localhost:3000
npm run build && npm start   # build de production
npm run lint
```

## Où modifier le contenu (sans toucher à la logique)

| Quoi | Fichier |
|---|---|
| Coordonnées, RBQ, régions, CTA, options (GA4, GTM, Preferred Sources, estimateur) | `src/config/business.ts` |
| Produits GoNano | `src/content/products.ts` |
| Services (un service est publié seulement si `confirmed: true`) | `src/content/services.ts` |
| FAQ | `src/content/faq.ts` |
| Articles de conseils | `src/content/articles.ts` |
| Projets avant/après et témoignages réels | `src/content/projects.ts` |
| Photo du héros | déposer `public/photos/hero-home.jpg` (utilisée automatiquement) |

Les modifications se font aussi directement dans l'interface web de GitHub (bouton « Edit »).
Un CMS visuel (Decap CMS, Tina ou similaire) n'est **pas** installé: voir `docs/PENDING-INFO.md`.

## Variables d'environnement

Voir `.env.example`. Les secrets GoHighLevel (`GHL_API_KEY`, `GHL_LOCATION_ID`) restent côté serveur.

## Documentation

- [`docs/PENDING-INFO.md`](docs/PENDING-INFO.md) : informations et accès requis, approbations
- [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) : identité, jetons, composants, mouvement
- [`docs/SEO-AND-MIGRATION.md`](docs/SEO-AND-MIGRATION.md) : carte des mots-clés, SEO local, Preferred Sources, migration
- [`docs/CLAIM-VERIFICATION.md`](docs/CLAIM-VERIFICATION.md) : liste de vérification des affirmations
- [`docs/INTEGRATIONS-AND-QA.md`](docs/INTEGRATIONS-AND-QA.md) : GoHighLevel, analytique, déploiement, rapport de QA
