# Comment ajouter un article au blogue

Chaque article est un fichier texte (Markdown). Aucune connaissance en programmation n'est requise.

## Ajouter un article depuis le site de GitHub (le plus simple)

1. Ouvrez le dépôt sur GitHub, puis le dossier `content/blog/fr` (articles en français) ou `content/blog/en` (anglais).
2. Cliquez sur **Add file**, puis **Create new file**.
3. Nommez le fichier avec l'adresse (slug) voulue, en minuscules, sans accents, avec des tirets, et terminez par `.md`.
   Exemple: `choisir-un-entrepreneur-de-toiture.md`
4. Copiez le contenu de `_MODELE.md` (même dossier), puis remplacez le texte.
5. Cliquez sur **Commit changes**. Le site se met à jour automatiquement en une à deux minutes.

L'adresse publique devient `/blogue/choisir-un-entrepreneur-de-toiture` (français) et
`/en/blogue/choisir-un-entrepreneur-de-toiture` (anglais).

## Version anglaise et version française d'un même article

Utilisez **le même nom de fichier** dans `fr` et dans `en`. Le site relie alors les deux versions
(bouton de langue et balises hreflang pour Google). Si un article n'existe que dans une langue, le
bouton de langue renvoie vers la liste du blogue de l'autre langue.

## Les champs du haut du fichier (entre les lignes `---`)

| Champ | Obligatoire | Rôle |
|---|---|---|
| `title` | oui | Titre de l'article |
| `description` | oui | Une ou deux phrases pour Google et les réseaux sociaux (max. 160 caractères) |
| `date` | oui | Date de publication, format `2026-10-18` |
| `author` | non | Nom de l'auteur ou de l'experte/expert réviseur |
| `draft` | non | `true` = l'article est caché (brouillon). Retirez la ligne pour publier |
| `sources` | non | Liste de références crédibles (libellé + lien) |

## Mise en forme

- `## Titre` = intertitre, `### Sous-titre`
- `**gras**`, `*italique*`
- Liste: une ligne par élément, commençant par `- `
- Lien: `[texte du lien](https://adresse.com)`
- Tableau: voir la syntaxe Markdown « GFM »

## Règles de contenu de la maison

- Aucune statistique ou promesse sans source. Citez la source dans `sources`.
- Pas de garanties absolues (« permanent », « aucun risque », « comme neuf »).
- Un traitement ne remplace jamais une réparation nécessaire: dites-le quand c'est pertinent.
- Faites relire par une personne qualifiée avant de publier, et indiquez-la dans `author`.
