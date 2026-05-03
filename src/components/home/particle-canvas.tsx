'use client';

import { useEffect, useRef } from 'react';

// iOS 13+ extends DeviceOrientationEvent with a static requestPermission method
interface DeviceOrientationEventStatic extends EventTarget {
  requestPermission?: () => Promise<PermissionState>;
}

const PARTICLE_COLORS = [
  'rgba(34, 221, 143,',  // accent-500
  'rgba(99, 207, 162,',  // primary-400
  'rgba(122, 184, 157,', // text-400
  'rgba(79, 243, 151,',  // accent-400
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  radius: number; alpha: number; color: string;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function createParticle(w: number, h: number): Particle {
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const speed = 0.15 + Math.random() * 0.35;
  const angle = Math.random() * Math.PI * 2;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  return {
    x: Math.random() * w, y: Math.random() * h,
    vx, vy, baseVx: vx, baseVy: vy,
    radius: 1.5 + Math.random() * 2,
    alpha: 0.3 + Math.random() * 0.5,
    color,
  };
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasOrNull = canvasRef.current;
    if (!canvasOrNull) return;
    // Re-alias as non-null so TypeScript carries the narrowing into nested functions.
    // (strict mode doesn't propagate null-narrowing into closure bodies)
    const canvas: HTMLCanvasElement = canvasOrNull;
    const ctxOrNull = canvas.getContext('2d');
    if (!ctxOrNull) return;
    const ctx: CanvasRenderingContext2D = ctxOrNull;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let animId = 0;

    // ── Mouse / Gyro state ────────────────────────────────────────────────
    // Store raw VIEWPORT coords — convert to canvas-space in the draw loop
    const mouse = { vx: -9999, vy: -9999 };
    const gyro  = { tx: -9999, ty: -9999, sx: -9999, sy: -9999, active: false };
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ── Resize ────────────────────────────────────────────────────────────
    function resize() {
      width  = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width  = width;
      canvas.height = height;
      const need = Math.min(180, Math.floor((width * height) / 7000));
      if (Math.abs(particles.length - need) > 10) {
        particles = Array.from({ length: need }, () => createParticle(width, height));
      }
    }

    // ── Draw connections ──────────────────────────────────────────────────
    function drawConnections() {
      const R = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < R) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34,221,143,${(1 - d / R) * 0.15})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Convert viewport → canvas coords fresh every frame (handles scroll & resize)
      const rect = canvas.getBoundingClientRect();

      let ix = -9999;
      let iy = -9999;
      if (isMobile && gyro.active) {
        gyro.sx = lerp(gyro.sx, gyro.tx, 0.07);
        gyro.sy = lerp(gyro.sy, gyro.ty, 0.07);
        ix = gyro.sx;
        iy = gyro.sy;
      } else if (mouse.vx !== -9999) {
        ix = mouse.vx - rect.left;
        iy = mouse.vy - rect.top;
      }

      const RADIUS   = 150;
      const STRENGTH = 6;

      for (const p of particles) {
        // Repulsion
        if (ix !== -9999) {
          const dx = p.x - ix;
          const dy = p.y - iy;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < RADIUS && d > 0) {
            const f = (1 - d / RADIUS) * STRENGTH;
            p.vx += (dx / d) * f * 0.06;
            p.vy += (dy / d) * f * 0.06;
          }
        }

        // Drift back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.025;
        p.vy += (p.baseVy - p.vy) * 0.025;

        // Move & wrap
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width  + 10;
        else if (p.x > width  + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Glow + core
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3.5);
        g.addColorStop(0, `${p.color}${p.alpha})`);
        g.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(1, p.alpha + 0.35)})`;
        ctx.fill();
      }

      drawConnections();
      animId = requestAnimationFrame(animate);
    }

    // ── Mouse handler (desktop) ───────────────────────────────────────────
    function onMouseMove(e: MouseEvent) {
      mouse.vx = e.clientX;
      mouse.vy = e.clientY;
    }
    function onMouseLeave() {
      mouse.vx = -9999;
      mouse.vy = -9999;
    }

    // ── Gyroscope handler (mobile) ────────────────────────────────────────
    function onOrientation(e: DeviceOrientationEvent) {
      const gamma = Math.max(-45, Math.min(45, e.gamma ?? 0));
      const beta  = Math.max(-30, Math.min(60, e.beta  ?? 0));
      gyro.tx = ((gamma + 45) / 90) * width;
      gyro.ty = ((beta  + 30) / 90) * height;
      if (!gyro.active) {
        gyro.sx = gyro.tx;
        gyro.sy = gyro.ty;
        gyro.active = true;
      }
    }

    function setupGyro() {
      const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventStatic;
      if (typeof DOE.requestPermission === 'function') {
        // iOS 13+: permission must be requested inside a user gesture
        const ask = () => {
          DOE.requestPermission!()
            .then((result) => {
              if (result === 'granted') {
                window.addEventListener('deviceorientation', onOrientation);
              }
            })
            .catch((_e) => { /* permission denied — particles float passively */ });
        };
        window.addEventListener('touchstart', ask, { once: true });
      } else {
        // Android & standard browsers — no permission needed
        window.addEventListener('deviceorientation', onOrientation);
      }
    }

    // ── Boot ──────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animate();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    if (isMobile) setupGyro(); // setupGyro is synchronous now — no floating promise

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('deviceorientation', onOrientation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
