# Alignement Google Business Profile

Le balisage JSON-LD `RoofingContractor` (`src/lib/seo.ts`) reprend: nom, téléphone, courriel, heures (tous les jours 8 h à 20 h), régions desservies, services (`makesOffer`) et `contactPoint`.

Pour garder le site et la fiche Google identiques: même nom, téléphone, heures et catégorie principale (Couvreur). Renseigner `socials.google` et `googleMapsUrl` dans `src/config/business.ts` une fois la fiche créée; `sameAs` et `hasMap` apparaissent alors automatiquement. Le numéro RBQ n'est publié dans le balisage qu'après sa vérification (`rbq.verify = false`).
Domaine: le canonique par défaut est `expertsnanoprotection.ca` (`NEXT_PUBLIC_SITE_URL`).
