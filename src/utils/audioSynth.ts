/**
 * Pure Web Audio API Synthesizer for Romantic Music Box & Birthday SFX
 * Zero external copyright dependencies, 100% reliable in any browser environment
 */

class MusicBoxEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private loopTimeout: number | null = null;
  private gainNode: GainNode | null = null;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic music box note (gentle sine wave + bell harmonic)
  private playNote(freq: number, startTime: number, duration: number = 1.2, noteVolume: number = 0.3) {
    if (!this.ctx || !this.gainNode) return;

    // Fundamental sine
    const osc1 = this.ctx.createOscillator();
    const osc1Gain = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    // Harmonic overtone for music box / celesta chime timbre
    const osc2 = this.ctx.createOscillator();
    const osc2Gain = this.ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime);

    // Envelope
    osc1Gain.gain.setValueAtTime(0, startTime);
    osc1Gain.gain.linearRampToValueAtTime(noteVolume * 0.7, startTime + 0.02);
    osc1Gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc2Gain.gain.setValueAtTime(0, startTime);
    osc2Gain.gain.linearRampToValueAtTime(noteVolume * 0.25, startTime + 0.02);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, startTime + (duration * 0.6));

    osc1.connect(osc1Gain);
    osc2.connect(osc2Gain);

    osc1Gain.connect(this.gainNode);
    osc2Gain.connect(this.gainNode);

    osc1.start(startTime);
    osc2.start(startTime);

    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  // Romantic, gentle, slow music-box Happy Birthday melody + dreamy harp arpeggio
  public start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleMelodyLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.loopTimeout) {
      window.clearTimeout(this.loopTimeout);
      this.loopTimeout = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleMelodyLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const t0 = this.ctx.currentTime + 0.1;
    const tempo = 0.55; // Gentle pace

    // Frequencies (Hz)
    const notes: Record<string, number> = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
      Bb4: 466.16
    };

    // [Note, durationMultiplier, restMultiplier]
    const melody: [string, number, number][] = [
      // Phrase 1: Happy birthday to you
      ['G4', 0.8, 0.9], ['G4', 0.8, 0.9], ['A4', 1.6, 1.8], ['G4', 1.6, 1.8], ['C5', 1.6, 1.8], ['B4', 2.8, 3.2],
      // Phrase 2: Happy birthday to you
      ['G4', 0.8, 0.9], ['G4', 0.8, 0.9], ['A4', 1.6, 1.8], ['G4', 1.6, 1.8], ['D5', 1.6, 1.8], ['C5', 2.8, 3.2],
      // Phrase 3: Happy birthday dear Shruthi
      ['G4', 0.8, 0.9], ['G4', 0.8, 0.9], ['G5', 1.6, 1.8], ['E5', 1.6, 1.8], ['C5', 1.6, 1.8], ['B4', 1.6, 1.8], ['A4', 2.4, 2.8],
      // Phrase 4: Happy birthday to you
      ['F5', 0.8, 0.9], ['F5', 0.8, 0.9], ['E5', 1.6, 1.8], ['C5', 1.6, 1.8], ['D5', 1.6, 1.8], ['C5', 3.4, 4.0],

      // Interlude: Soft dreamy harp arpeggios
      ['E4', 1.2, 1.0], ['G4', 1.2, 1.0], ['C5', 1.2, 1.0], ['E5', 1.8, 1.6],
      ['F4', 1.2, 1.0], ['A4', 1.2, 1.0], ['C5', 1.2, 1.0], ['F5', 1.8, 1.6],
      ['G4', 1.2, 1.0], ['B4', 1.2, 1.0], ['D5', 1.2, 1.0], ['G5', 2.4, 2.6]
    ];

    let currentOffset = 0;
    melody.forEach(([note, dur, rest]) => {
      const freq = notes[note];
      if (freq) {
        this.playNote(freq, t0 + currentOffset * tempo, dur * tempo * 1.5, 0.35);
      }
      currentOffset += rest;
    });

    const totalSeconds = (currentOffset * tempo) + 1.5;
    this.loopTimeout = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleMelodyLoop();
      }
    }, totalSeconds * 1000);
  }

  // Sound Effect: Sparkles
  public playSparkle() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const freqs = [880, 1174, 1318, 1760, 2093, 2637];
    freqs.forEach((f, i) => {
      this.playNote(f, now + i * 0.05, 0.6, 0.2);
    });
  }

  // Sound Effect: Candle blow-out (whoosh + gentle pop)
  public playBlowSound() {
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    noise.stop(this.ctx.currentTime + 0.55);
  }

  // Sound Effect: Cheerful Button Pop
  public playPop() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Sound Effect: Sad / funny Boing on NO button
  public playBoing() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.22);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Sound Effect: Triumphant Chime / Fanfare
  public playFanfare() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playNote(freq, now + idx * 0.12, 1.4, 0.4);
    });
  }
}

export const musicBox = new MusicBoxEngine();
