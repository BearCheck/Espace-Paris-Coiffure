/**
 * Point d'entrée de l'application MVVM
 */
import SalonViewModel from './viewmodels/SalonViewModel.js';
import SalonView from './views/SalonView.js';

/**
 * Classe principale de l'application
 */
class SalonApp {
    constructor() {
        this.viewModel = null;
        this.view = null;
        
        // Initialiser l'application
        this.initialiser();
    }

    async initialiser() {
        try {
            // Attendre que le DOM soit chargé
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Créer les instances MVVM
            this.viewModel = new SalonViewModel();
            this.view = new SalonView(this.viewModel);

            console.log('%c🎨 Espace Paris Coiffure - Application MVVM initialisée', 'color: #ff8c42; font-size: 16px; font-weight: bold;');
            console.log('%cArchitecture: Model-View-ViewModel', 'color: #4a9d4a; font-size: 12px;');
            
            // Démarrer l'application
            this.demarrer();
            
        } catch (erreur) {
            console.error('Erreur lors de l\'initialisation de l\'application:', erreur);
            this.afficherErreurCritique(erreur);
        }
    }

    demarrer() {
        // Vérifier que tous les composants sont prêts
        if (!this.viewModel || !this.view) {
            throw new Error('Les composants MVVM ne sont pas correctement initialisés');
        }

        // Configurer le header scroll
        this.configurerHeaderScroll();
        
        // Configurer les animations au scroll
        this.configurerAnimationsScroll();
        
        // Configurer la navigation clavier
        this.configurerNavigationClavier();
        
        // Configurer le service worker (si disponible)
        this.configurerServiceWorker();
        
        console.log('Application démarrée avec succès');
    }

    /**
     * Configuration du header qui change au scroll
     */
    configurerHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    /**
     * Configuration des animations au scroll
     */
    configurerAnimationsScroll() {
        // Les animations sont gérées par le ViewModel et la View
        // Cette méthode peut être étendue pour des animations supplémentaires
    }

    /**
     * Configuration de la navigation au clavier
     */
    configurerNavigationClavier() {
        document.addEventListener('keydown', (e) => {
            // Navigation avec les flèches dans la galerie
            if (e.key === 'ArrowLeft') {
                const galerieContainer = document.querySelector('.gallery-container');
                if (galerieContainer && document.activeElement?.closest('.gallery')) {
                    e.preventDefault();
                    this.viewModel.naviguerGalerie(-1);
                }
            } else if (e.key === 'ArrowRight') {
                const galerieContainer = document.querySelector('.gallery-container');
                if (galerieContainer && document.activeElement?.closest('.gallery')) {
                    e.preventDefault();
                    this.viewModel.naviguerGalerie(1);
                }
            }

            // Fermer le menu avec Escape
            if (e.key === 'Escape') {
                this.viewModel.fermerMenu();
            }

            // Navigation avec les chiffres
            if (e.key >= '1' && e.key <= '7') {
                const sections = ['accueil', 'services', 'couleurs', 'galerie', 'apropos', 'reservation', 'contact'];
                const index = parseInt(e.key) - 1;
                if (sections[index]) {
                    e.preventDefault();
                    this.viewModel.scrollToSection(sections[index]);
                }
            }
        });
    }

    /**
     * Configuration du Service Worker pour le mode hors-ligne
     */
    configurerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('Service Worker enregistré:', registration);
                    })
                    .catch(error => {
                        console.log('Erreur lors de l\'enregistrement du Service Worker:', error);
                    });
            });
        }
    }

    /**
     * Gestion des erreurs critiques
     */
    afficherErreurCritique(erreur) {
        const erreurElement = document.createElement('div');
        erreurElement.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                padding: 2rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                z-index: 99999;
                text-align: center;
                max-width: 400px;
            ">
                <h3 style="margin: 0 0 1rem 0;">Erreur critique</h3>
                <p style="margin: 0 0 1.5rem 0;">Une erreur est survenue lors du chargement de l'application.</p>
                <details style="text-align: left;">
                    <summary style="cursor: pointer; font-weight: bold;">Détails techniques</summary>
                    <pre style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 5px; overflow-x: auto; font-size: 0.8rem;">${erreur.stack || erreur.message}</pre>
                </details>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #e74c3c;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">Recharger la page</button>
            </div>
        `;
        
        document.body.appendChild(erreurElement);
    }

    /**
     * Méthodes utilitaires publiques
     */
    getViewModel() {
        return this.viewModel;
    }

    getView() {
        return this.view;
    }

    /**
     * Nettoyage de l'application
     */
    detruire() {
        // Nettoyer les écouteurs d'événements
        window.removeEventListener('scroll', this.configurerHeaderScroll);
        document.removeEventListener('keydown', this.configurerNavigationClavier);
        
        // Nettoyer les instances
        this.viewModel = null;
        this.view = null;
        
        console.log('Application détruite proprement');
    }
}

// Démarrer l'application quand le fichier est chargé
const app = new SalonApp();

// Exporter pour utilisation externe si nécessaire
export default app;
