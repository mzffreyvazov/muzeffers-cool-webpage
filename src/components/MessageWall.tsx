'use client'
import { useRef, useState, useEffect } from 'react'

interface MessageWallProps {
  isOpen: boolean
  onClose: () => void
}

export default function MessageWall({ isOpen, onClose }: MessageWallProps) {
  const [position, setPosition] = useState({ x: 300, y: 150 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current && e.target instanceof Element) {
      const titleBar = e.target.closest('.wall-title')
      if (titleBar && !e.target.closest('.close-button')) {
        setIsDragging(true)
        const rect = windowRef.current.getBoundingClientRect()
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      ref={windowRef}
      className="wall-window"
      style={{ 
        position: 'fixed',
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '600px',
        backgroundColor: 'var(--window-bg)',
        border: '1px solid black',
        zIndex: 50,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="wall-title flex justify-between items-center p-1 border-b border-black bg-[var(--title-bg)]">
        <div className="text-[10px]">mesajinizi divardan asin</div>
        <button className="close-button text-xs" onClick={onClose}>×</button>
      </div>

      <div className="wall-content" style={{ 
        minHeight: '400px',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="text-center text-[10px]">
          coming soon...
        </div>
      </div>
    </div>
  )
}
