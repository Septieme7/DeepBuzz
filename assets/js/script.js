class Soundboard {
    constructor() {
        this.sounds = [];
        this.isDarkMode = false;
        this.fullscreen = false;
        this.init();
    }

    init() {
        this.loadSounds();
        this.bindEvents();
        this.applyTheme();
    }

    loadSounds() {
        // Sons par défaut (tu peux ajouter tes 10 fichiers audio dans assets/sound/)
        const defaultSounds = [
            'sound1.mp3', 'sound2.mp3', 'sound3.mp3', 'sound4.mp3', 'sound5.mp3',
            'sound6.mp3', 'sound7.mp3', 'sound8.mp3', 'sound9.mp3', 'sound10.mp3'
        ];

        defaultSounds.forEach((filename, index) => {
            const soundName = this.getSoundName(filename);
            this.sounds.push({
                id: index,
                filename: filename,
                name: soundName,
                customName: localStorage.getItem(`sound_${index}_name`) || soundName
            });
        });

        this.renderSoundboard();
    }

    getSoundName(filename) {
        return filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ').toUpperCase();
    }

    renderSoundboard() {
        const container = document.getElementById('soundboard');
        container.innerHTML = '';

        this.sounds.forEach(sound => {
            const soundBtn = document.createElement('div');
            soundBtn.className = 'sound-btn';
            soundBtn.innerHTML = `
                <div class="rename-icon" data-id="${sound.id}">✏️</div>
                <div class="sound-name">${sound.customName}</div>
            `;
            
            soundBtn.addEventListener('click', () => this.playSound(sound));
            soundBtn.querySelector('.rename-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                this.openRenameModal(sound);
            });

            container.appendChild(soundBtn);
        });
    }

    async playSound(sound) {
        try {
            const audio = new Audio(`assets/sound/${sound.filename}`);
            audio.volume = 0.77;
            
            const btn = event.currentTarget;
            btn.classList.add('playing');
            
            await audio.play();
            
            audio.addEventListener('ended', () => {
                btn.classList.remove('playing');
            });
            
            audio.addEventListener('error', () => {
                btn.classList.remove('playing');
                alert('Erreur de lecture du son');
            });
        } catch (error) {
            console.error('Erreur lecture:', error);
            event.currentTarget.classList.remove('playing');
        }
    }

    openRenameModal(sound) {
        const modal = document.getElementById('renameModal');
        const input = document.getElementById('renameInput');
        
        input.value = sound.customName;
        modal.style.display = 'block';
        input.focus();

        document.getElementById('confirmRename').onclick = () => {
            sound.customName = input.value || sound.name;
            localStorage.setItem(`sound_${sound.id}_name`, sound.customName);
            this.renderSoundboard();
            modal.style.display = 'none';
        };

        document.getElementById('cancelRename').onclick = () => {
            modal.style.display = 'none';
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.style.display = 'none';
        };
    }

    bindEvents() {
        // Toggle thème
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Plein écran
        document.getElementById('fullscreenBtn').addEventListener('click', () => {
            this.toggleFullscreen();
        });

        // Chronomètre
        document.getElementById('timerBtn').addEventListener('click', () => {
            window.open('timer.html', '_blank', 'width=400,height=600');
        });

        // Écouter les changements de visibilité pour le plein écran
        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
            this.updateFullscreenButton();
        });
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        document.getElementById('themeToggle').textContent = this.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', this.isDarkMode);
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            this.isDarkMode = true;
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
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