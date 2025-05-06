"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface CosmicLoaderProps {
  size?: number
  color?: string
  className?: string
}

export function CosmicLoader({ size = 120, color = "#8b5cf6", className = "" }: CosmicLoaderProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const mainCircleRef = useRef<SVGCircleElement>(null)
  const fragmentsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !mainCircleRef.current || !fragmentsRef.current) return

    const mainCircle = mainCircleRef.current
    const fragments = fragmentsRef.current.children

    // Create timeline for the animation
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.5,
      defaults: { ease: "power2.inOut" },
    })

    // Initial state
    gsap.set(fragments, {
      opacity: 0,
      scale: 0,
      transformOrigin: "center",
    })

    // Main animation sequence
    tl.to(mainCircle, {
      opacity: 1,
      duration: 0.5,
    })
      .to(
        mainCircle,
        {
          opacity: 0,
          scale: 1.5,
          duration: 0.5,
        },
        "+=0.5",
      )
      .set(fragments, {
        opacity: 1,
        scale: 0,
      })
      .to(fragments, {
        scale: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(1.7)",
      })
      .to(fragments, {
        x: (i) => Math.cos((i * Math.PI) / 6) * (size / 2),
        y: (i) => Math.sin((i * Math.PI) / 6) * (size / 2),
        rotation: (i) => (i % 2 === 0 ? 90 : -90),
        stagger: 0.02,
        duration: 0.8,
      })
      .to(
        fragments,
        {
          x: 0,
          y: 0,
          rotation: 0,
          stagger: 0.02,
          duration: 0.8,
        },
        "+=0.3",
      )
      .to(fragments, {
        opacity: 0,
        scale: 0,
        stagger: 0.02,
        duration: 0.4,
      })
      .to(mainCircle, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
      })

    return () => {
      tl.kill()
    }
  }, [size])

  // Calculate dimensions
  const viewBoxSize = size * 1.5
  const center = viewBoxSize / 2
  const radius = size / 2
  const strokeWidth = size * 0.02

  // Create fragment paths
  const fragmentCount = 12
  const fragments = Array.from({ length: fragmentCount }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / fragmentCount
    const arcLength = (2 * Math.PI * radius) / fragmentCount
    const arcAngle = 360 / fragmentCount

    return {
      id: i,
      angle: angle,
      path: `M ${center + radius * Math.cos(angle)} ${center + radius * Math.sin(angle)} 
             A ${radius} ${radius} 0 0 1 ${center + radius * Math.cos(angle + (arcAngle * Math.PI) / 180)} ${center + radius * Math.sin(angle + (arcAngle * Math.PI) / 180)}`,
    }
  })

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="overflow-visible"
      >
        {/* Main circle */}
        <circle
          ref={mainCircleRef}
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="opacity-0"
        />

        {/* Fragments */}
        <g ref={fragmentsRef}>
          {fragments.map((fragment) => (
            <path
              key={fragment.id}
              d={fragment.path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
