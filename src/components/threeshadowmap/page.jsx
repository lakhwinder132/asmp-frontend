import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const BAT_MODEL_URL = "/models/gltf/bat_icon.glb";

const RISE_SPEED = 220;
const BAT_COUNT = 2;

// Bats reappear on a fresh "wave" this often (ms).
const RESPAWN_INTERVAL_MS = 7000;

// How many radians the bat rotates per pixel dragged.
const DRAG_ROTATE_SENSITIVITY = 0.01;

// How quickly the visible rotation catches up to the drag target each frame (0-1).
const ROTATION_SMOOTHING = 0.15;

// How much residual spin carries on after you release (0-1, closer to 1 = spins longer).
const INERTIA_DAMPING = 0.92;

// Below this angular speed (radians/frame), inertia is considered stopped.
const INERTIA_STOP_THRESHOLD = 0.0005;

/**
 * Responsive bat size: scales with the smaller viewport dimension so it
 * looks right on phones, tablets, and desktop monitors alike.
 */
function getResponsiveBatSize(width, height) {
  const base = Math.min(width, height);
  if (base < 480) return 90; // small phones
  if (base < 768) return 140; // large phones / small tablets
  if (base < 1200) return 190; // tablets / small laptops
  return 240; // desktop
}

/**
 * Transparent 3D layer with bat_icon.glb instances rising bottom-to-top.
 * Drag / swipe left-right (touch or mouse) to rotate the bat around the Y axis.
 * Bats rise once, then hide, and a new wave spawns every RESPAWN_INTERVAL_MS.
 * Meant to be placed as a fixed full-screen overlay ABOVE your existing
 * page background (pass no backgroundImage prop — it stays transparent).
 */
export default function ThreeShadowMap({
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
  // Set to false when this is placed as a purely decorative overlay (e.g.
  // inside a parent with pointerEvents:"none") — this stops the canvas from
  // force-enabling its own pointer events, which would otherwise override
  // the parent and swallow scroll/click for the whole page underneath it.
  interactive = true,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animationId;
    let respawnTimer;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // These are recalculated on resize so bats always travel the full
    // height of the current viewport, and are sized responsively.
    let batSize = getResponsiveBatSize(width, height);
    let topY = height / 2 + batSize;
    let bottomY = -height / 2 - batSize;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
    camera.position.set(0, 0, 1200);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 500, 500);
    scene.add(dirLight);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Intentionally do NOT touch pointer-events or touch-action on the
    // canvas. It stays whatever the parent CSS says (e.g. "none" in Homee.jsx)
    // so scroll and clicks always pass through structurally. Instead, drag-
    // to-rotate is implemented below via window-level listeners plus a
    // manual screen-space hit test against the bat — that way we only react
    // when the pointer is actually on the bat, without ever becoming a
    // full-screen click/scroll blocker.

    let template = null;
    const bats = [];
    const loader = new GLTFLoader();

    function rescaleBat(bat) {
      const box = new THREE.Box3().setFromObject(template);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = batSize / maxDim;
      bat.scale.set(scale, scale, scale);
    }

    function hideBat(bat) {
      bat.visible = false;
      bat.userData.falling = false;
    }

    function spawnWave() {
      if (!template) return;
      for (const bat of bats) {
        rescaleBat(bat); // keep size in sync with the current viewport
        bat.position.set(
          (Math.random() - 0.5) * width * 0.8,
          bottomY - Math.random() * 200,
          (Math.random() - 0.5) * 400
        );
        bat.userData.speed = RISE_SPEED * (0.7 + Math.random() * 0.6);
        bat.visible = true;
        bat.userData.falling = true;
      }
    }

    loader.load(
      BAT_MODEL_URL,
      (gltf) => {
        if (disposed) return;
        template = gltf.scene;

        for (let i = 0; i < BAT_COUNT; i++) {
          const bat = template.clone();
          hideBat(bat);
          scene.add(bat);
          bats.push(bat);
        }

        // First wave immediately, then every RESPAWN_INTERVAL_MS after that.
        spawnWave();
        respawnTimer = setInterval(spawnWave, RESPAWN_INTERVAL_MS);
      },
      undefined,
      (err) => console.warn("Failed to load bat_icon.glb:", err)
    );

    // ── DRAG / SWIPE TO ROTATE (touch + mouse, via Pointer Events) ──
    let isDragging = false;
    let lastPointerX = 0;
    let targetRotationY = Math.PI / 2;
    let currentRotationY = Math.PI / 2;
    let angularVelocity = 0;

    function handlePointerDown(e) {
      isDragging = true;
      angularVelocity = 0;
      lastPointerX = e.clientX;
      renderer.domElement.setPointerCapture?.(e.pointerId);
    }

    function handlePointerMove(e) {
      if (!isDragging) return;
      const deltaX = e.clientX - lastPointerX;
      lastPointerX = e.clientX;

      const rotationDelta = deltaX * DRAG_ROTATE_SENSITIVITY;
      targetRotationY += rotationDelta;
      angularVelocity = rotationDelta;
    }

    function handlePointerUp(e) {
      isDragging = false;
      renderer.domElement.releasePointerCapture?.(e.pointerId);
    }

    if (interactive) {
      renderer.domElement.addEventListener("pointerdown", handlePointerDown);
      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerup", handlePointerUp);
      renderer.domElement.addEventListener("pointercancel", handlePointerUp);
      renderer.domElement.addEventListener("pointerleave", handlePointerUp);
    }

    function handleResize() {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      batSize = getResponsiveBatSize(width, height);
      topY = height / 2 + batSize;
      bottomY = -height / 2 - batSize;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Re-scale any bat currently mid-fall so it doesn't jump size.
      for (const bat of bats) {
        if (template) rescaleBat(bat);
      }
    }
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    function animate() {
      if (disposed) return;
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isDragging && Math.abs(angularVelocity) > INERTIA_STOP_THRESHOLD) {
        targetRotationY += angularVelocity;
        angularVelocity *= INERTIA_DAMPING;
      }

      currentRotationY += (targetRotationY - currentRotationY) * ROTATION_SMOOTHING;

      for (const bat of bats) {
        if (!bat.userData.falling) continue;

        bat.rotation.y = currentRotationY;
        bat.position.y += bat.userData.speed * delta;

        // Reached the top of the current viewport: hide and wait for
        // the next scheduled wave instead of looping forever.
        if (bat.position.y > topY) {
          hideBat(bat);
        }
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      clearInterval(respawnTimer);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("pointercancel", handlePointerUp);
      renderer.domElement.removeEventListener("pointerleave", handlePointerUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize,
        backgroundPosition,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}