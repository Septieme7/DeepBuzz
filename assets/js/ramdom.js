const nomsAvecPoids = [
    { nom: "Dorian Abbadessa", poids: 5 },
    { nom: "Habib Akerim", poids: 5 },
    { nom: "Ben-Astier", poids: 5 },
    { nom: "Alex Bachir", poids: 5 },
    { nom: "Salah Belhassan", poids: 5 },
    { nom: "Yannick Bossola", poids: 5 },
    { nom: "Eric Bouchut", poids: 5 },
    { nom: "Ines Charfi", poids: 5 },
    { nom: "Eva Daumas", poids: 5 },
    { nom: "Philippe Durand", poids: 5 },
    { nom: "Enzo Gavani", poids: 5 },
    { nom: "Laurene Gigan", poids: 5 },
    { nom: "Ximenia Hagard", poids: 5 },
    { nom: "Alexandre Imbernon", poids: 5 },
    { nom: "Alexandre Meric", poids: 5 },
    { nom: "Justin Mogrovejo", poids: 5 },
    { nom: "Bilal Nouar", poids: 5 },
    { nom: "Thomas Robert", poids: 5 },
    { nom: "Anthonin Tacchi", poids: 5 },
    { nom: "Théo Viti", poids: 5 },
    { nom: "💰 LE MILLION 💰", poids: 1 }
];

const noms = nomsAvecPoids.map(n => n.nom);
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const winnerDiv = document.getElementById('winner');

const colors = ['#ff0000', '#ff3300', '#ff6600', '#ff9900', '#ffaa00', '#cc0000', '#990000'];
let currentRotation = 0;
let isSpinning = false;

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

        // Texte horizontal dans la section
        const textAngle = startAngle + anglePerSection / 2;
        const textRadius = radius * 0.6; // position dans la case
        const textX = Math.cos(textAngle) * textRadius;
        const textY = Math.sin(textAngle) * textRadius;

        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(textAngle + Math.PI / 2); // ajuste l’orientation pour rester horizontal
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Courier New';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nom, 0, 0);
        ctx.restore();
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

    const winningIndex = tirerIndexPondere();
    const angleParSegment = (2 * Math.PI) / noms.length;

    // ⚠️ flèche inversée = ajustement : segment gagnant doit être en bas (π/2)
    const targetRotation = (Math.PI / 2) - (winningIndex * angleParSegment) - angleParSegment / 2;

    const spins = 5;
    const finalRotation = spins * 2 * Math.PI + targetRotation;
    const duration = 6000;
    const start = performance.now();

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
            winnerDiv.textContent = `🎉 GAGNANT : ${noms[winningIndex]} 🎉`;
        }
    }

    requestAnimationFrame(animate);
}

drawWheel();
spinBtn.addEventListener('click', spin);
