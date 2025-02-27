'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface LadiesProps {
  isOpen: boolean
  onClose: () => void
}

export default function Ladies({ isOpen, onClose }: LadiesProps) {
  const [position, setPosition] = useState({ x: 200, y: 150 })
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
      const titleBar = e.target.closest('.ladies-title')
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
      className="ladies-window"
      style={{ 
        position: 'fixed',
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '1000px', // increased from 600px
        backgroundColor: 'var(--window-bg)',
        border: '1px solid black',
        zIndex: 50,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="ladies-title flex justify-between items-center p-1 border-b border-black bg-[var(--title-bg)]">
        <div className="text-[10px]">a message for the ladies.</div>
        <button className="close-button text-xs" onClick={onClose}>×</button>
      </div>

      <div className="ladies-content" style={{ 
        backgroundImage: 'url(/ladies/bg.gif)',
        backgroundRepeat: 'repeat',
        minHeight: '500px', // increased from 400px
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        maxHeight: '80vh'
      }}>
        <div className="text-center text-[10px]">
          coming soon...
        </div>
      </div>
    </div>
  )
}
