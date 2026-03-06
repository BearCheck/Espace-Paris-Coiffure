# Architecture MVVM - Espace Paris Coiffure

## 📋 Vue d'ensemble

Le site a été restructuré en utilisant le pattern **Model-View-ViewModel (MVVM)** pour une meilleure séparation des responsabilités et une maintenance facilitée.

## 🏗️ Architecture

### 📁 Structure des fichiers

```
js/
├── app.js                 # Point d'entrée de l'application
├── models/
│   └── SalonModel.js      # Gestion des données du salon
├── viewmodels/
│   └── SalonViewModel.js   # Logique de présentation et état
├── views/
│   └── SalonView.js        # Gestion du DOM et interactions
└── sw.js                  # Service Worker (hors-ligne)
```

## 🎯 Pattern MVVM Expliqué

### 📊 Model (SalonModel.js)
- **Responsabilité** : Gestion des données brutes
- **Contenu** : Informations du salon, horaires, services, galerie
- **Fonctions** : Validation, formatage, accès aux données
- **Indépendance** : Aucune connaissance de la vue ou du ViewModel

### 🎮 ViewModel (SalonViewModel.js)
- **Responsabilité** : Logique de présentation et état de l'application
- **Contenu** : État du menu, slide actif, formulaire, animations
- **Fonctions** : Navigation, validation, gestion des événements
- **Pattern Observer** : Notifie les changements à la vue

### 🖼️ View (SalonView.js)
- **Responsabilité** : Affichage et interactions utilisateur
- **Contenu** : Manipulation du DOM, écouteurs d'événements
- **Fonctions** : Mise à jour de l'interface, animations
- **Réactivité** : Réagit aux changements du ViewModel

## 🔄 Flux de Données

```
User Action → View → ViewModel → Model → ViewModel → View → User
```

1. **Utilisateur** clique sur un bouton
2. **View** capture l'événement
3. **ViewModel** traite la logique métier
4. **Model** fournit les données nécessaires
5. **ViewModel** met à jour l'état
6. **View** met à jour l'interface utilisateur

## 🚀 Avantages du MVVM

### ✅ Séparation des responsabilités
- **Model** : Pure logique de données
- **ViewModel** : Logique de présentation isolée
- **View** : Pure présentation

### ✅ Testabilité
- Chaque composant peut être testé indépendamment
- Mock facile du Model pour les tests
- Tests unitaires possibles pour le ViewModel

### ✅ Maintenance
- Modifications des données = Model uniquement
- Changements d'interface = View uniquement
- Logique métier = ViewModel uniquement

### ✅ Réutilisabilité
- Model peut être réutilisé avec différentes vues
- ViewModel peut être adapté pour différentes interfaces
- View peut être remplacée sans affecter la logique

## 📱 Fonctionnalités Implémentées

### 🎨 Navigation Mobile
- Menu hamburger avec animations fluides
- Scroll smooth entre sections
- Fermeture automatique du menu

### 🖼️ Galerie Carrousel
- Auto-centrage des photos
- Navigation par flèches et swipe tactile
- Snap pour alignement parfait

### 📋 Formulaire de Contact
- Validation en temps réel
- Messages d'erreur personnalisés
- Feedback de succès

### 🎭 Animations au Scroll
- Détection automatique des sections visibles
- Animations fluides et progressives
- Performance optimisée

## 🔧 Utilisation

### Importation des modules
```javascript
import SalonModel from './models/SalonModel.js';
import SalonViewModel from './viewmodels/SalonViewModel.js';
import SalonView from './views/SalonView.js';
```

### Initialisation
```javascript
const app = new SalonApp();
// L'application s'initialise automatiquement
```

### Accès aux données
```javascript
// Via le ViewModel
const viewModel = app.getViewModel();
const services = viewModel.services;

// Via le Model (direct)
const model = new SalonModel();
const horaires = model.getHoraires();
```

## 🔄 Migration depuis l'ancienne version

### Avant (Monolithique)
```javascript
// script.js - Tout mélangé
function scrollGallery(direction) { ... }
function validerFormulaire() { ... }
// ... 300+ lignes mixées
```

### Après (MVVM)
```javascript
// Model
class SalonModel {
    validerFormulaire(data) { ... }
}

// ViewModel
class SalonViewModel {
    validerFormulaire() {
        const erreurs = this.model.validerFormulaire(this.etat.formulaire);
        // ...
    }
}

// View
class SalonView {
    attacherEvenements() {
        this.elements.formulaire.addEventListener('submit', () => {
            this.viewModel.validerFormulaire();
        });
    }
}
```

## 🧪 Tests Possibles

### Test du Model
```javascript
const model = new SalonModel();
const services = model.getServices();
expect(services).toHaveLength(6);
```

### Test du ViewModel
```javascript
const viewModel = new SalonViewModel();
viewModel.mettreAJourChamp('nom', 'Test');
expect(viewModel.formulaireContact.nom).toBe('Test');
```

### Test de la View
```javascript
const view = new SalonView(viewModel);
view.elements.hamburger.click();
expect(viewModel.etat.menuOuvert).toBe(true);
```

## 🌐 Déploiement

### Local
```bash
python3 -m http.server 8000
# Accéder à http://localhost:8000
```

### Production
Les fichiers ES6 modules nécessitent un serveur compatible avec les modules ES6 ou un build step avec Webpack/Rollup.

## 🔮 Évolutions Possibles

### 📊 API Integration
- Remplacer les données statiques par des appels API
- Gestion du chargement asynchrone
- État de chargement dans le ViewModel

### 🎨 Thèmes Multiples
- Système de thèmes dans le Model
- Basculement dans le ViewModel
- Application dans la View

### 📱 Application Mobile
- Capacitor pour la transformation en app mobile
- Utilisation du ViewModel pour la logique métier
- View adaptée pour le mobile

## 📚 Bonnes Pratiques

### ✅ À faire
- Garder le Model pur (pas de logique de présentation)
- Maintenir le ViewModel stateless autant que possible
- Limiter les manipulations directes du DOM dans le ViewModel
- Utiliser le pattern Observer pour les changements d'état

### ❌ À éviter
- Accéder directement au DOM depuis le ViewModel
- Mettre de la logique de présentation dans le Model
- Coupler fortement les composants
- Oublier le pattern Observer

---

**Cette architecture MVMM rend le code plus maintenable, testable et évolutif tout en préservant une excellente expérience utilisateur !**
