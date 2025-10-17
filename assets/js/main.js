class Soundboard {
    constructor() {
        this.sounds = [];
        this.volume = 0.7;
        this.fullscreen = false;
        this.currentAudio = null;
        this.currentPlayingBtn = null;
        this.isDarkMode = false;
        this.init();
    }

    init() {
        this.loadSounds();
        this.bindEvents();
        this.loadVolume();
        this.updateVolumeDisplay();
        this.applyTheme();
        console.log('✅ Soundboard initialisé');
    }

    loadSounds() {
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
        console.log(`🎵 ${this.sounds.length} sons chargés`);
    }

    getSoundName(filename) {
        return filename.replace(/\.[^/.]+$/, "").replace(/[_-]/g, ' ').toUpperCase();
    }

    getStoredName(id) {
        try {
            return localStorage.getItem(`sound_${id}_name`);
        } catch (e) {
            console.warn('localStorage non disponible');
            return null;
        }
    }

    renderSoundboard() {
        const container = document.getElementById('soundboard');
        container.innerHTML = '';

        this.sounds.forEach(sound => {
            const soundContainer = document.createElement('div');
            soundContainer.className = 'sound-container';
            
            const soundBtn = document.createElement('div');
            soundBtn.className = 'sound-btn';
            soundBtn.dataset.soundId = sound.id;
            soundBtn.innerHTML = `
                <div class="rename-icon" data-id="${sound.id}">✏️</div>
                <div class="sound-name">${sound.customName}</div>
            `;
            
            const stopBtn = document.createElement('button');
            stopBtn.className = 'stop-btn';
            stopBtn.dataset.soundId = sound.id;
            stopBtn.innerHTML = '⏹️';
            stopBtn.title = `Arrêter ${sound.customName}`;
            
            soundBtn.addEventListener('click', (e) => {
                if (!e.target.classList.contains('rename-icon')) {
                    console.log('🎵 Clic sur:', sound.customName);
                    this.playSound(sound, soundBtn, stopBtn);
                }
            });
            
            soundBtn.querySelector('.rename-icon').addEventListener('click', (e) => {
                e.stopPropagation();
                this.openRenameModal(sound);
            });
            
            stopBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('⏹️ STOP individuel:', sound.customName);
                this.stopSound(sound, soundBtn, stopBtn);
            });

            soundContainer.appendChild(soundBtn);
            soundContainer.appendChild(stopBtn);
            container.appendChild(soundContainer);
        });
    }

    async playSound(sound, btn, stopBtn) {
        try {
            console.log('⏹️ Arrêt sons précédents');
            this.stopAllSounds();

            console.log('🔊 Création audio:', sound.filename);
            const audio = new Audio(`assets/sound/${sound.filename}`);
            audio.volume = this.volume;
            this.currentAudio = audio;
            this.currentPlayingBtn = btn;
            
            console.log('🎬 Ajout classe playing');
            btn.classList.add('playing');
            
            console.log('▶️ Lecture...');
            await audio.play();
            console.log(`✅ Lecture OK: ${sound.customName}`);
            
            audio.addEventListener('ended', () => {
                console.log('🏁 Son terminé');
                this.cleanupAudio(btn);
            });
            
            audio.addEventListener('error', (e) => {
                console.error('❌ Erreur audio:', e);
                this.cleanupAudio(btn);
                alert('Erreur de lecture du son - Vérifiez que le fichier existe dans assets/sound/');
            });

        } catch (error) {
            console.error('❌ Erreur play:', error);
            this.cleanupAudio(btn);
            alert('Erreur lors de la lecture');
        }
    }

    stopSound(sound, btn, stopBtn) {
        console.log('⏹️ STOP individuel demandé');
        this.stopAllSounds();
    }

    stopAllSounds() {
        console.log('⏹️ STOP global');
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
            console.log('🔇 Audio arrêté');
        }
        
        if (this.currentPlayingBtn) {
            this.currentPlayingBtn.classList.remove('playing');
            this.currentPlayingBtn = null;
        }
        
        document.querySelectorAll('.sound-btn').forEach(b => {
            b.classList.remove('playing');
        });
        
        console.log('✅ Nettoyage terminé');
    }

    cleanupAudio(btn) {
        this.currentAudio = null;
        btn.classList.remove('playing');
        this.currentPlayingBtn = null;
        console.log('🧹 Cleanup OK');
    }

    openRenameModal(sound) {
        const modal = document.getElementById('renameModal');
        const input = document.getElementById('renameInput');
        
        input.value = sound.customName;
        modal.style.display = 'block';
        input.focus();
        input.select();

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
                console.log('✏️ Nom changé:', newName);
            }
            modal.style.display = 'none';
        };

        document.getElementById('confirmRename').onclick = confirmAction;
        input.onkeypress = (e) => { if (e.key === 'Enter') confirmAction(); };
        document.getElementById('cancelRename').onclick = () => { modal.style.display = 'none'; };
        
        modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
        
        const escapeHandler = (e) => { 
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    bindEvents() {
        document.getElementById('volumeUp').addEventListener('click', () => {
            this.changeVolume(0.1);
            console.log('🔊 Volume +10%');
        });
        document.getElementById('volumeDown').addEventListener('click', () => {
            this.changeVolume(-0.1);
            console.log('🔉 Volume -10%');
        });

        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        
        document.getElementById('timerBtn').addEventListener('click', () => {
            window.open('timer.html', '_blank');
        });

        document.getElementById('randomBtn').addEventListener('click', () => {
            window.open('ramdom.html', '_blank');
        });

        document.addEventListener('fullscreenchange', () => {
            this.fullscreen = !!document.fullscreenElement;
            this.updateFullscreenButton();
        });

        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        console.log('🔗 Événements liés');
    }

    changeVolume(delta) {
        this.volume = Math.max(0, Math.min(1, this.volume + delta));
        if (this.currentAudio) this.currentAudio.volume = this.volume;
        this.updateVolumeDisplay();
        this.saveVolume();
    }

    updateVolumeDisplay() {
        const display = document.getElementById('volumeDisplay');
        const percentage = Math.round(this.volume * 100);
        display.textContent = `${percentage}%`;
        display.dataset.volume = percentage;
        
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
        try { localStorage.setItem('soundboardVolume', this.volume); } catch (e) {}
    }

    loadVolume() {
        try {
            const saved = localStorage.getItem('soundboardVolume');
            if (saved !== null) {
                this.volume = parseFloat(saved);
                this.updateVolumeDisplay();
            }
        } catch (e) {}
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.textContent = this.isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('darkMode', this.isDarkMode);
    }

    applyTheme() {
        const saved = localStorage.getItem('darkMode');
        if (saved === 'true') {
            this.isDarkMode = true;
            document.documentElement.setAttribute('data-theme', 'dark');
            const themeBtn = document.getElementById('themeToggle');
            if (themeBtn) themeBtn.textContent = '☀️';
        }
    }

    async toggleFullscreen() {
        if (!this.fullscreen) {
            try { await document.documentElement.requestFullscreen(); } catch (e) {}
        } else {
            try { await document.exitFullscreen(); } catch (e) {}
        }
        this.updateFullscreenButton();
    }

    updateFullscreenButton() {
        const btn = document.getElementById('fullscreenBtn');
        if (btn) btn.textContent = this.fullscreen ? '❌' : '⛶';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM chargé');
    new Soundboard();
});