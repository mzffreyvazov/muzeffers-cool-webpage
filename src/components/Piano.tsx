'use client'
import { useRef, useState, useEffect } from 'react'

interface PianoProps {
  isOpen: boolean
  onClose: () => void
}

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

export default function Piano({ isOpen, onClose }: PianoProps) {
  const [position, setPosition] = useState({ x: 400, y: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const pianoRef = useRef<HTMLDivElement>(null)

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
    if (pianoRef.current && e.target instanceof Element) {
      const titleBar = e.target.closest('.piano-title')
      if (titleBar && !e.target.closest('.close-button')) {
        setIsDragging(true)
        const rect = pianoRef.current.getBoundingClientRect()
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }
  }

  const playNote = (note: string) => {
    const audio = new Audio(`/piano/${note}.mp3`)
    audio.play()
  }

  if (!isOpen) return null

  return (
    <div
      ref={pianoRef}
      className="piano-window"
      style={{ 
        position: 'fixed',
        left: `${position.x}px`, 
        top: `${position.y}px`,
        width: '300px',
        backgroundColor: 'var(--window-bg)',
        border: '1px solid black',
        zIndex: 50,
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="piano-title flex justify-between items-center p-1 border-b border-black bg-[var(--title-bg)]">
        <div className="text-[10px]">oyble piano</div>
        <button className="close-button text-xs" onClick={onClose}>×</button>
      </div>

      <div className="piano-keys flex p-2">
        {NOTES.map((note) => (
          <button
            key={note}
            className={`piano-key ${note.includes('#') ? 'black-key' : 'white-key'}`}
            onClick={() => playNote(note)}
          >
            {note}
          </button>
        ))}
      </div>
    </div>
  )
}
