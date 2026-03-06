# Guide de Déploiement - Espace Paris Coiffure

## Options de Déploiement

### 1. Netlify (Recommandé - Gratuit)
**Avantages :** Gratuit, facile, HTTPS automatique, déploiement continu

**Étapes :**
1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez votre dossier dans l'interface Netlify
3. Ou utilisez Netlify Drop : [app.netlify.com/drop](https://app.netlify.com/drop)
4. Votre site sera disponible instantanément

### 2. Vercel (Recommandé - Gratuit)
**Avantages :** Gratuit, performant, HTTPS automatique

**Étapes :**
1. Créez un compte sur [vercel.com](https://vercel.com)
2. Importez votre projet depuis GitHub/GitLab ou glissez-déposez
3. Déploiement automatique

### 3. GitHub Pages (Gratuit)
**Avantages :** Gratuit, intégré à GitHub

**Étapes :**
1. Créez un repository GitHub
2. Uploadez vos fichiers
3. Allez dans Settings → Pages
4. Choisissez la branche `main` et le dossier `/root`
5. Votre site sera disponible à `username.github.io/repository-name`

### 4. Hébergement Mutualisé (Payant)
**Options :** OVH, Hostinger, GoDaddy, etc.

**Étapes :**
1. Achetez un nom de domaine si nécessaire
2. Souscrivez à un hébergement mutualisé
3. Utilisez FileZilla ou FTP pour uploader les fichiers
4. Configurez le nom de domaine

### 5. Firebase Hosting (Gratuit)
**Avantages :** Gratuit, rapide, CDN intégré

**Étapes :**
1. Installez Firebase CLI : `npm install -g firebase-tools`
2. Initialisez : `firebase init hosting`
3. Déployez : `firebase deploy`

## Fichiers à Déployer

**Dossier principal :**
```
Paris coiffure Bar-Le-Duc/
├── index.html
├── style.css
├── script.js
├── README.md
├── DEPLOYMENT.md
└── Photos/
    ├── 1.jpg
    ├── 2.png.avif
    ├── 3.jpg
    ├── 4.jpg
    ├── 5.jpg
    ├── 6.jpg
    ├── 7.jpg
    ├── 8.jpg
    ├── 9.jpg
    └── 10.jpg
```

## Avant le Déploiement

### 1. Vérification finale
```bash
# Test local
python3 -m http.server 8000
# Accédez à http://localhost:8000
```

### 2. Optimisation des images
- Vérifiez que toutes les images sont optimisées
- Taille recommandée : < 500KB par image
- Format moderne : WebP ou AVIF si possible

### 3. Vérification des liens
- Testez tous les liens internes
- Vérifiez les liens externes (Planity, Facebook)
- Confirmez les numéros de téléphone

## Déploiement Rapide avec Netlify Drop

1. **Compresser votre dossier :**
   - Sélectionnez tous les fichiers
   - Créez un fichier ZIP

2. **Déploiement :**
   - Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
   - Glissez votre fichier ZIP
   - Attendez le déploiement (2-3 minutes)

3. **Résultat :**
   - URL automatique : `random-name-123456.netlify.app`
   - HTTPS inclus
   - CDN mondial

## Personnalisation Post-Déploiement

### 1. Nom de domaine personnalisé
- Achetez un domaine (ex: espacepariscoiffure.fr)
- Configurez-le dans les paramètres de votre hébergeur
- Ajoutez les enregistrements DNS

### 2. SEO de base
```html
<!-- Ajoutez dans index.html -->
<meta name="description" content="Espace Paris Coiffure - Salon de coiffure à Bar-le-Duc. Découvrez nos services de coupe, coloration et soin.">
<meta name="keywords" content="coiffure, bar-le-duc, coupe, coloration, soin capillaire">
<meta property="og:title" content="Espace Paris Coiffure - Bar-le-Duc">
<meta property="og:description" content="Salon de coiffure professionnel à Bar-le-Duc">
<meta property="og:image" content="Photos/5.jpg">
```

### 3. Google Analytics (Optionnel)
```html
<!-- Ajoutez avant </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Maintenance

### 1. Mises à jour
- Modifiez les fichiers localement
- Re-déployez avec la même méthode
- Les changements sont instantanés

### 2. Sauvegarde
- Gardez une copie locale de vos fichiers
- Utilisez Git pour version control
- Sauvegardez vos photos originales

### 3. Monitoring
- Surveillez les performances avec Google PageSpeed
- Vérifiez que tous les liens fonctionnent
- Testez régulièrement sur mobile

## Support

Pour toute question sur le déploiement :
- Documentation Netlify : [docs.netlify.com](https://docs.netlify.com)
- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Support GitHub : [docs.github.com](https://docs.github.com)

---

**Note :** Ce site est optimisé pour un déploiement statique, ce qui le rend très rapide et sécurisé.
