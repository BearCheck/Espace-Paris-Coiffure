/**
 * View - Gestion du DOM et des interactions utilisateur
 */
class SalonView {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.elements = {};
        
        // S'abonner aux changements du ViewModel
        this.viewModel.addObserver(this.mettreAJour.bind(this));
        
        // Initialisation
        this.initialiserElements();
        this.attacherEvenements();
    }

    // Initialisation des éléments DOM
    initialiserElements() {
        this.elements = {
            // Navigation
            hamburger: document.querySelector('.hamburger'),
            navMenu: document.querySelector('.nav-menu'),
            navLinks: document.querySelectorAll('.nav-link'),
            
            // Sections
            hero: document.querySelector('.hero'),
            services: document.querySelector('.services'),
            galerie: document.querySelector('.gallery'),
            couleurs: document.querySelector('.colors'),
            aPropos: document.querySelector('.about'),
            reservation: document.querySelector('.reservation'),
            contact: document.querySelector('.contact'),
            
            // Galerie
            galerieContainer: document.querySelector('.gallery-container'),
            galerieItems: document.querySelectorAll('.gallery-item'),
            galerieNavPrev: document.querySelector('.gallery-nav.prev'),
            galerieNavNext: document.querySelector('.gallery-nav.next'),
            
            // Formulaire
            formulaireContact: document.querySelector('.contact-form form'),
            inputNom: document.querySelector('input[name="nom"]'),
            inputEmail: document.querySelector('input[name="email"]'),
            inputTelephone: document.querySelector('input[name="telephone"]'),
            textareaMessage: document.querySelector('textarea[name="message"]'),
            btnSubmit: document.querySelector('.btn-submit'),
            
            // Informations
            nomSalon: document.querySelector('.logo'),
            adresseSalon: document.querySelector('.adresse-salon'),
            telephoneSalon: document.querySelector('.telephone-salon'),
            horairesSalon: document.querySelector('.horaires-salon'),
            
            // Boutons d'action
            btnReservation: document.querySelectorAll('.btn-reservation'),
            btnFacebook: document.querySelector('.btn-facebook')
        };
    }

    // Attacher les événements
    attacherEvenements() {
        // Navigation mobile
        if (this.elements.hamburger) {
            this.elements.hamburger.addEventListener('click', () => {
                this.viewModel.toggleMenu();
            });
        }

        // Liens de navigation
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('href').substring(1);
                this.viewModel.scrollToSection(sectionId);
            });
        });

        // Galerie
        if (this.elements.galerieNavPrev) {
            this.elements.galerieNavPrev.addEventListener('click', () => {
                this.viewModel.naviguerGalerie(-1);
            });
        }

        if (this.elements.galerieNavNext) {
            this.elements.galerieNavNext.addEventListener('click', () => {
                this.viewModel.naviguerGalerie(1);
            });
        }

        // Swipe tactile pour la galerie
        if (this.elements.galerieContainer) {
            this.initialiserSwipeGalerie();
        }

        // Formulaire de contact
        if (this.elements.formulaireContact) {
            this.elements.formulaireContact.addEventListener('submit', (e) => {
                e.preventDefault();
                this.viewModel.validerFormulaire();
            });
        }

        // Champs du formulaire
        if (this.elements.inputNom) {
            this.elements.inputNom.addEventListener('input', (e) => {
                this.viewModel.mettreAJourChamp('nom', e.target.value);
            });
        }

        if (this.elements.inputEmail) {
            this.elements.inputEmail.addEventListener('input', (e) => {
                this.viewModel.mettreAJourChamp('email', e.target.value);
            });
        }

        if (this.elements.inputTelephone) {
            this.elements.inputTelephone.addEventListener('input', (e) => {
                this.viewModel.mettreAJourChamp('telephone', e.target.value);
            });
        }

        if (this.elements.textareaMessage) {
            this.elements.textareaMessage.addEventListener('input', (e) => {
                this.viewModel.mettreAJourChamp('message', e.target.value);
            });
        }

        // Scroll smooth
        this.initialiserScrollSmooth();
    }

    // Initialiser le swipe tactile pour la galerie
    initialiserSwipeGalerie() {
        let touchStartX = 0;
        let touchEndX = 0;

        this.elements.galerieContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        this.elements.galerieContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.gererSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    gererSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.viewModel.naviguerGalerie(1); // Swipe gauche
            } else {
                this.viewModel.naviguerGalerie(-1); // Swipe droit
            }
        }
    }

    // Initialiser le scroll smooth
    initialiserScrollSmooth() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Mettre à jour la vue en fonction des changements du ViewModel
    mettreAJour(etat, changement) {
        switch (changement) {
            case 'menuToggle':
                this.mettreAJourMenu(etat.menuOuvert);
                break;
            case 'menuFerme':
                this.mettreAJourMenu(false);
                break;
            case 'galerieNavigation':
                this.mettreAJourGalerie();
                break;
            case 'galerieSlideChange':
                this.mettreAJourGalerie();
                break;
            case 'formulaireMiseAJour':
                this.mettreAJourFormulaire();
                break;
            case 'formulaireValidation':
                this.mettreAJourValidationFormulaire();
                break;
            case 'formulaireEnvoye':
                this.afficherMessageSucces();
                break;
            case 'animationsMiseAJour':
                this.mettreAJourAnimations(etat.animations);
                break;
        }
    }

    // Mise à jour du menu mobile
    mettreAJourMenu(ouvert) {
        if (this.elements.hamburger) {
            this.elements.hamburger.classList.toggle('active', ouvert);
        }
        if (this.elements.navMenu) {
            this.elements.navMenu.classList.toggle('active', ouvert);
        }
    }

    // Mise à jour de la galerie
    mettreAJourGalerie() {
        const slideActuel = this.viewModel.getSlideActuel();
        const items = this.elements.galerieItems;
        
        items.forEach((item, index) => {
            item.classList.toggle('active', index === slideActuel);
        });

        // Scroll vers le slide actif
        this.scrollerVersSlide(slideActuel);
    }

    scrollerVersSlide(index) {
        const container = this.elements.galerieContainer;
        const items = this.elements.galerieItems;
        
        if (container && items[index]) {
            const item = items[index];
            const containerRect = container.getBoundingClientRect();
            const itemRect = item.getBoundingClientRect();
            
            const scrollOffset = itemRect.left - containerRect.left - (containerRect.width - itemRect.width) / 2;
            
            container.scrollTo({
                left: container.scrollLeft + scrollOffset,
                behavior: 'smooth'
            });
        }
    }

    // Mise à jour du formulaire
    mettreAJourFormulaire() {
        const formulaire = this.viewModel.formulaireContact;
        
        if (this.elements.inputNom) this.elements.inputNom.value = formulaire.nom;
        if (this.elements.inputEmail) this.elements.inputEmail.value = formulaire.email;
        if (this.elements.inputTelephone) this.elements.inputTelephone.value = formulaire.telephone;
        if (this.elements.textareaMessage) this.elements.textareaMessage.value = formulaire.message;
    }

    // Validation du formulaire
    mettreAJourValidationFormulaire() {
        const erreurs = this.viewModel.erreursFormulaire;
        
        // Nettoyer les erreurs précédentes
        document.querySelectorAll('.erreur-message').forEach(el => el.remove());
        
        // Afficher les nouvelles erreurs
        erreurs.forEach(erreur => {
            const erreurElement = document.createElement('div');
            erreurElement.className = 'erreur-message';
            erreurElement.textContent = erreur;
            erreurElement.style.cssText = `
                color: #e74c3c;
                font-size: 0.9rem;
                margin-top: 0.5rem;
                padding: 0.5rem;
                background: #fdf2f2;
                border: 1px solid #f5c6cb;
                border-radius: 5px;
            `;
            
            if (this.elements.btnSubmit) {
                this.elements.btnSubmit.parentNode.insertBefore(erreurElement, this.elements.btnSubmit);
            }
        });
    }

    // Message de succès
    afficherMessageSucces() {
        const message = document.createElement('div');
        message.className = 'succes-message';
        message.textContent = 'Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4a9d4a, #ff8c42);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Mise à jour des animations
    mettreAJourAnimations(animations) {
        Object.entries(animations).forEach(([section, visible]) => {
            const element = document.querySelector(`#${section}`);
            if (element) {
                if (visible) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                } else {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                }
            }
        });
    }

    // Remplir le contenu dynamique
    remplirContenu() {
        this.remplirInformationsSalon();
        this.remplirServices();
        this.remplirGalerie();
        this.remplirCouleurs();
        this.remplirAPropos();
        this.remplirHoraires();
    }

    remplirInformationsSalon() {
        const info = this.viewModel.salonInfo;
        
        if (this.elements.nomSalon) {
            this.elements.nomSalon.innerHTML = `${info.name} <span>Paris Coiffure</span>`;
        }
        
        if (this.elements.adresseSalon) {
            this.elements.adresseSalon.textContent = info.address;
        }
        
        if (this.elements.telephoneSalon) {
            this.elements.telephoneSalon.href = this.viewModel.getLienTelephone();
            this.elements.telephoneSalon.textContent = info.phone;
        }
        
        // Boutons
        this.elements.btnReservation.forEach(btn => {
            btn.href = info.planity;
        });
        
        if (this.elements.btnFacebook) {
            this.elements.btnFacebook.href = info.facebook;
        }
    }

    remplirServices() {
        const servicesContainer = document.querySelector('.services-grid');
        if (!servicesContainer) return;
        
        const services = this.viewModel.services;
        servicesContainer.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icone}"></i>
                </div>
                <h3>${service.titre}</h3>
                <p>${service.description}</p>
            </div>
        `).join('');
    }

    remplirGalerie() {
        const galerieContainer = document.querySelector('.gallery-container');
        if (!galerieContainer) return;
        
        const galerie = this.viewModel.galerie;
        galerieContainer.innerHTML = galerie.map((photo, index) => `
            <div class="gallery-item ${index === 0 ? 'active' : ''}">
                <img src="${photo.src}" alt="${photo.alt}">
            </div>
        `).join('');
        
        // Réinitialiser les éléments
        this.elements.galerieItems = document.querySelectorAll('.gallery-item');
    }

    remplirCouleurs() {
        const couleurs = this.viewModel.couleurs;
        const sectionCouleurs = document.querySelector('.colors');
        if (!sectionCouleurs) return;
        
        const colorsText = sectionCouleurs.querySelector('.colors-text');
        if (colorsText) {
            colorsText.innerHTML = `
                <h2>${couleurs.titre}</h2>
                <p>${couleurs.description}</p>
                <p>${couleurs.details}</p>
                <div class="colors-features">
                    ${couleurs.caracteristiques.map(caract => `
                        <div class="color-feature">
                            <i class="${caract.icone}"></i>
                            <span>${caract.texte}</span>
                        </div>
                    `).join('')}
                </div>
                <a href="${this.viewModel.getLienReservation()}" target="_blank" class="btn-colors">
                    <i class="fas fa-calendar-check"></i>
                    Réserver ma coloration
                </a>
            `;
        }
        
        const colorsImage = sectionCouleurs.querySelector('.colors-image img');
        if (colorsImage) {
            colorsImage.src = couleurs.photo;
        }
    }

    remplirAPropos() {
        const aPropos = this.viewModel.aPropos;
        const sectionAbout = document.querySelector('.about');
        if (!sectionAbout) return;
        
        const aboutText = sectionAbout.querySelector('.about-text');
        if (aboutText) {
            aboutText.innerHTML = `
                <h2>${aPropos.titre}</h2>
                <p>${aPropos.description}</p>
                <p>${aPropos.details}</p>
                <div class="about-features">
                    ${aPropos.pointsForts.map(point => `
                        <div class="feature">
                            <i class="${point.icone}"></i>
                            <span>${point.texte}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        const aboutImage = sectionAbout.querySelector('.about-image img');
        if (aboutImage) {
            aboutImage.src = aPropos.photo;
        }
    }

    remplirHoraires() {
        const horaires = this.viewModel.horaires;
        const horairesElement = document.querySelector('.contact-details p');
        
        if (horairesElement && horairesElement.textContent.includes('Horaires')) {
            const lignesHoraires = horaires.join('<br>');
            horairesElement.innerHTML = lignesHoraires;
        }
    }

    // Initialisation complète
    initialiser() {
        this.remplirContenu();
        
        // Ajouter les styles CSS pour les animations
        this.ajouterStylesDynamiques();
    }

    ajouterStylesDynamiques() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .service-card, .gallery-item, .about-text, .contact-item {
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
        `;
        document.head.appendChild(style);
    }
}

export default SalonView;
