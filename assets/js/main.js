class Soundboard {
    constructor() {
        this.sounds = [];
        this.volume = 0.7; // Volume par défaut à 70%
        this.fullscreen = false;
        this.currentAudio = null;
        this.init();
    }

    init() {
        this.loadSounds();
        this.bindEvents();
        this.loadVolume();
        this.updateVolumeDisplay();
    }

    loadSounds() {
        // Soundboard prête pour 30 sons (ajoute tes fichiers audio dans assets/sound/)
        const defaultSounds = [
            'sound1.mp3', 'sound2.mp3', 'sound3.mp3', 'sound4.mp3', 'sound5.mp3',
            'sound6.mp3', 'sound7.mp3', 'sound8.mp3', 'sound9.mp3', 'sound10.mp3',
            'sound11.mp3', 'sound12.mp3', 'sound13.mp3', 'sound14.mp3', 'sound15.mp3',
            'sound16.mp3', 'sound17.mp3', 'sound18.mp3', 'sound19.mp3', 'sound20.mp3',
            'sound21.mp3', 'sound22.mp3', 'sound23.mp3', 'sound24.mp3', 'sound25.mp3',
            'sound26.mp3', 'sound27.mp3', 'sound28.mp3', 'sound29.mp3', 'sound30.mp3'
        ];

        defaultSounds.forEach((filename, index) => {
            const soundName = this.getSoundName(filename);
            this.sounds.push({
                id: index,
                filename: filename,
                name: soundName,
                customName: this.getStoredName(index) || soundName
            });
        });

        this.renderSoundboard();
    }

    getSoundName(filename) {
        return filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ').toUpperCase();
    }

    getStoredName(id) {
        try {
            const storedName = localStorage.getItem(`sound_${id}_name`);
            return storedName;
        } catch (e) {
            console.warn('localStorage non disponible');
            return null;
        }
    }

    renderSoundboard() {
        const container = document.getElementById('soundboard');
        container.innerHTML = '';

        this.sounds.forEach(sound => {
            const soundBtn = document.createElement('div');
            soundBtn.className = 'sound-btn';
            soundBtn.dataset.soundId = sound.id;
            soundBtn.innerHTML = `
                <div class="rename-icon" data-id="${sound.id}">✏️</div>
                <div class="sound-name">${sound.customName}</div>
            `;
            
            soundBtn.addEventListener('click', (e) => {
                if (!e.target.classList.contains('rename-icon')) {
                    this.playSound(sound, soundBtn);
                }
            });
            
            soundBtn.querySelector('.rename-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                this.openRenameModal(sound);
            });

            container.appendChild(soundBtn);
        });
    }

    async playSound(sound, btn) {
        try {
            // Arrêter le son précédent s'il existe
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
                // Retirer la classe playing de tous les boutons
                document.querySelectorAll('.sound-btn').forEach(b => b.classList.remove('playing'));
            }

            const audio = new Audio(`assets/sound/${sound.filename}`);
            audio.volume = this.volume;
            this.currentAudio = audio;
            
            btn.classList.add('playing');
            
            await audio.play();
            
            audio.addEventListener('ended', () => {
                btn.classList.remove('playing');
                this.currentAudio = null;
            });
            
            audio.addEventListener('error', () => {
                btn.classList.remove('playing');
                this.currentAudio = null;
                alert('Erreur de lecture du son');
            });
        } catch (error) {
            console.error('Erreur lecture:', error);
            btn.classList.remove('playing');
            this.currentAudio = null;
        }
    }

    openRenameModal(sound) {
        const modal = document.getElementById('renameModal');
        const input = document.getElementById('renameInput');
        
        input.value = sound.customName;
        modal.style.display = 'block';
        input.focus();
        input.select();

        // Fonction pour confirmer
        const confirmAction = () => {
            const newName = input.value.trim();
            if (newName) {
                sound.customName = newName;
                try {
                    localStorage.setItem(`sound_${sound.id}_name`, sound.customName);
                } catch (e) {
                    console.warn('localStorage non disponible');
                }
                this.renderSoundboard();
            }
            modal.style.display = 'none';
        };

        // Bouton confirmer
        const confirmBtn = document.getElementById('confirmRename');
        confirmBtn.onclick = confirmAction;

        // Touche Entrée
        input.onkeypress = (e) => {
            if (e.key === 'Enter') {
                confirmAction();
            }
        };

        // Bouton annuler
        document.getElementById('cancelRename').onclick = () => {
            modal.style.display = 'none';
        };

        // Clic en dehors de la modal
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };

        // Touche Échap
        document.onkeydown = (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        };
    }

    bindEvents() {
        // Boutons de volume
        document.getElementById('volumeUp').addEventListener('click', () => {
            this.changeVolume(0.1);
        });

        document.getElementById('volumeDown').addEventListener('click', () => {
            this.changeVolume(-0.1);
        });

        // Plein écran
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Chronomètre - ouvre timer.html dans une nouvelle fenêtre
        document.getElementById('timerBtn').addEventListener('click', () => {
            window.open('timer.html', '_blank', 'width=500,height=700');
        });

        // Écouter les changements de visibilité pour le plein écran
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
            this.updateFullscreenButton();
        });
    }

    changeVolume(delta) {
        this.volume = Math.max(0, Math.min(1, this.volume + delta));
        
        // Mettre à jour le volume du son en cours
        if (this.currentAudio) {
            this.currentAudio.volume = this.volume;
        }
        
        this.updateVolumeDisplay();
        this.saveVolume();
    }

    updateVolumeDisplay() {
        const display = document.getElementById('volumeDisplay');
        const percentage = Math.round(this.volume * 100);
        display.textContent = `${percentage}%`;
        
        // Effet visuel selon le volume
        if (percentage <= 20) {
            display.style.color = '#ff0000';
            display.style.borderColor = '#ff0000';
        } else if (percentage <= 50) {
            display.style.color = '#ff6600';
            display.style.borderColor = '#ff6600';
        } else {
            display.style.color = '#ffaa00';
            display.style.borderColor = '#ff6600';
        }
    }

    saveVolume() {
        try {
            localStorage.setItem('soundboardVolume', this.volume);
        } catch (e) {
            console.warn('localStorage non disponible');
        }
    }

    loadVolume() {
        try {
            const savedVolume = localStorage.getItem('soundboardVolume');
            if (savedVolume !== null) {
                this.volume = parseFloat(savedVolume);
            }
        } catch (e) {
            console.warn('localStorage non disponible');
        }
    }

    async toggleFullscreen() {
        if (!this.fullscreen) {
            try {
                await document.documentElement.requestFullscreen();
            } catch (error) {
                console.error('Erreur fullscreen:', error);
            }
        } else {
            try {
                await document.exitFullscreen();
            } catch (error) {
                console.error('Erreur sortie fullscreen:', error);
            }
        }
        this.updateFullscreenButton();
    }

    updateFullscreenButton() {
        const btn = document.getElementById('fullscreenBtn');
        btn.textContent = this.fullscreen ? '❌' : '⛶';
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new Soundboard();
});