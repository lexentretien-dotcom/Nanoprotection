# Audit du site selon les principes de design d'Apple (18 octobre 2026)

## Compétences utilisées, et leurs limites

| Compétence | Utilisée? | Remarque |
|---|---|---|
| apple-design | Oui | Source principale des critères ci-dessous (réponse, interruptibilité, matériaux, typographie, mouvement réduit, fondements) |
| fixing-accessibility | Oui | Passage sur les noms accessibles, le clavier, le focus, les formulaires |
| fixing-metadata | Oui | Titres, canoniques, Open Graph, icônes, hreflang |
| ui-ux-pro-max | **Partiellement** | Le fichier d'instructions est chargé, mais **les scripts de recherche et les bases de données de la compétence ne sont pas installés** sur cet ordinateur. Je n'ai donc pas pu générer de système de design ni interroger ses bases. J'ai appliqué ses règles écrites (priorités 1 à 10) à la main. |
| impeccable, animate, review-animations, improve-animations | Non | Non invoquées dans cette passe |

## Constats et corrections

| Principe | Constat avant | Correction |
|---|---|---|
| Réponse: le retour visuel est immédiat | Les boutons réagissaient à l'appui en 500 ms (trop lent pour « toucher » l'interface) | Retour à l'appui en 75 ms (`active:duration-75`) sur les boutons, onglets, cartes de réponse, filtres et boutons du bandeau; le survol garde la courbe lente |
| Cibles tactiles de 44 px | Liens du pied de page, de la navigation et du fil d'Ariane plus petits | Hauteur minimale de 44 px (32 à 36 px pour les liens de texte secondaires du pied de page) |
| Cohérence spatiale: même chemin à l'entrée et à la sortie | Le menu mobile s'animait à l'ouverture mais disparaissait d'un coup à la fermeture | Fermeture symétrique (fondu et glissement de 8 px), courbe identique; l'échelonnement des éléments ne joue qu'à l'ouverture |
| Interruptibilité | Aucun verrouillage pendant les transitions (déjà bon) | Conservé. Pas de `@keyframes` pour les interactions pilotées par l'utilisateur |
| Matériaux: translucidité pour la hiérarchie | En-tête semi-opaque avec filet dur de 1 px | Couche translucide (flou + saturation, arête claire en haut), filet dur remplacé par une ombre légère; même matériau pour la barre mobile collante |
| Transparence et contraste réduits | Non pris en charge | Replis pleins pour `prefers-reduced-transparency` et `prefers-contrast: more` |
| Typographie: crénage et interligne propres à la taille | Même crénage (-0,025 em) pour tous les titres | h1 -0,032 em / 1,03; h2 -0,026 em / 1,07; h3 -0,018 em / 1,15; h4 -0,01 em / 1,25; corps à 0; `font-optical-sizing: auto` |
| Mouvement réduit | Déjà géré pour les apparitions | Étendu au menu mobile (fondu court sans glissement) |
| Retour d'information: validation en ligne | Erreurs affichées seulement à l'envoi | Validation à la sortie de chaque champ, message sous le champ |
| Focus et clavier du menu | Aucune gestion | Focus déplacé dans le menu à l'ouverture, rendu au bouton à la fermeture, Échap ferme, menu `inert` quand fermé |
| Rôles ARIA | Bannière de témoins en `role="dialog"` sans piège de focus | Région étiquetée (non modale), donc sans promesse d'un comportement de dialogue |
| Navigation par onglets | Flèches seulement | Ajout de Début et Fin |
| Simplicité | Une intention = un libellé | Conservé: un seul libellé de bouton principal; la ligne de réassurance n'apparaît que sous les boutons de conversion, jamais dans l'en-tête de la page d'accueil |
| Métadonnées | Icône Next.js par défaut, aucune langue alternative | Icône de la marque (favicon et apple-icon), `og:locale` par langue, `og:url` = canonique, `hreflang` fr-CA / en-CA / x-default, `lang` correct sur `<html>` |

## Volontairement non appliqué

- **Ressorts, quantité de mouvement, rubber-banding, transmission de vélocité**: ces techniques servent aux interfaces pilotées au geste (feuilles, tiroirs, glisser-déposer). Le site n'en a pas. Le curseur avant/après est un champ natif `range` (déjà direct, accessible et au clavier).
- **Haptique et son**: non pertinents pour un site de service.
- **Mode sombre**: non construit (thème clair verrouillé).
- **Photographie réelle**: toujours à fournir. C'est le plus grand gain visuel restant.

## À revoir plus tard

- Passage `/impeccable` et revue des animations.
- Mesures Lighthouse et Core Web Vitals sur le site déployé.
- Test avec un lecteur d'écran (VoiceOver, NVDA).
