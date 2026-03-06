# Espace Paris Coiffure

Site web du salon de coiffure Espace Paris Coiffure à Bar-le-Duc.

## Fonctionnalités

- Présentation du salon et des services
- Galerie photo avec carrousel responsive
- Section témoignages clients avec avis Google
- Formulaire de réservation via Planity
- Design mobile-first avec animations modernes

## Technologies

- HTML5 sémantique
- CSS3 avec animations et transitions
- JavaScript vanilla
- Font Awesome pour les icônes
- Google Fonts (Montserrat)

## Déploiement

Ce site est configuré pour être déployé automatiquement sur GitHub Pages via GitHub Actions.

### Développement local

```bash
# Lancer un serveur local
python3 -m http.server 8000

# Ou avec Node.js
npx serve .
```

## Structure du projet

```
├── index.html          # Page principale
├── style.css           # Styles CSS
├── script.js           # Scripts JavaScript
├── js/                 # Architecture MVVM
│   ├── app.js
│   ├── models/
│   ├── viewmodels/
│   └── views/
├── Photos/              # Images du salon
└── sw.js               # Service Worker (PWA)
```

## Auteur

Développé pour Espace Paris Coiffure - Bar-le-Duc
