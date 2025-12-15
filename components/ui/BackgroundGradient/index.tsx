"use client";

import { useEffect, useRef, FC } from "react";
import * as THREE from "three";
import { useWebGL } from "./WebGLContext";

const BackgroundGradient: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { initRenderer } = useWebGL();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize Three.js scene
    const renderer = initRenderer();
    containerRef.current.appendChild(renderer.domElement);

    // Initialize scene if not already created
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }
    const scene = sceneRef.current;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

    // Create gradient material if not already created
    if (!materialRef.current) {
      materialRef.current = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 1.0 },
          uColor1: { value: new THREE.Color("#3ba7cd") }, // Light blue
          uColor2: { value: [0.082, 0.055, 0.341] }, // Using static color
          uColor3: { value: new THREE.Color("#000000") }, // Black for depth
          uTimeScale: { value: 0.19 },
          uScale: { value: 1.08 },
          uScale3: { value: 1.08 },
          uScaleVignette: { value: 0.523 },
          uVignetteBorderFade: { value: 0.216 },
          uAlpha: { value: 0.8 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
      `,
        fragmentShader: `
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          uniform float uTimeScale;
          uniform float uScale;
          uniform float uScale3;
          uniform float uScaleVignette;
          uniform float uVignetteBorderFade;
          uniform float uAlpha;
          
          varying vec2 vUv;
  
          // Simplex 2D noise
          vec3 permute(vec3 x) {
              return mod(((x*34.0)+1.0)*x, 289.0);
          }
  
          float snoise(vec2 v) {
              const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                              -0.577350269189626, 0.024390243902439);
              vec2 i  = floor(v + dot(v, C.yy));
              vec2 x0 = v -   i + dot(i, C.xx);
              vec2 i1;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;
              i = mod(i, 289.0);
              vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                  dot(x12.zw,x12.zw)), 0.0);
              m = m*m;
              m = m*m;
              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;
              m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
              vec3 g;
              g.x  = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
          }
  
          // For grain effect
          vec3 saturate(vec3 a) {
              return clamp(a, 0.0, 1.0);
          }
          
          float rand(vec2 co) {
              return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
          }
  
          void main() {
              float scaledTime = uTime * uTimeScale;
              
              // Main noise for gradient
              float noise = snoise(vec2(
                  vUv.x * uScale + sin(float(scaledTime)),
                  vUv.y * uScale + cos(float(scaledTime))
              ));
              
              // Mix colors based on noise
              vec3 outputColor = vec3(noise) * uColor1 + vec3(1.0 - noise) * uColor2;
              
              // Second noise layer
              float noise2 = snoise(vec2(
                  vUv.x * uScale3 + sin(float(scaledTime)),
                  vUv.y * uScale3 + cos(float(scaledTime))
              ));
              outputColor += uColor3 * noise2;
  
              // Vignette effect
              float circle = length(vUv - 0.5) * 0.9;
              float border = smoothstep(uScaleVignette - uVignetteBorderFade, uScaleVignette, 1.0 - circle);
              
              // Grain effect
              outputColor.rgb += (rand(vUv) - 0.5) * 0.07;
              outputColor.rgb = saturate(outputColor.rgb);
              
              // Final color with border and alpha
              gl_FragColor = vec4(outputColor * border, uAlpha);
          }
      `,
        transparent: true,
      });
    }

    // Create plane geometry if not already created
    if (!geometryRef.current) {
      geometryRef.current = new THREE.PlaneGeometry(2, 2);
    }

    const mesh = new THREE.Mesh(geometryRef.current, materialRef.current);
    scene.add(mesh);
    camera.position.z = 1;

    // Animation loop
    let animationFrameId: number;
    function animate(time: number) {
      animationFrameId = requestAnimationFrame(animate);
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time * 0.001;
      }
      renderer.render(scene, camera);
    }

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.remove(mesh);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [initRenderer]);

  return (
    <div
      ref={containerRef}
      className="webgl"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
};

export default BackgroundGradient;
