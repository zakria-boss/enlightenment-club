'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

const esfWings = [
  {
    id: 1,
    wingName: "ESF-PU",
    university: "Punjab University",
    president: "Ali Raza",
    description: "The Punjab University wing of the Enlightenment Student Federation fosters a community of thinkers and learners, encouraging students to engage with intellectual discourse and promote rational thinking.",
    imageUrl: "https://via.placeholder.com/200x200"
  },
  {
    id: 2,
    wingName: "ESF-GCU",
    university: "Government College University",
    president: "Ayesha Siddiqui",
    description: "The ESF-GCU wing is a dynamic group of students from Government College University who work together to explore philosophical and spiritual themes within an academic setting.",
    imageUrl: "https://via.placeholder.com/200x200"
  },
  {
    id: 3,
    wingName: "ESF-FAST",
    university: "FAST University",
    president: "Bilal Khan",
    description: "At FAST University, the Enlightenment Student Federation chapter focuses on innovation and leadership, inspiring students to approach their academic and personal development with a critical mindset.",
    imageUrl: "https://via.placeholder.com/200x200"
  }
]

const esfHead = {
  name: "Asad Ashraf",
  title: "Head of Enlightenment Student Federation",
  description: "Asad Ashraf oversees all the student federation wings across various universities. He works closely with each wing's president to ensure the mission of the Enlightenment Club is upheld and promoted.",
  imageUrl: "https://via.placeholder.com/200x200"
}

export default function ESFSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-[#F5E6D3]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif font-bold text-center text-[#30323B] mb-6">
          Enlightenment Student Federation (ESF)
        </h2>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-gray-700 leading-relaxed">
            The Enlightenment Student Federation (ESF) is a vibrant and dynamic student body that
            spans across various universities. ESF's mission is to foster intellectual growth,
            leadership, and community engagement among students through critical thinking and
            meaningful dialogue. Each university wing of ESF operates under the guidance of a
            President and works towards empowering students to question, explore, and grow both
            academically and spiritually.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ESF Head Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative w-48 h-48 flex-shrink-0">
                <Image
                  src={esfHead.imageUrl}
                  alt={esfHead.name}
                  layout="fill"
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full border-2 border-[#EEAE13]" />
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-bold text-[#30323B] mb-2">{esfHead.name}</h3>
                <p className="text-[#EEAE13] font-medium mb-4">{esfHead.title}</p>
                <p className="text-gray-600">{esfHead.description}</p>
              </div>
            </div>
          </motion.div>

          {/* ESF Wings Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              className="h-full"
            >
              {esfWings.map((wing) => (
                <SwiperSlide key={wing.id}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg h-full">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="relative w-48 h-48 flex-shrink-0">
                        <Image
                          src={wing.imageUrl}
                          alt={wing.president}
                          layout="fill"
                          className="rounded-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full border-2 border-[#EEAE13]" />
                      </div>
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-2xl font-bold text-[#30323B] mb-2">{wing.president}</h3>
                        <p className="text-[#EEAE13] font-medium mb-4">
                          {wing.wingName} - {wing.university}
                        </p>
                        <p className="text-gray-600">{wing.description}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </div>
    </section>
  )
}