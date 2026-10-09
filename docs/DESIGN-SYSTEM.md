# Système de design

## Compétences utilisées (et celles qui ne l'ont pas été)

| Compétence | Utilisée? | Contribution |
|---|---|---|
| UI UX Pro Max | **Non** | Non disponible dans l'environnement; l'installation a été tentée sans succès par le propriétaire, qui a demandé de continuer sans elle. |
| design-taste-frontend | Oui | Lecture du brief, cadrans (variance 5, mouvement 4, densité 3), anti-clichés (pas de Inter, pas de dégradé violet générique, pas de tirets cadratins, une seule marque d'accent, thème verrouillé) |
| high-end-visual-design | Oui | Double biseau (coque + noyau concentrique), boutons pilule avec flèche imbriquée, courbes `cubic-bezier(0.32,0.72,0,1)`, espacement généreux, ombres teintées |
| brandkit | **Partiellement** | La compétence génère des images; je n'ai pas d'outil de génération d'images ici. Seule sa méthode de stratégie de marque a été appliquée (ce document). Aucune planche de marque n'a été produite. |
| frontend-design | Oui (principes) | Cohérence entre composants |
| image-to-code, pick-ui-library, shadcn-component-discovery/review, 21st-ui, animate, find-animation-opportunities, improve-animations, review-animations, impeccable, full-output-enforcement, prototype | **Non** | Non invoquées dans cette passe. Une passe `impeccable` et de revue d'animation reste à faire (voir `INTEGRATIONS-AND-QA.md`). |

## Identité

- **Marque** : maison avec nœuds (tirée du logo existant) + nom en texte réel « Les Experts / Nano Protection Toitures ».
- **Personnalité** : confiance, rigueur, sobriété, franchise. Un avis avant une vente.
- **Ton** : français québécois naturel, vouvoiement, phrases courtes, limites annoncées.
- **À éviter** : exagération scientifique, urgence artificielle, économies chiffrées sans conditions.

## Jetons (`src/app/globals.css`)

| Jeton | Valeur | Rôle |
|---|---|---|
| `--ink` | `#0b1230` | Texte, surfaces sombres |
| `--paper` | `#f5f5fa` | Fond de page (gris-bleu froid, pas de beige) |
| `--surface` | `#ffffff` | Cartes |
| `--accent` | `#5a2cf5` | Seul accent (violet de la marque), 6,7:1 sur blanc |
| `--accent-strong` | `#4516d6` | Survol |
| `--accent-tint` | `#efeaff` | Fonds doux |
| `--muted` | `#565b78` | Texte secondaire, 6,1:1 sur le fond |

Tous les couples de couleurs utilisés dépassent 4,5:1 (calculés, voir QA).

## Typographie

Plus Jakarta Sans (titres, 500 à 800) + Geist (texte), via `next/font`, sous-ensembles `latin` et `latin-ext`
(accents français). Échelle: h1 `text-4xl` à `text-6xl`, interligne titre 1,08, texte 1,65.

## Forme et composants

- Règle de rayons: boutons et contrôles = pilule; cartes = coque 2rem avec noyau concentrique (`Bezel`); champs = 1rem.
- `ButtonLink`, `Bezel`, `Reveal`, `PageHeader`, `Section`, `FaqList`, `ProcessSteps`, `ProductCompare`,
  `BeforeAfter`, `ProjectGallery`, `Assessment`, `LeadForm`, `Consent`.
- Un seul libellé par intention: « Obtenir mon évaluation gratuite » (principal), « Parler à un expert » (secondaire).

## Mouvement

Chaque animation a une raison (hiérarchie, séquence, retour d'action). Uniquement `transform` et `opacity`.
`prefers-reduced-motion` désactive les apparitions et réduit toutes les transitions. Aucun défilement détourné,
aucune bibliothèque d'animation (CSS + `IntersectionObserver`).

## Thème

Thème clair unique, verrouillé. **Le mode sombre n'est pas implémenté** (décision de marque; à revoir si souhaité).
