'use client'
import { useEffect, useRef, useState } from 'react'

interface AudioVisualizerProps {
  isPlaying: boolean;
}

export function AudioVisualizer({ isPlaying }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const barCount = 32 // Increased from 16 to 32 bars
    const bars: number[] = Array(barCount).fill(0)
    const targetHeights: number[] = Array(barCount).fill(0)
    const speeds: number[] = Array(barCount).fill(0)

    const generateTarget = (index: number, time: number) => {
      const baseFreq = 1.5 // Increased from 0.8
      const positionFactor = index / barCount
      const wave1 = Math.sin(time * baseFreq + positionFactor * Math.PI * 6) * 0.5 + 0.5 // Increased multiplier
      const wave2 = Math.sin(time * baseFreq * 3 + positionFactor * Math.PI * 8) * 0.5 + 0.5 // Increased frequencies
      const wave3 = Math.sin(time * baseFreq * 2 + positionFactor * Math.PI * 4) * 0.5 + 0.5
      
      return (wave1 * 0.4 + wave2 * 0.4 + wave3 * 0.2) * canvas.height * 0.9
    }

    const draw = (timestamp: number) => {
      ctx.fillStyle = '#e5e0d5'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      timeRef.current += isPlaying ? 0.016 : 0 // Doubled speed

      const barWidth = (canvas.width / barCount) - 1 // Reduced gap between bars
      let x = 0.5 // Start with half-pixel offset for sharper rendering

      bars.forEach((height, i) => {
        if (isPlaying) {
          targetHeights[i] = generateTarget(i, timeRef.current)
          const diff = targetHeights[i] - height
          speeds[i] += diff * 0.02 // Increased from 0.02
          speeds[i] *= 0.95 // Reduced from 0.95 for snappier movement
          bars[i] += speeds[i]
        } else {
          speeds[i] *= 0.95
          bars[i] = Math.max(0, bars[i] - 1.5) // Increased decay speed
        }

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - bars[i])
        gradient.addColorStop(0, '#000000')
        gradient.addColorStop(0.4, '#222222')
        gradient.addColorStop(1, '#444444')

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - bars[i], barWidth, bars[i])

        // Thinner border
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = 0.5
        ctx.strokeRect(x, canvas.height - bars[i], barWidth, bars[i])

        x += barWidth + 1
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-8 bg-[#e5e0d5]"
      width={240}
      height={32}
    />
  )
}
