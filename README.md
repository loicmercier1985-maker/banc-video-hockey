# Banc Vidéo Hockey

Application web installable (PWA) pour entraîneurs de hockey : analyse vidéo annotée, tableau de patinoire et pratiques animées sur demi-glace.

**Application :** https://loicmercier1985-maker.github.io/banc-video-hockey/

## Installer sur un appareil

- **Ordinateur (Chrome ou Edge)** : ouvrir l'adresse, puis l'icône *Installer* dans la barre d'adresse.
- **Android (Chrome)** : menu ⋮ → *Installer l'application*.
- **iPad / iPhone (Safari)** : *Partager* → *Sur l'écran d'accueil*.

Après la première ouverture avec internet, l'app fonctionne hors ligne.

## Données

Tout reste sur l'appareil (projets vidéo, notes, annotations, photos et vidéos des exercices). Rien de personnel n'est stocké dans ce dépôt.
Pour passer d'un appareil à l'autre : *Entraînements → Exporter / Importer* et *Projet → Enregistrer / Ouvrir un projet*.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (HTML, CSS et JavaScript dans un seul fichier) |
| `sw.js` | Fonctionnement hors ligne; changer `VERSION` à chaque publication |
| `manifest.webmanifest` | Nom, icône et couleurs de l'app installée |
| `icons/` | Icônes |

## Mises à jour

Chaque modification poussée sur `main` est publiée par GitHub Pages en 1 à 2 minutes. Les appareils reçoivent la nouvelle version à la réouverture de l'app.
