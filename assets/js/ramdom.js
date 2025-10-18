const nomsAvecPoids = [
    { nom: "Dorian", poids: 5 },
    { nom: "Habib", poids: 5 },
    { nom: "Ben", poids: 0.5 },
    { nom: "Alex", poids: 5 },
    { nom: "Salah", poids: 5 },
    { nom: "Yannick", poids: 5 },
    { nom: "Eric", poids: 5 },
    { nom: "Ines", poids: 5 },
    { nom: "Eva", poids: 5 },
    { nom: "Philippe", poids: 5 },
    { nom: "Enzo", poids: 5 },
    { nom: "Laurene", poids: 5 },
    { nom: "Ximenia", poids: 5 },
    { nom: "Alexandre I", poids: 5 },
    { nom: "Alexandre M", poids: 5 },
    { nom: "Justin", poids: 5 },
    { nom: "Bilal", poids: 5 },
    { nom: "Thomas", poids: 5 },
    { nom: "Anthonin", poids: 5 },
    { nom: "Théo", poids: 5 },
    { nom: "💰 LE MILLION 💰", poids: 1 }
];

const noms = nomsAvecPoids.map(n => n.nom);
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const winnerDiv = document.getElementById('winner');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const homeBtn = document.getElementById('homeBtn');

const colors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffaa00', '#cc0000', '#990000'];
let currentRotation = 0;
let isSpinning = false;

// Initialize audio
const spinSound = new Audio('assets/sound/roueTurn.mp3');
const winnerSound = new Audio('assets/sound/winnerIS.mp3');

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;
    const anglePerSection = (2 * Math.PI) / noms.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);

    noms.forEach((nom, index) => {
        const startAngle = index * anglePerSection;
        const endAngle = startAngle + anglePerSection;

        // Segment coloré
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index % colors.length];
        ctx.fill();

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 🔥 AMPOULES SUR LES BORDS DES SECTIONS
        drawSectionBulbs(startAngle, endAngle, radius, index, isSpinning);

        // 📝 TEXTE AU CENTRE DE LA SECTION
        drawCurvedText(nom, startAngle, endAngle, radius * 0.8, anglePerSection);
    });

    ctx.restore();
}

// 🔥 FONCTION AMPOULES PAR SECTION (Roue de la Fortune)
function drawSectionBulbs(startAngle, endAngle, radius, sectionIndex, spinning) {
    const numBulbs = 6; // 6 ampoules par section
    const bulbRadius = radius * 0.9; // Très près du bord extérieur
    const baseBulbSize = spinning ? 6 : 4;
    
    for (let i = 0; i < numBulbs; i++) {
        // Position angulaire uniforme dans la section
        const progress = (i + 0.5) / numBulbs;
        const bulbAngle = startAngle + progress * (endAngle - startAngle);
        
        // Coordonnées
        const x = Math.cos(bulbAngle) * bulbRadius;
        const y = Math.sin(bulbAngle) * bulbRadius;
        
        // Couleur de l'ampoule
        const bulbColor = getBulbColor(sectionIndex, i);
        
        // Animation clignotement
        const time = performance.now() / 1000;
        const blinkSpeed = spinning ? 0.2 : 1.5; // Plus rapide en spin
        const phase = (sectionIndex * 100 + i * 200 + time * blinkSpeed * 10) % (Math.PI * 2);
        const opacity = 0.3 + Math.abs(Math.sin(phase)) * 0.7;
        const size = baseBulbSize + Math.sin(time * 15 + sectionIndex) * (spinning ? 2 : 1);
        const glowIntensity = spinning ? 25 : 15;
        
        drawSingleBulb(x, y, bulbColor, size, opacity, glowIntensity);
    }
}

// Dessiner une ampoule individuelle
function drawSingleBulb(x, y, color, size, opacity, glowIntensity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    
    // Glow d'arrière-plan
    ctx.shadowColor = color;
    ctx.shadowBlur = glowIntensity;
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity * 0.4;
    ctx.fill();
    
    // Corps principal de l'ampoule
    ctx.shadowBlur = 0;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Reflet blanc
    ctx.beginPath();
    ctx.arc(-size * 0.3, -size * 0.3, size * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    
    // Contour fin
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.restore();
}

// Palette de couleurs d'ampoules
function getBulbColor(sectionIndex, bulbIndex) {
    const bulbColors = [
        '#ffff00', // Jaune vif
        '#ffaa00', // Orange doré
        '#ff6600', // Orange
        '#ff0000', // Rouge
        '#ff00ff', // Magenta
        '#00ffff', // Cyan
        '#00ff00', // Vert
        '#ffffff'  // Blanc
    ];
    const index = (sectionIndex * 2 + bulbIndex) % bulbColors.length;
    return bulbColors[index];
}

function drawCurvedText(text, startAngle, endAngle, radius, anglePerSection) {
    ctx.save();
    
    const midAngle = startAngle + anglePerSection / 2;
    const textRadius = radius * 0.8; 
    
    ctx.translate(
        Math.cos(midAngle) * textRadius,
        Math.sin(midAngle) * textRadius
    );
    ctx.rotate(midAngle);
    
    // Taille de police optimisée
    const fontSize = Math.max(16, 120 / text.length);
    ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
    ctx.fillStyle = '#ffffff'; 
    ctx.strokeStyle = '#000000'; // Contour NOIR
    ctx.lineWidth = 2.5;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Multi-lignes intelligentes
    const maxCharsPerLine = 18;
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    words.forEach(word => {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        if (testLine.length > maxCharsPerLine) {
            if (currentLine.length > 0) lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    });
    if (currentLine.length > 0) lines.push(currentLine.trim());
    
    const lineSpacing = fontSize * 1.2;
    lines.forEach((line, lineIndex) => {
        const yOffset = -lineIndex * lineSpacing;
        
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.strokeText(line, 0, yOffset);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.fillText(line, 0, yOffset);
    });
    
    ctx.restore();
}

function tirerIndexPondere() {
    const totalPoids = nomsAvecPoids.reduce((acc, cur) => acc + cur.poids, 0);
    let rand = Math.random() * totalPoids;
    for (let i = 0; i < nomsAvecPoids.length; i++) {
        rand -= nomsAvecPoids[i].poids;
        if (rand <= 0) return i;
    }
    return nomsAvecPoids.length - 1;
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    winnerDiv.textContent = '';
    spinBtn.disabled = true;
    spinBtn.textContent = 'TOURNE...';

    // Play spin sound
    spinSound.currentTime = 0;
    spinSound.play().catch(e => console.error('Erreur lecture son spin:', e));

    const winningIndex = tirerIndexPondere();
    const angleParSegment = (2 * Math.PI) / noms.length;

    // Flèche à gauche (angle 0) = rotation négative pour amener le segment à 0
    const targetRotation = -((winningIndex * angleParSegment) + angleParSegment / 2);

    const spins = 5 + Math.random() * 3;
    const finalRotation = spins * 2 * Math.PI + targetRotation;
    const duration = 5000 + Math.random() * 2000;
    const start = performance.now();

    console.log(`🎯 Cible: ${noms[winningIndex]} (index ${winningIndex}), rotation: ${targetRotation}`);

    function animate(time) {
        let elapsed = time - start;
        if (elapsed > duration) elapsed = duration;
        const t = elapsed / duration;
        const easedT = 1 - Math.pow(1 - t, 3);
        currentRotation = finalRotation * easedT;
        drawWheel();

        if (elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            currentRotation = finalRotation;
            drawWheel();
            spinBtn.disabled = false;
            spinBtn.textContent = 'LANCER LA ROUE';
            
            winnerDiv.textContent = `🎉 GAGNANT : ${noms[winningIndex]} 🎉`;
            winnerDiv.classList.add('winning');
            
            // Play winner sound
            winnerSound.currentTime = 0;
            winnerSound.play().catch(e => console.error('Erreur lecture son gagnant:', e));
            
            setTimeout(() => {
                winnerDiv.classList.remove('winning');
            }, 3000);
            
            console.log(`✅ ${noms[winningIndex]} s'arrête SOUS la flèche !`);
        }
    }

    requestAnimationFrame(animate);
}

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(e => console.error('Erreur plein écran:', e));
    } else {
        document.exitFullscreen().catch(e => console.error('Erreur sortie plein écran:', e));
    }
});

// Home button functionality
homeBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Initialisation
drawWheel();
spinBtn.addEventListener('click', spin);

// CSS dynamique pour animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    .winner-display.winning {
        animation: pulse 1s infinite;
    }
    .control-buttons {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
    .control-button {
        padding: 1rem 2rem;
        border: 2px solid #ffaa00;
        border-radius: 10px;
        background: linear-gradient(145deg, #2a1500, #3a2000);
        color: #ffaa00;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        text-transform: uppercase;
        transition: all 0.3s ease;
    }
    .control-button:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 170, 0, 0.8);
        border-color: #ff6600;
    }
    .control-button:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Support clavier (Espace pour lancer)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isSpinning) {
        e.preventDefault();
        spin();
    }
});

// Redimensionnement responsive
window.addEventListener('resize', () => drawWheel());

// Gestion de l'affichage de l'image wp.jpg toutes les 5 minutes
const popupImage = document.getElementById('popupImage');
const wheelContainer = document.querySelector('.wheel-container');

function showPopupImage() {
    // Masquer la roue
    wheelContainer.classList.add('hidden');
    
    // Afficher l'image
    popupImage.classList.add('show');

    // Réafficher la roue après 3 secondes
    setTimeout(() => {
        popupImage.classList.remove('show');
        wheelContainer.classList.remove('hidden');
    }, 3000); // 3 secondes
}

// Afficher l'image toutes les 5 minutes (300 000 ms)
setInterval(showPopupImage, 300000);

// Optionnel : Afficher l'image immédiatement au chargement pour tester
// showPopupImage();