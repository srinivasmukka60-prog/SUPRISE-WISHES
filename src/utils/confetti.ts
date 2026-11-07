import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  // Burst from left and right
  const defaults = {
    spread: 360,
    ticks: 120,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#FF69B4', '#FF1493', '#C8A2FF', '#FFB6C1', '#FFD700', '#FFFFFF', '#BA55D3']
  };

  confetti({
    ...defaults,
    particleCount: 60,
    scalar: 1.2,
    shapes: ['circle']
  });

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.5,
    shapes: ['star']
  });
}

export function fireGrandBirthdayConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#FF69B4', '#DA70D6', '#BA55D3', '#9370DB', '#FFD700', '#FFF0F5', '#FF1493'];

  const interval: number = window.setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Left cannon
    confetti({
      particleCount,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors
    });

    // Right cannon
    confetti({
      particleCount,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors
    });
  }, 250);
}

export function fireCandleBlownConfetti(x: number, y: number) {
  // Convert screen coordinates to 0..1 range
  const normX = Math.max(0.1, Math.min(0.9, x / window.innerWidth));
  const normY = Math.max(0.1, Math.min(0.9, y / window.innerHeight));

  confetti({
    particleCount: 45,
    spread: 80,
    origin: { x: normX, y: normY },
    colors: ['#FFD700', '#FFF', '#FF69B4', '#C8A2FF'],
    startVelocity: 25,
    scalar: 1.1
  });
}
