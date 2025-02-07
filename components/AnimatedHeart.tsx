"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

const hearts = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"]

export default function AnimatedHeart() {
  const [currentSequence, setCurrentSequence] = useState<string[]>([])
  const [showLike, setShowLike] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotatingIndex, setRotatingIndex] = useState<number | null>(null)
  const controls = useAnimation()

  useEffect(() => {
    const getRandomHearts = () => {
      const shuffled = [...hearts].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 3)
    }

    const animateSequence = async () => {
      while (true) {
        const sequence = getRandomHearts()
        setCurrentSequence(sequence)
        
        const randomIndex = Math.floor(Math.random() * 3) // Pick a random heart to spin
        setRotatingIndex(randomIndex)

        for (let i = 0; i < sequence.length; i++) {
          setCurrentIndex(i)
          
          if (i === randomIndex) {
            await controls.start({
              rotateY: [0, 360],
              transition: { duration: 0.4, ease: "linear" },
            })
          } else {
            controls.set({ rotateY: 0 })
          }

          await new Promise((resolve) => setTimeout(resolve, 400))
        }

        setShowLike(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setShowLike(false)
      }
    }

    animateSequence()
  }, [controls])

  return (
    <motion.span className="inline-block">
      {showLike ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          like
        </motion.span>
      ) : (
        <motion.span
          animate={currentIndex === rotatingIndex ? controls : {}}
        >
          {currentSequence[currentIndex] || "❤️"}
        </motion.span>
      )}
    </motion.span>
  )
}

