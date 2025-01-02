'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const journeyData = [
  {
    title: "Foundation of TEC",
    description:
      "TEC was officially established on November 4, 2022, with a vision to create a platform for intellectual growth, meaningful dialogue, and impactful community engagement. The journey began with our inaugural session on November 27, 2022, which set the tone for our mission to empower individuals with knowledge and leadership skills.",
    image: "/images/slider/Epistemology 1.jpeg",
  },
  {
    title: "Membership Course Success",
    description:
      "Over the span of one year, TEC conducted two comprehensive series of its Membership Course. These series were designed to educate, mentor, and build a strong network of passionate individuals dedicated to our mission. The success of these programs has become a cornerstone of TEC’s legacy, fostering a sense of community and commitment among members.",
    image: "/images/slider/success.jpeg",
  },
  {
    title: "First Annual Convention",
    description:
      "On February 13, 2024, TEC held its first annual convention, a milestone event that brought together influential speakers, thought leaders, and members from various fields. This convention not only celebrated our achievements but also set the stage for bigger aspirations by fostering collaboration and inspiring attendees to contribute to our shared vision.",
    image: "/images/slider/annual.jpeg",
  },
  {
    title: "Introduction of New Initiatives",
    description:
      "Following our annual convention, TEC introduced several new activities to expand engagement and impact. Monthly events became a regular feature, offering insightful discussions on diverse topics. Our media presence also grew significantly, with the introduction of podcasts, social media campaigns, and event recordings that reached a wider audience.",
    image: "/images/slider/initiative.jpeg",
  }
];


interface ArrowProps {
  onClick: () => void
  direction: 'left' | 'right'
}

const Arrow: React.FC<ArrowProps> = ({ onClick, direction }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === 'left' ? 'left-[10px] sm:left-[20px]' : 'right-[10px] sm:right-[20px]'
    } z-10 p-2 sm:p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#EEAE13] focus:ring-opacity-50`}
    aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
  >
    {direction === 'left' ? (
      <ChevronLeft size={30} color="white" />
    ) : (
      <ChevronRight size={30} color="white" />
    )}
  </button>
)

const JourneyGallery: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const controls = useAnimation()
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const autoGoToNext = () => {
    setDirection(1)
    setCurrentPage((prevPage) => (prevPage + 1) % journeyData.length)
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentPage((prevPage) => (prevPage + 1) % journeyData.length)
    resetInterval()
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentPage((prevPage) => (prevPage - 1 + journeyData.length) % journeyData.length)
    resetInterval()
  }

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      autoGoToNext()
    }, 5000) // Adjust the timing as needed
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      autoGoToNext()
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleMouseLeave = () => {
    resetInterval()
  }

  return (
    <section
      id="about"
      ref={ref}
      className="relative w-full h-[70%] mb-10 bg-[#F5E6D3] px-4 sm:px-0"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-[#30323B] font-serif pt-5"
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        Our Journey
      </motion.h2>
      <div
        className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[70vh] overflow-hidden rounded-lg shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#D2B48C] to-[#C19A6B] rounded-lg overflow-hidden shadow-xl">
              <div className="relative w-full h-[70%]">
                <Image
                  src={journeyData[currentPage].image}
                  alt={journeyData[currentPage].title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <div className="p-4 sm:p-6 h-[30%] md:h-[30%] bg-white">
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-[#30323B]">
                  {journeyData[currentPage].title}
                </h3>
                <p className=" text-gray-700">
                  {journeyData[currentPage].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <Arrow onClick={goToPrev} direction="left" />
        <Arrow onClick={goToNext} direction="right" />
      </div>
      <motion.div
        className="mt-4 text-center text-[#30323B]"
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        Page {currentPage + 1} of {journeyData.length}
      </motion.div>
    </section>
  )
}

export default JourneyGallery
