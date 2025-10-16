class TimerApp {
    constructor() {
        this.chronoInterval = null;
        this.timerInterval = null;
        this.chronoTime = 0;
        this.timerTime = 0;
        this.lastTimerDuration = 0;
        this.isChronoRunning = false;
        this.isTimerRunning = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDisplays();
    }

    bindEvents() {
        document.getElementById('startChrono').addEventListener('click', () => this.toggleChrono());
        document.getElementById('stopChrono').addEventListener('click', () => this.stopChrono());
        document.getElementById('resetChrono').addEventListener('click', () => this.resetChrono());

        document.querySelectorAll('.timer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.minutes);
                this.setTimer(minutes * 60);
            });
        });

        document.getElementById('setCustomTimer').addEventListener('click', () => {
            const minutes = parseInt(document.getElementById('customMinutes').value);
            if (minutes > 0) {
                this.setTimer(minutes * 60);
            }
        });

        document.getElementById('startTimer').addEventListener('click', () => this.toggleTimer());
        document.getElementById('stopTimer').addEventListener('click', () => this.stopTimer());
        document.getElementById('resetTimer').addEventListener('click', () => this.resetTimer());
    }

    toggleChrono() {
        if (this.isChronoRunning) {
            this.stopChrono();
        } else {
            this.startChrono();
        }
    }

    startChrono() {
        this.isChronoRunning = true;
        this.chronoInterval = setInterval(() => {
            this.chronoTime++;
            this.updateDisplays();
        }, 1000);
        document.getElementById('startChrono').textContent = 'Pause';
        document.getElementById('startChrono').classList.add('running');
    }

    stopChrono() {
        this.isChronoRunning = false;
        clearInterval(this.chronoInterval);
        document.getElementById('startChrono').textContent = 'Démarrer';
        document.getElementById('startChrono').classList.remove('running');
    }

    resetChrono() {
        this.stopChrono();
        this.chronoTime = 0;
        this.updateDisplays();
    }

    setTimer(seconds) {
        this.timerTime = seconds;
        this.lastTimerDuration = seconds;
        this.updateDisplays();
        this.stopTimer();
    }

    toggleTimer() {
        if (this.isTimerRunning) {
            this.stopTimer();
        } else if (this.timerTime > 0) {
            this.startTimer();
        }
    }

    startTimer() {
        this.isTimerRunning = true;
        this.timerInterval = setInterval(() => {
            this.timerTime--;
            this.updateDisplays();
            
            if (this.timerTime <= 0) {
                this.stopTimer();
                this.playAlarm();
            }
        }, 1000);
        
        document.getElementById('startTimer').textContent = 'Pause';
        document.getElementById('startTimer').classList.add('running');
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerInterval);
        document.getElementById('startTimer').textContent = 'Démarrer';
        document.getElementById('startTimer').classList.remove('running');
    }

    resetTimer() {
        this.stopTimer();
        this.timerTime = 0;
        this.updateDisplays();
    }

    playAlarm() {
        let soundFile;

        switch (this.lastTimerDuration) {
            case 300:
                soundFile = 'assets/sound/fin5.mp3';
                break;
            case 600:
                soundFile = 'assets/sound/fin10.mp3';
                break;
            case 900:
                soundFile = 'assets/sound/fin15.mp3';
                break;
            case 1800:
                soundFile = 'assets/sound/fin30.mp3';
                break;
            case 3600:
                soundFile = 'assets/sound/fin60.mp3';
                break;
            default:
                soundFile = 'assets/sound/finCustom.mp3';
                break;
        }

        const audio = new Audio(soundFile);
        audio.play().catch(e => console.error('Erreur lecture audio :', e));
    }

    updateDisplays() {
        const chronoParts = new Date(this.chronoTime * 1000).toISOString().substr(11, 8);
        document.getElementById('chronoDisplay').textContent = chronoParts;

        const minutes = Math.floor(this.timerTime / 60);
        const seconds = this.timerTime % 60;
        const timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:00`;
        document.getElementById('timerDisplay').textContent = timerDisplay;

        const display = document.getElementById('timerDisplay');
        display.style.color = this.timerTime <= 10 && this.timerTime > 0 ? '#ff4444' : 'white';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TimerApp();
});
