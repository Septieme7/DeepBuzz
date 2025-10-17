# 🎮 SOUNDBOARD & TIMER & ROUE DU HASARD Good or Bad...

> **Application de soundboard avec chronomètre/timer intégré et roue du hasard pour sélection aléatoire de noms**  
> Style avec effets néon rouge/orange/jaune, design cyberpunk rétro-futuriste

---

## 📁 Structure du projet

```
projet/
├── 📄 index.html              # Page principale (soundboard)
├── ⏱️ timer.html               # Chronomètre/Timer
├── 🎲 random.html              # Roue du hasard (sélecteur aléatoire de noms)
└── 📦 assets/
    ├── 🎨 css/
    │   ├── style.css          # Styles pour soundboard
    │   ├── timer.css          # Styles pour timer
    │   └── random.css         # Styles pour roue du hasard
    ├── ⚙️ js/
    │   ├── main.js            # Logique soundboard
    │   ├── timer.js           # Logique timer
    │   └── random.js          # Logique roue du hasard
    ├── 🔊 sound/
    │   ├── sound1.mp3         # Sons soundboard (1-30)
    │   ├── ... (jusqu'à sound30.mp3)
    │   ├── fin5.mp3           # Sons fin timer 5 min
    │   ├── fin10.mp3          # Sons fin timer 10 min
    │   ├── fin15.mp3          # Sons fin timer 15 min
    │   ├── fin30.mp3          # Sons fin timer 30 min (Alf)
    │   ├── fin60.mp3          # Sons fin timer 60 min
    │   ├── finCustom.mp3      # Sons fin timer personnalisé
    │   ├── roueTurn.mp3       # Son rotation roue
    │   └── winnerIS.mp3       # Son gagnant roue
    ├── 🖼️ images/
    │   └── alf.png            # Image Alf pour timer 30 min
    ├── 🎯 icon/
    │   ├── android-chrome-192x192.png
    │   ├── android-chrome-512x512.png
    │   ├── apple-touch-icon.png
    │   ├── favicon-16x16.png
    │   ├── favicon-32x32.png
    │   └── favicon.ico
    └── 📱 manifest/
        └── site.webmanifest
```

---

## 🎨 Configuration des icônes et manifest

### 🔗 HTML (`<head>` commun aux pages)

```html
<!-- Icônes PWA -->
<link rel="apple-touch-icon" sizes="180x180" href="assets/icon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icon/favicon-16x16.png">
<link rel="manifest" href="assets/manifest/site.webmanifest">

<!-- Styles spécifiques -->
<link rel="stylesheet" href="assets/css/style.css">  <!-- Pour index.html -->
<!-- Ou timer.css pour timer.html, random.css pour random.html -->
```

### 🎯 Fichiers d'icônes requis (PWA compatible)

| Fichier | Dimension | Usage |
|---------|-----------|-------|
| 🍎 `apple-touch-icon.png` | 180×180px | iOS/Safari homescreen |
| 🤖 `android-chrome-192x192.png` | 192×192px | Android Chrome petit splash |
| 🤖 `android-chrome-512x512.png` | 512×512px | Android Chrome grand splash |
| 🌐 `favicon-32x32.png` | 32×32px | Navigateurs modernes |
| 🌐 `favicon-16x16.png` | 16×16px | Navigateurs anciens/IE |
| 💠 `favicon.ico` | Multi-tailles | Compatibilité legacy |

### 📱 Manifest (`assets/manifest/site.webmanifest`)

```json
{
  "name": "Soundboard & Timer Cyberpunk",
  "short_name": "SoundTimer",
  "description": "Soundboard avec timer et roue du hasard cyberpunk",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0a",
  "theme_color": "#ff0000",
  "icons": [
    {
      "src": "assets/icon/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "assets/icon/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 🎨 Palette de couleurs (Cyberpunk Néon)

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| 🔴 Rouge intense | `#FF0000` | Accents, bordures actives, flèches |
| 🟠 Orange vif | `#FF6600` | Bordures principales, textes secondaires |
| 🟡 Jaune lumineux | `#FFAA00` | Textes principaux, affichages (gagnant, timer) |
| ⚫ Noir profond | `#0A0A0A` | Arrière-plan principal |
| 🔥 Rouge sombre | `#1A0000` | Fonds de cartes/boutons, gradients |

---

## 🔊 Fichiers audio

### 🎵 Sons Soundboard (`assets/sound/sound1.mp3` à `sound30.mp3`)

Remplacer les placeholders par les génériques et bruitages suggérés :

#### 📺 Génériques Jeux TV Français (1-10)
1. Questions pour un Champion
2. Des Chiffres et des Lettres
3. Fort Boyard
4. La Roue de la Fortune
5. Qui veut gagner des millions ?
6. Intervilles
7. Le Juste Prix
8. Pyramide
9. Burger Quiz
10. N'oubliez pas les paroles

#### 🌍 Génériques Jeux TV Internationaux (11-15)
11. Jeopardy!
12. Wheel of Fortune (US)
13. The Price is Right
14. Family Feud
15. Who Wants to Be a Millionaire

#### 🔔 Bruitages & Effets (16-25)
16. Buzzer mauvaise réponse
17. Buzzer bonne réponse
18. Applaudissements
19. Suspense
20. Victoire
21. Défaite
22. Tic-tac (compte à rebours)
23. Fanfare
24. Roulement de tambour
25. Gong

#### ✨ Sons Bonus (26-30)
26. "Ohh" de déception
27. "Yeah" de joie
28. Rire du public
29. Cloche de fin
30. Sirène d'alerte

### ⏱️ Sons Timer (`assets/sound/fin*.mp3`)
| Fichier | Description |
|---------|-------------|
| `fin5.mp3` | Alarme fin 5 min |
| `fin10.mp3` | Alarme fin 10 min |
| `fin15.mp3` | Alarme fin 15 min |
| `fin30.mp3` | Alarme fin 30 min (spéciale Alf) |
| `fin60.mp3` | Alarme fin 60 min |
| `finCustom.mp3` | Alarme fin personnalisé |

### 🎲 Sons Roue du Hasard
| Fichier | Description |
|---------|-------------|
| `roueTurn.mp3` | Son rotation de la roue |
| `winnerIS.mp3` | Son annonce gagnant |

**Notes Audio** : Format MP3 recommandé. Génériques : 15-30s ; Bruitages : 1-5s. Volume défaut soundboard : 77%.

---

## 🚀 Fonctionnalités

### 🎵 Soundboard (`index.html`)
- ✅ **30 boutons de sons** personnalisables (génériques TV + bruitages)
- ✅ **Renommage** des sons via modal (persistant via localStorage)
- ✅ **Contrôle volume** (boutons +/-, affichage %)
- ✅ **Bouton Stop individuel/global** pour arrêter les sons en cours
- ✅ **Mode plein écran** (bouton dédié)
- ✅ **Navigation** vers timer.html et random.html (nouveaux onglets)
- ✅ **Sauvegarde** préférences (volume, noms custom)
- ✅ **Design cyberpunk** : néon glow, scanlines, pulse sur playing, ondes au hover
- ✅ **Responsive** : boutons centrés sous h1, grid adaptative, media queries (768px/480px)

### ⏱️ Timer/Chronomètre (`timer.html`)
- ✅ **Chronomètre** : démarrage/pause/reset, affichage HH:MM:SS
- ✅ **Timers prédéfinis** : boutons 5/10/15/30/60 min (Alf image pour 30 min)
- ✅ **Timer personnalisé** : input 1-777 min + valider
- ✅ **Alarmes différenciées** : sons spécifiques par durée
- ✅ **Boutons contrôle** : démarrer/stop/reset avec couleurs (vert/rouge/orange)
- ✅ **Mode plein écran** et **retour index.html**
- ✅ **Design cyberpunk** coordonné : glows, gradients, pulse sur running
- ✅ **Responsive** : sections stackées, boutons wrap, tailles clamp()

### 🎲 Sélecteur Aléatoire - Roue du Hasard (`random.html`)
- ✅ **Roue canvas animée** : 21 sections (20 noms + "💰 LE MILLION 💰")
- ✅ **Noms & poids** : D A (5), H A (5), B A (0.5), ... T V (5), LE MILLION (1) – probas ~4.76% chacun ajustées
- ✅ **Spin animé** : 5-8 tours + easing, flèche pointe gagnant exact
- ✅ **Sons** : roueTurn.mp3 (lancement), winnerIS.mp3 (gagnant)
- ✅ **Affichage gagnant** : texte pulse néon + animation
- ✅ **Ampoules clignotantes** : effets LED sur bordure roue (6 par section)
- ✅ **Boutons contrôle** : plein écran, retour index.html (icônes 🖵 🏠)
- ✅ **Design cyberpunk** : canvas glow, textes courbés, responsive (canvas scale)
- ✅ **Clavier** : Espace pour lancer spin
- ✅ **Responsive** : wheel-container adaptatif (600px → 400px mobile)

### 🌐 Navigation & Intégration
- ✅ **Boutons header soundboard** : volume, fullscreen, timer (⏱️), random (🎲) – centrés sous h1
- ✅ **Boutons subpages** : fullscreen + retour accueil (nouveaux onglets pour timer/random)
- ✅ **PWA-ready** : manifest, icônes multi-plateformes

---

## 💻 Technologies utilisées

- 🌐 **HTML5** : Structure sémantique, canvas pour roue
- 🎨 **CSS3** : Gradients, animations (@keyframes pulse/glow), flex/grid responsive, clamp() pour tailles fluides
- ⚙️ **JavaScript ES6+** : Classes (Soundboard, TimerApp), async/await audio, localStorage, requestAnimationFrame pour spin
- 🖼️ **Canvas API** : Dessin roue, textes courbés, ampoules animées
- 🔊 **Web Audio API** : Lecture sons (play/pause/volume), gestion erreurs
- 💾 **localStorage** : Persistance noms sons, volume, thème
- 📱 **PWA** : Manifest pour installable/offline

---

## 🎯 Installation & Utilisation

1. **Cloner/télécharger** le projet
2. **Ajouter fichiers audio** dans `/assets/sound/` :
   - sound1.mp3 à sound30.mp3 (génériques/bruitages)
   - fin*.mp3 (timers)
   - roueTurn.mp3, winnerIS.mp3 (roue)
3. **Ajouter images** : alf.png dans `/assets/images/`
4. **Générer icônes** (palette rouge/orange) et placer dans `/assets/icon/`
5. **Ouvrir** `index.html` dans navigateur moderne (Chrome/Firefox/Safari)
6. **Tester** :
   - Soundboard : clics sons, renommage (✏️ au hover), volume/stop
   - Timer : boutons prédéfinis/custom, Alf 30min, alarmes
   - Random : bouton lancer, spin → gagnant + sons
7. **PWA** : Ajouter à homescreen via manifest
8. **Fullscreen** : Boutons dédiés sur toutes pages

**Dépannage** : Vérifiez chemins assets, activez autoplay audio (user gesture), console logs pour erreurs.

---

## 🎨 Thème Cyberpunk

### Palette de couleurs étendue

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| 🔴 Rouge intense | `#FF0000` | Accents, flèches, bordures actives, stop |
| 🟠 Orange vif | `#FF6600` | Bordures, textes secondaires, reset |
| 🟡 Jaune lumineux | `#FFAA00` | Textes principaux, volume, gagnant |
| ⚫ Noir profond | `#0A0A0A` | Arrière-plan, scanlines |
| 🔥 Rouge sombre | `#1A0000` | Fonds boutons/cartes, gradients |
| 🟢 Vert succès | `#66FF00` | Démarrer/running (timer) |
| 🔴 Rouge erreur | `#FF3300` | Stop, alarmes critiques |

### Effets visuels implémentés

- 💡 **Néon glow** : box-shadow, text-shadow, filter drop-shadow sur canvas/boutons
- 📺 **Scanlines rétro** : ::before repeating-linear-gradient sur body
- ⚡ **Animations pulse** : @keyframes pour gagnant, running, playing, arrow
- 🌊 **Ondes lumineuses** : ::before/::after cercles expand au hover
- 🎆 **Bordures animées** : gradients rotatifs, blur, opacity transitions
- 🛠️ **Autres** : rotate/scale hover, clignotement ampoules (sin waves), easing spin (cubic-bezier)

**Responsive** : Flexbox/grid, clamp(), media queries (768px/480px) – boutons centrés sous h1 partout.

---

## 👍👎 Feedback

- ✅ **Implémenté** : Soundboard full (30 sons, rename, stop, volume), Timer (chrono + presets/custom + Alf + alarmes), Roue hasard (21 sections pondérées, spin animé, sons, canvas effets)
- ✅ **Navigation** : Liens onglets vers subpages, retours fullscreen
- ✅ **Persistance** : localStorage noms/volume
- 🔄 **Améliorations** : Ajout random dans structure/fonctionnalités
- 🚀 **Performances** : RAF pour animations fluides, error handling audio/canvas

In the next time... Ajouter plus de sons réels, PWA service worker pour offline.

---

## 📝 Notes

- **Audio** : MP3 ; Autoplay nécessite interaction user ; Erreurs console pour debug
- **Roue** : 20 noms (poids 5 sauf B A 0.5) + LE MILLION (1) ; Total poids ~100 pour proba exacte
- **Icônes** : Créer avec outils comme Favicon.io (thème rouge/orange)
- **Compatibilité** : Modernes navigateurs ; Canvas/audio support
- **Volume défaut** : 77% soundboard ; Timer sons full volume
- **Clavier** : Espace pour spin roue ; Escape pour modals

---

## 🔮 Roadmap

- [ ] Import/export audio via drag-drop
- [ ] Catégories sons (TV/Bruitages/Bonus)
- [ ] Thème toggle (dark/light cyberpunk variants)
- [ ] Intégration sons roue dans soundboard
- [ ] PWA offline (service worker cache assets)
- [ ] Multi-langues (FR/EN)
- [ ] Mode animateur dashboard (multi-écrans)
- [ ] Sons TV réels (licences libres/CC0)

**🎮🔥** Projet live : Hébergez sur GitHub Pages/Netlify pour test PWA !