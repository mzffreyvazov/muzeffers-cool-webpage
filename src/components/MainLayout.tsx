'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && e.target instanceof Element) {
      if (e.target.closest('.window-title')) {
        setIsDragging(true);
        const rect = windowRef.current.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="min-h-screen p-8">
      <div
        ref={windowRef}
        className="main-window mx-auto"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="window-title">
          <button className="close-button" aria-label="Close">×</button>
        </div>
        <div className="content-area">
          <div className="navigation mb-6 border-b border-gray-600 pb-4">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:text-blue-600">Home</Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-blue-600">Blog</Link>
              </li>
              <li>
                <Link href="https://github.com/yourusername" className="hover:text-blue-600">GitHub</Link>
              </li>
              <li>
                <Link href="/cv.pdf" className="hover:text-blue-600">CV</Link>
              </li>
            </ul>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
