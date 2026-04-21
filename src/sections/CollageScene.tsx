import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CollageSceneProps {
  embedded?: boolean;
}

interface CollageItem {
  src: string;
  aspect: number;
  scale: number;
}

const COLLAGE_ITEMS: CollageItem[] = [
  { src: '/images/Clip.png', aspect: 1.05, scale: 190 },
  { src: '/images/megaphone.png', aspect: 0.85, scale: 190 },
  { src: '/images/star.png', aspect: 1, scale: 125 },
  { src: '/images/brain.png', aspect: 1.4, scale: 250 },
  { src: '/images/2026.png', aspect: 0.56, scale: 165 },
  { src: '/images/bun.png', aspect: 1, scale: 130 },
  { src: '/images/brooch.png', aspect: 1, scale: 130 },
  { src: '/images/click.png', aspect: 1, scale: 130 },
  { src: '/images/kiss.png', aspect: 1.20, scale: 130 },
  { src: '/images/hand.png', aspect: 1.5, scale: 200 },
  { src: '/images/lamp.png', aspect: 0.9, scale: 160 },
];

const SPHERE_RADIUS = 900;
const HOVER_STRENGTH = 0.1;

export default function CollageScene({ embedded = false }: CollageSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
    angularVelocity: THREE.Vector3;
    targetAngularVelocity: THREE.Vector3;
    hoverTarget: THREE.Vector3;
    targetPosition: THREE.Vector3;
    clock: THREE.Clock;
    raf: number;
    disposed: boolean;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getSize = () => {
      const rect = canvas.getBoundingClientRect();
      return {
        width: Math.max(1, rect.width || window.innerWidth),
        height: Math.max(1, rect.height || window.innerHeight),
      };
    };

    const { width, height } = getSize();
    let isMobile = width <= 768;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F2EDE8');

    const camera = new THREE.PerspectiveCamera(embedded ? 58 : (isMobile ? 61 : 66), width / height, 0.1, 5000);
    camera.position.set(0, 0, embedded ? 1120 : (isMobile ? 1650 : 1950));

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: embedded });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (embedded) {
      renderer.setClearAlpha(0);
    }

    const group = new THREE.Group();
    group.scale.setScalar(isMobile && !embedded ? 0.7 : 1);
    group.position.set(0, isMobile && !embedded ? 6 : 0, 0);
    scene.add(group);

    const loader = new THREE.TextureLoader();
    const itemsToLoad = embedded || isMobile
      ? [...COLLAGE_ITEMS, ...COLLAGE_ITEMS, ...COLLAGE_ITEMS.slice(0, 4)]
      : [...COLLAGE_ITEMS, ...COLLAGE_ITEMS.slice(0, 8)];

    itemsToLoad.forEach((item) => {
      loader.load(item.src, (texture) => {
        if (sceneRef.current?.disposed) return;

        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texture.needsUpdate = true;

        const sizeFactor = embedded ? 0.95 : (isMobile ? 1.12 : 1.02);
        const w = item.scale * sizeFactor;
        const h = (item.scale * sizeFactor) / item.aspect;

        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          depthWrite: false,
          side: THREE.DoubleSide,
          opacity: 0.94 + Math.random() * 0.06,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(w, h, 1);

        if (embedded || (isMobile && !embedded)) {
          mesh.position.set(
            (Math.random() - 0.5) * (embedded ? 920 : 980),
            (Math.random() - 0.5) * (embedded ? 420 : 520),
            (Math.random() - 0.5) * (embedded ? 520 : 420)
          );
          mesh.lookAt(0, 0, embedded ? 1200 : 980);
        } else {
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = 2 * Math.PI * Math.random();

          const r = isMobile ? SPHERE_RADIUS * 0.62 : SPHERE_RADIUS;
          mesh.position.set(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          );

          mesh.lookAt(0, 0, 0);
        }

        mesh.rotation.z += (Math.random() - 0.5) * 0.5;

        group.add(mesh);
      });
    });

    const targetAngularVelocity = embedded
      ? new THREE.Vector3(0.001, 0.014, 0.005)
      : new THREE.Vector3(0, isMobile ? 0.007 : 0.005, isMobile ? 0.0038 : 0.002);
    const angularVelocity = targetAngularVelocity.clone();
    const hoverTarget = new THREE.Vector3(0, 0, 0);
    const targetPosition = new THREE.Vector3(0, 0, 0);
    const clock = new THREE.Clock();

    sceneRef.current = {
      renderer,
      scene,
      camera,
      group,
      angularVelocity,
      targetAngularVelocity,
      hoverTarget,
      targetPosition,
      clock,
      raf: 0,
      disposed: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const clampedX = Math.min(1, Math.max(0, x));
      const clampedY = Math.min(1, Math.max(0, y));

      sceneRef.current.hoverTarget.set(
        (clampedX - 0.5) * 2,
        (-(clampedY) + 0.5) * 2,
        0
      );
    };

    const handleClick = () => {
      if (!sceneRef.current) return;
      const rand = Math.random();
      sceneRef.current.targetAngularVelocity.set(
        (rand - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      );
    };

    const handleResize = () => {
      if (!sceneRef.current) return;
      const { width: w, height: h } = getSize();

      const resizedIsMobile = w <= 768;
      isMobile = resizedIsMobile;

      sceneRef.current.camera.fov = embedded ? 58 : (resizedIsMobile ? 61 : 66);
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.position.set(0, 0, embedded ? 1120 : (resizedIsMobile ? 1650 : 1950));
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);

      if (!embedded) {
        sceneRef.current.group.scale.setScalar(resizedIsMobile ? 0.7 : 1);
        sceneRef.current.group.position.set(0, resizedIsMobile ? 6 : 0, 0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!sceneRef.current || sceneRef.current.disposed) return;

      const sr = sceneRef.current;

      sr.angularVelocity.lerp(sr.targetAngularVelocity, 0.05);
      sr.group.rotation.x += sr.angularVelocity.x;
      sr.group.rotation.y += sr.angularVelocity.y;
      sr.group.rotation.z += sr.angularVelocity.z;

      const parallaxFactor = embedded ? 0.36 : 1;
      sr.targetPosition
        .copy(sr.hoverTarget)
        .multiplyScalar(HOVER_STRENGTH * SPHERE_RADIUS * parallaxFactor);

      sr.group.position.lerp(sr.targetPosition, 0.1);

      sr.renderer.render(sr.scene, sr.camera);
      sr.raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        sceneRef.current.disposed = true;
        cancelAnimationFrame(sceneRef.current.raf);
        sceneRef.current.renderer.dispose();
        sceneRef.current.group.clear();
        scene.clear();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: embedded ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        borderRadius: embedded ? '16px' : 0,
      }}
    />
  );
}