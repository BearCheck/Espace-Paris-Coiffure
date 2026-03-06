/**
 * Model - Gestion des données du salon
 */
class SalonModel {
    constructor() {
        this.salonInfo = {
            name: "Espace Paris Coiffure",
            address: "15 rue Jean Jacques Rousseau, 55000 Bar-le-Duc",
            phone: "+33 3 29 45 60 71",
            email: "contact@espacepariscoiffure.fr",
            facebook: "https://www.facebook.com/espacepariscoiffure/photos?locale=fr_FR",
            planity: "https://planity.fr/paris-coiffure-bar-le-duc"
        };

        this.horaires = {
            lundi: { ouvert: false },
            mardi: { ouvert: true, heures: ["09:00–12:00", "13:30–18:30"] },
            mercredi: { ouvert: true, heures: ["09:00–18:30"] },
            jeudi: { ouvert: true, heures: ["09:00–18:30"] },
            vendredi: { ouvert: true, heures: ["09:00–18:30"] },
            samedi: { ouvert: true, heures: ["09:00–16:30"] },
            dimanche: { ouvert: false }
        };

        this.services = [
            {
                id: 1,
                titre: "Coupe Homme",
                description: "Coupe moderne et stylée pour hommes",
                icone: "fas fa-cut",
                prix: "25€"
            },
            {
                id: 2,
                titre: "Coupe Femme",
                description: "Coupe tendance et mise en forme",
                icone: "fas fa-cut",
                prix: "35€"
            },
            {
                id: 3,
                titre: "Coloration",
                description: "Coloration experte et sur-mesure",
                icone: "fas fa-palette",
                prix: "60€"
            },
            {
                id: 4,
                titre: "Mèches",
                description: "Mèches subtiles et balayages",
                icone: "fas fa-magic",
                prix: "45€"
            },
            {
                id: 5,
                titre: "Soins",
                description: "Soins capillaires profonds",
                icone: "fas fa-spa",
                prix: "30€"
            },
            {
                id: 6,
                titre: "Coiffure Mariage",
                description: "Coiffures élégantes pour événements",
                icone: "fas fa-crown",
                prix: "80€"
            }
        ];

        this.galerie = [
            { id: 1, src: "Photos/10.jpg", alt: "Réalisation 1" },
            { id: 2, src: "Photos/3.jpg", alt: "Réalisation 2" },
            { id: 3, src: "Photos/4.jpg", alt: "Réalisation 3" },
            { id: 4, src: "Photos/7.jpg", alt: "Réalisation 4" },
            { id: 5, src: "Photos/8.jpg", alt: "Réalisation 5" },
            { id: 6, src: "Photos/1.jpg", alt: "Réalisation 6" }
        ];

        this.couleurs = {
            titre: "Nos Colorations",
            description: "Découvrez notre expertise en coloration ! Des teintes sublimes qui révèlent votre personnalité et mettent en valeur votre beauté naturelle.",
            details: "Je vous propose des services personnalisés : des mèches subtiles aux colorations complètes, en passant par les balayages modernes et les ombrés tendance.",
            photo: "Photos/2.png.avif",
            caracteristiques: [
                { icone: "fas fa-palette", texte: "Colorations sur-mesure" },
                { icone: "fas fa-leaf", texte: "Produits naturels" },
                { icone: "fas fa-star", texte: "Résultat durable" }
            ]
        };

        this.aPropos = {
            titre: "À Propos de Espace Paris Coiffure",
            description: "Depuis plus de 15 ans, notre salon met son savoir-faire et sa passion au service de votre beauté. Notre équipe de coiffeurs professionnels vous accompagne dans le choix de votre nouvelle coupe, couleur ou soin.",
            details: "Nous utilisons des produits de qualité supérieure et nous formons continuellement aux dernières tendances pour vous offrir un service d'excellence.",
            photo: "Photos/9.jpg",
            pointsForts: [
                { icone: "fas fa-award", texte: "15 ans d'expérience" },
                { icone: "fas fa-graduation-cap", texte: "Équipe qualifiée" },
                { icone: "fas fa-heart", texte: "Service personnalisé" },
                { icone: "fas fa-star", texte: "Produits premium" }
            ]
        };
    }

    // Getters pour accéder aux données
    getSalonInfo() {
        return this.salonInfo;
    }

    getHoraires() {
        return this.horaires;
    }

    getServices() {
        return this.services;
    }

    getGalerie() {
        return this.galerie;
    }

    getCouleurs() {
        return this.couleurs;
    }

    getAPropos() {
        return this.aPropos;
    }

    // Méthodes de manipulation des données
    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }

    getPhotoGalerieById(id) {
        return this.galerie.find(photo => photo.id === id);
    }

    // Validation des données
    validerContact(data) {
        const erreurs = [];
        
        if (!data.nom || data.nom.trim().length < 2) {
            erreurs.push("Le nom doit contenir au moins 2 caractères");
        }
        
        if (!data.email || !this.validerEmail(data.email)) {
            erreurs.push("L'email n'est pas valide");
        }
        
        if (!data.message || data.message.trim().length < 10) {
            erreurs.push("Le message doit contenir au moins 10 caractères");
        }
        
        return erreurs;
    }

    validerEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Formatage des horaires pour affichage
    formaterHoraires() {
        const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
        return jours.map(jour => {
            const horaire = this.horaires[jour];
            if (!horaire.ouvert) {
                return `${jour.charAt(0).toUpperCase() + jour.slice(1)}: Fermé`;
            }
            return `${jour.charAt(0).toUpperCase() + jour.slice(1)}: ${horaire.heures.join(", ")}`;
        });
    }
}

export default SalonModel;
