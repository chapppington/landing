"use client";

import React, { createContext, useContext, useRef, useEffect } from 'react';
import * as THREE from 'three';

type WebGLContextType = {
  renderer: THREE.WebGLRenderer | null;
  initRenderer: () => THREE.WebGLRenderer;
};

const WebGLContext = createContext<WebGLContextType | null>(null);

export const WebGLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const initRenderer = () => {
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
    return rendererRef.current;
  };

  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <WebGLContext.Provider value={{ renderer: rendererRef.current, initRenderer }}>
      {children}
    </WebGLContext.Provider>
  );
};

export const useWebGL = () => {
  const context = useContext(WebGLContext);
  if (!context) {
    throw new Error('useWebGL must be used within a WebGLProvider');
  }
  return context;
}; 