# Zones desservies (widget de soumission)

Fichier: `src/config/coverage.ts`.

**Décision actuelle: tout le Québec est desservi** (`provinceWide: true`, `verified: true`): tout code postal commençant par G, H ou J reçoit « Bonne nouvelle! ». Pour revenir à des listes par région, mettre `provinceWide` à `false`.

Le widget compare les trois premiers caractères du code postal (FSA, p. ex. `J4K`) aux listes par région.

1. Remplir `fsa: ["J4K", ...]` pour chaque région que vous desservez réellement.
2. Passer `verified` à `true`.

Résultats: FSA listé et `verified` = « Bonne nouvelle! Nous desservons votre secteur. »; sinon « à confirmer » (le client indique sa municipalité); première lettre hors G/H/J = hors Québec.
Les listes sont vides par défaut: rien n'est annoncé comme desservi sans votre approbation.
