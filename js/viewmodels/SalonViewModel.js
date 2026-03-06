/**
 * ViewModel - Logique de présentation et gestion d'état
 */
import SalonModel from '../models/SalonModel.js';

class SalonViewModel {
    constructor() {
        this.model = new SalonModel();
        this.observers = [];
        
        // État de l'application
        this.etat = {
            menuOuvert: false,
            slideActuel: 0,
            gallerieEnChargement: false,
            formulaireContact: {
                nom: '',
                email: '',
                telephone: '',
                message: '',
                erreurs: []
            },
            animations: {
                heroVisible: false,
                servicesVisible: false,
                galerieVisible: false,
                couleursVisible: false,
                aProposVisible: false,
                reservationVisible: false,
                contactVisible: false
            }
        };

        // Initialisation
        this.initialiser();
    }

    // Pattern Observer
    addObserver(callback) {
        this.observers.push(callback);
    }

    notifyObservers(changement) {
        this.observers.forEach(callback => callback(this.etat, changement));
    }

    // Getters pour les données du modèle
    get salonInfo() {
        return this.model.getSalonInfo();
    }

    get horaires() {
        return this.model.formaterHoraires();
    }

    get services() {
        return this.model.getServices();
    }

    get galerie() {
        return this.model.getGalerie();
    }

    get couleurs() {
        return this.model.getCouleurs();
    }

    get aPropos() {
        return this.model.getAPropos();
    }

    // Gestion du menu mobile
    toggleMenu() {
        this.etat.menuOuvert = !this.etat.menuOuvert;
        this.notifyObservers('menuToggle');
    }

    fermerMenu() {
        if (this.etat.menuOuvert) {
            this.etat.menuOuvert = false;
            this.notifyObservers('menuFerme');
        }
    }

    // Gestion de la galerie
    naviguerGalerie(direction) {
        const totalSlides = this.galerie.length;
        this.etat.slideActuel = (this.etat.slideActuel + direction + totalSlides) % totalSlides;
        this.notifyObservers('galerieNavigation');
    }

    goToSlide(index) {
        if (index >= 0 && index < this.galerie.length) {
            this.etat.slideActuel = index;
            this.notifyObservers('galerieSlideChange');
        }
    }

    getSlideActuel() {
        return this.etat.slideActuel;
    }

    // Gestion du formulaire de contact
    mettreAJourChamp(champ, valeur) {
        this.etat.formulaireContact[champ] = valeur;
        this.validerChamp(champ);
        this.notifyObservers('formulaireMiseAJour');
    }

    validerChamp(champ) {
        const erreurs = [...this.etat.formulaireContact.erreurs];
        const nouvellesErreurs = this.model.validerContact(this.etat.formulaireContact);
        
        this.etat.formulaireContact.erreurs = nouvellesErreurs;
        return nouvellesErreurs.length === 0;
    }

    validerFormulaire() {
        const erreurs = this.model.validerContact(this.etat.formulaireContact);
        this.etat.formulaireContact.erreurs = erreurs;
        
        if (erreurs.length === 0) {
            this.envoyerFormulaire();
        }
        
        this.notifyObservers('formulaireValidation');
        return erreurs.length === 0;
    }

    envoyerFormulaire() {
        // Simulation d'envoi (remplacer par appel API réel)
        console.log('Envoi du formulaire:', this.etat.formulaireContact);
        
        // Réinitialiser le formulaire
        this.etat.formulaireContact = {
            nom: '',
            email: '',
            telephone: '',
            message: '',
            erreurs: []
        };
        
        this.notifyObservers('formulaireEnvoye');
        return true;
    }

    // Gestion des animations de scroll
    verifierVisibiliteSections() {
        const sections = document.querySelectorAll('section[id]');
        const nouvellesAnimations = { ...this.etat.animations };
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
            
            const id = section.id.replace('-', '');
            nouvellesAnimations[`${id}Visible`] = isVisible;
        });
        
        if (JSON.stringify(nouvellesAnimations) !== JSON.stringify(this.etat.animations)) {
            this.etat.animations = nouvellesAnimations;
            this.notifyObservers('animationsMiseAJour');
        }
    }

    // Utilitaires
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            this.fermerMenu();
        }
    }

    getLienReservation() {
        return this.salonInfo.planity;
    }

    getLienFacebook() {
        return this.salonInfo.facebook;
    }

    getLienTelephone() {
        return `tel:${this.salonInfo.phone.replace(/[^\d+]/g, '')}`;
    }

    // Initialisation
    initialiser() {
        // Écouter les événements de scroll
        window.addEventListener('scroll', () => {
            this.verifierVisibiliteSections();
        }, { passive: true });

        // Écouter les événements de redimensionnement
        window.addEventListener('resize', () => {
            this.verifierVisibiliteSections();
        }, { passive: true });

        // Vérification initiale
        setTimeout(() => {
            this.verifierVisibiliteSections();
        }, 100);
    }

    // État du formulaire
    get formulaireContact() {
        return this.etat.formulaireContact;
    }

    get erreursFormulaire() {
        return this.etat.formulaireContact.erreurs;
    }

    // État des animations
    get animations() {
        return this.etat.animations;
    }
}

export default SalonViewModel;
