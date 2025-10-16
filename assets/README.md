# 🎮 SOUNDBOARD & TIMER Good or Bad...

> **Application de soundboard avec chronomètre/timer intégré**  
> Style avec effets néon rouge/orange/jaune

---

## 📁 Structure du projet

```
projet/
├── 📄 index.html          # Page principale (soundboard)
├── ⏱️ timer.html          # Chronomètre/Timer
└── 📦 assets/
    ├── 🎨 css/
    │   ├── style.css      # Styles pour soundboard
    │   └── timer.css      # Styles pour timer
    ├── ⚙️ js/
    │   ├── main.js        # Logique soundboard
    │   └── timer.js       # Logique timer
    ├── 🔊 sound/
    │   ├── sound1.mp3
    │   ├── sound2.mp3
    │   └── ... (jusqu'à sound30.mp3)
    ├── 🖼️ images/
    │   └── alf.png
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

### 🔗 HTML (`<head>`)

```html
<!-- Icônes -->
<link rel="apple-touch-icon" sizes="180x180" href="assets/icon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icon/favicon-16x16.png">
<link rel="manifest" href="assets/manifest/site.webmanifest">

<!-- Styles -->
<link rel="stylesheet" href="assets/css/style.css">
```

### 🎯 Fichiers d'icônes requis

| Fichier | Dimension | Usage |
|---------|-----------|-------|
| 🍎 `apple-touch-icon.png` | 180×180px | iOS/Safari |
| 🤖 `android-chrome-192x192.png` | 192×192px | Android petit |
| 🤖 `android-chrome-512x512.png` | 512×512px | Android grand |
| 🌐 `favicon-32x32.png` | 32×32px | Navigateurs modernes |
| 🌐 `favicon-16x16.png` | 16×16px | Navigateurs anciens |
| 💠 `favicon.ico` | Multi-tailles | Compatibilité maximale |

### 🎨 Palette de couleurs recommandée pour les icônes

```css
🔴 Rouge primaire:   #FF0000
🟠 Orange éclatant:  #FF6600
🟡 Jaune lumineux:   #FFAA00
⚫ Noir profond:     #0A0A0A
🔥 Rouge sombre:     #1A0000
```

---

## 🔊 Fichiers audio actuels

### ⏱️ Sons du Timer (`assets/sound/`)

| Fichier | Description | Durée |
|---------|-------------|-------|
| 🔔 `fin5.mp3` | Fin timer 5 minutes | Variable |
| 🔔 `fin10.mp3` | Fin timer 10 minutes | Variable |
| 🔔 `fin15.mp3` | Fin timer 15 minutes | Variable |
| 👽 `fin30.mp3` | Fin timer 30 min (Alf) | Variable |
| 🔔 `fin60.mp3` | Fin timer 60 minutes | Variable |
| ⚙️ `finCustom.mp3` | Fin timer personnalisé | Variable |

---

## 🎵 Sons à ajouter (30 emplacements)

### 📺 Génériques Jeux TV Français (10 sons)

| # | Titre | Statut |
|---|-------|--------|
| 1️⃣ | Questions pour un Champion | 🔜 À venir |
| 2️⃣ | Des Chiffres et des Lettres | 🔜 À venir |
| 3️⃣ | Fort Boyard | 🔜 À venir |
| 4️⃣ | La Roue de la Fortune | 🔜 À venir |
| 5️⃣ | Qui veut gagner des millions ? | 🔜 À venir |
| 6️⃣ | Intervilles | 🔜 À venir |
| 7️⃣ | Le Juste Prix | 🔜 À venir |
| 8️⃣ | Pyramide | 🔜 À venir |
| 9️⃣ | Burger Quiz | 🔜 À venir |
| 🔟 | N'oubliez pas les paroles | 🔜 À venir |

### 🌍 Génériques Jeux TV Internationaux (5 sons)

| # | Titre | Statut |
|---|-------|--------|
| 1️⃣1️⃣ | Jeopardy! | 🔜 À venir |
| 1️⃣2️⃣ | Wheel of Fortune (US) | 🔜 À venir |
| 1️⃣3️⃣ | The Price is Right | 🔜 À venir |
| 1️⃣4️⃣ | Family Feud | 🔜 À venir |
| 1️⃣5️⃣ | Who Wants to Be a Millionaire | 🔜 À venir |

### 🔔 Bruitages & Effets (10 sons)

| # | Type | Statut |
|---|------|--------|
| 1️⃣6️⃣ | Buzzer mauvaise réponse | 🔜 À venir |
| 1️⃣7️⃣ | Buzzer bonne réponse | 🔜 À venir |
| 1️⃣8️⃣ | Applaudissements | 🔜 À venir |
| 1️⃣9️⃣ | Suspense | 🔜 À venir |
| 2️⃣0️⃣ | Victoire | 🔜 À venir |
| 2️⃣1️⃣ | Défaite | 🔜 À venir |
| 2️⃣2️⃣ | Tic-tac (compte à rebours) | 🔜 À venir |
| 2️⃣3️⃣ | Fanfare | 🔜 À venir |
| 2️⃣4️⃣ | Roulement de tambour | 🔜 À venir |
| 2️⃣5️⃣ | Gong | 🔜 À venir |

### ✨ Sons Bonus (5 sons)

| # | Type | Statut |
|---|------|--------|
| 2️⃣6️⃣ | "Ohh" de déception | 🔜 À venir |
| 2️⃣7️⃣ | "Yeah" de joie | 🔜 À venir |
| 2️⃣8️⃣ | Rire du public | 🔜 À venir |
| 2️⃣9️⃣ | Cloche de fin | 🔜 À venir |
| 3️⃣0️⃣ | Sirène d'alerte | 🔜 À venir |

---

## 🚀 Fonctionnalités

### 🎵 Soundboard

- ✅ **30 boutons de sons**         personnalisables
- ✅ **Renommage**                  des sons via interface
- ✅ **Contrôle du volume**         (0-100%)
- ✅ **Mode plein écran**
- ✅ **Sauvegarde**                 des préférences (localStorage)
- ✅ **Design cyberpunk**           avec effets néon

### ⏱️ Timer/Chronomètre

- ✅ **Chronomètre**                avec démarrage/pause/reset
- ✅ **Timers prédéfinis**          : 5, 10, 15, 30, 60 minutes
- ✅ **Timer personnalisé**         (1-777 minutes)
- ✅ **Sons différents**            selon la durée
- ✅ **Image Alf**                  pour le timer 30 minutes
- ✅ **Design cyberpunk**           coordonné

---

## 💻 Technologies utilisées

- 🌐 **HTML5** -                    Structure sémantique
- 🎨 **CSS3** -                     Design cyberpunk avec animations
- ⚙️ **JavaScript ES6+** -          Logique interactive
- 💾 **LocalStorage** -             Sauvegarde des préférences
- 🔊 **Web Audio API** -            Lecture des sons

---

## 🎯 Installation

1. **Cloner**                       ou télécharger le projet
2. **Ajouter**                      vos fichiers audio dans `/assets/sound/`
3. **Nommer**                       les fichiers : `sound1.mp3` à `sound30.mp3`
4. **Ouvrir**                       `index.html` dans un navigateur

---

## 🎨 Thème Cyberpunk

### Palette de couleurs

| Couleur | Code HEX | Usage |
|---------|----------|-------|
| 🔴 Rouge intense  | `#FF0000` | Accents, bordures actives |
| 🟠 Orange vif     | `#FF6600` | Bordures principales |
| 🟡 Jaune lumineux | `#FFAA00` | Textes, affichages |
| ⚫ Noir profond   | `#0A0A0A` | Arrière-plan |
| 🔥 Rouge sombre   | `#1A0000` | Fonds de cartes |

### Effets visuels

- 💡 **Néon glow** sur tous les éléments
- 📺 **Scanlines** rétro-futuristes
- ⚡ **Animations pulse** sur éléments actifs
- 🌊 **Ondes lumineuses** au survol
- 🎆 **Bordures animées** avec dégradés

---

## 👍👎 Feedback

In the next time...

---

## 📝 Notes

- Les sons doivent être au format **MP3**
- Durée recommandée : **15-30 secondes** pour les génériques
- **Bruitages courts** : 1-5 secondes
- Volume par défaut : **77%**

---

## 🔮 Roadmap

- [ ] Import de fichiers audio via interface
- [ ] Catégories de sons personnalisables
- [ ] Export/Import de la configuration
- [ ] Mode tableau de bord pour animateurs
- [ ] Support multi-langues

---

**🎮🔥**