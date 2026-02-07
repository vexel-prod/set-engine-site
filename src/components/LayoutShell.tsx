
'use client';

import React from 'react';
import { useAppContext } from './AppContext';

export default function LayoutShell({ children }: { children?: React.ReactNode }) {
  const { techMode } = useAppContext();
  
  return (
    <>
      <div className={`flex min-h-screen flex-col transition-all duration-300 ${techMode ? 'tech-grid cursor-crosshair' : ''}`}>
        {children}
      </div>
      
      {techMode && (
        <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
          <div className="tech-scanline-beam" />
        </div>
      )}
    </>
  );
}
