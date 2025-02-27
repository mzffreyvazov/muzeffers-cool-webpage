'use client';
import { useState, useEffect, useRef } from 'react';

interface DraggableWindowProps {
  children: React.ReactNode;
  className?: string;
  initialPosition?: { x: number; y: number };
  onClose?: () => void;
  title?: string; // Optional title
  noDefaultTitle?: boolean; // Flag to skip rendering default title bar
}

export default function DraggableWindow({ 
  children, 
  className = '', 
  initialPosition,
  onClose,
  title,
  noDefaultTitle = false
}: DraggableWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center the window when component mounts if no initial position provided
    if (!initialPosition && typeof window !== 'undefined' && windowRef.current) {
      // Initial centering
      centerWindow();
      
      // Add a small delay to recalculate after content has likely rendered
      const timer = setTimeout(() => {
        centerWindow();
      }, 100);
      
      return () => clearTimeout(timer);
    } else if (initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);
  
  // Helper function to center the window
  const centerWindow = () => {
    if (windowRef.current) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const elementWidth = windowRef.current.offsetWidth;
      const elementHeight = windowRef.current.offsetHeight;

      setPosition({
        x: Math.max(0, (windowWidth - elementWidth) / 2),
        y: Math.max(0, (windowHeight - elementHeight) / 2)
      });
    }
  };

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
    <div 
      ref={windowRef}
      className={`draggable-window ${className}`}
      style={{ 
        position: 'absolute',
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {!noDefaultTitle && (
        <div className="window-title">
          {title && <span>{title}</span>}
          {onClose && (
            <button className="close-button" onClick={onClose} aria-label="Close">×</button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
